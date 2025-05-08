// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { csrfMiddleware } from "./utils/csrf";

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development";

// Add 'unsafe-eval' only in development mode
const scriptSrc = isDevelopment
  ? "'self' 'nonce-PLACEHOLDER' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.amplitude.com https://amplitude.com https://www.googletagmanager.com https://www.google-analytics.com https://widget.clutch.co https://assets.goodfirms.co https://images.dmca.com https://*.dmca.com"
  : "'self' 'nonce-PLACEHOLDER' https://cdnjs.cloudflare.com https://cdn.amplitude.com https://amplitude.com https://www.googletagmanager.com https://www.google-analytics.com https://widget.clutch.co https://assets.goodfirms.co https://images.dmca.com https://*.dmca.com";

// Security headers to apply to all responses
const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; " +
    `script-src ${scriptSrc}; ` +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https://*.solvejet.net https://*.clutch.co https://*.goodfirms.co https://www.google-analytics.com https://www.googletagmanager.com https://images.dmca.com https://*.dmca.com; " +
    "connect-src 'self' https://*.solvejet.net https://api.solvejet.net https://*.clutch.co https://*.goodfirms.co https://cdn.amplitude.com https://amplitude.com https://www.google-analytics.com https://www.googletagmanager.com https://images.dmca.com https://*.dmca.com; " +
    "frame-src 'self' https://*.clutch.co https://*.goodfirms.co https://widget.clutch.co https://widget.goodfirms.co https://images.dmca.com https://*.dmca.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "upgrade-insecure-requests;",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/offline",
  "/sitemap",
  "/api/placeholder",
  "/what-we-do",
  "/industries",
  "/methodology",
  "/case-studies",
  // Add any sub-routes
  "/what-we-do/custom-development",
  "/what-we-do/cloud-solutions",
  "/what-we-do/digital-transformation",
  "/industries/healthcare",
  "/industries/finance",
  "/industries/e-commerce",
  "/methodology/agile",
  "/methodology/devops",
  "/methodology/qa",
];

// Secret key for JWT verification - in production, use environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "default_jwt_secret_replace_this_in_production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/api/placeholder")
  ) {
    // Apply security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      if (key === "Content-Security-Policy") {
        // Generate a nonce for CSP
        const nonce = nanoid();
        const cspWithNonce = value.replace(
          /'nonce-PLACEHOLDER'/g,
          `'nonce-${nonce}'`
        );
        response.headers.set(key, cspWithNonce);
        response.headers.set("X-CSP-Nonce", nonce);
      } else {
        response.headers.set(key, value);
      }
    });

    return response;
  }

  // Add a unique request ID for debugging and tracking
  const requestId = nanoid();
  response.headers.set("X-Request-ID", requestId);

  // Generate a nonce for CSP
  const nonce = nanoid();

  // Store nonce in a header for server components to access
  response.headers.set("X-CSP-Nonce", nonce);

  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (key === "Content-Security-Policy") {
      // Add nonce to CSP - IMPORTANT: Replace 'unsafe-inline' completely with nonce
      const cspWithNonce = value.replace(
        /'nonce-PLACEHOLDER'/g,
        `'nonce-${nonce}'`
      );
      response.headers.set(key, cspWithNonce);
    } else {
      response.headers.set(key, value);
    }
  });

  // Check if the route is a public route
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return response;
  }

  // Check for CSRF token on state-changing requests
  const csrfResult = await csrfMiddleware(request);
  if (csrfResult) {
    return csrfResult;
  }

  // For API routes, check for API key if it's not an authenticated endpoint
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/public")) {
    const apiKey = request.headers.get("x-api-key");
    if (!validateApiKey(apiKey)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing API key" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return response;
  }

  // Rate limiting for API endpoints
  if (pathname.startsWith("/api/")) {
    // Get IP from headers (X-Forwarded-For) or use "unknown"
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    if (isRateLimited(clientIp || "unknown", pathname)) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // For all protected routes, verify authentication
  const authToken = getAuthToken(request);

  if (!authToken) {
    // If no token is provided, redirect to login
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(authToken, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Verify token is not expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      throw new Error("Token expired");
    }

    // Add user info to request headers for use in API routes
    response.headers.set("X-User-ID", payload["userId"] as string);
    response.headers.set("X-User-Role", (payload["role"] as string) || "user");

    return response;
  } catch (error) {
    console.error("Token verification failed:", error);

    // If API route, return 401 Unauthorized
    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // For other routes, redirect to login
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(redirectUrl);
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

// Helper functions

// Validate API key for public API routes
function validateApiKey(apiKey: string | null): boolean {
  if (!apiKey) return false;

  // In production, you'd validate against a database or environment variable
  const validKeys = [
    process.env["PUBLIC_API_KEY"] || "test-api-key-1",
    "test-api-key-2",
  ];

  return validKeys.includes(apiKey);
}

// Simple in-memory rate limiting implementation
const rateLimitStore: Record<string, { count: number; timestamp: number }> = {};

function isRateLimited(clientIp: string, pathname: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = pathname.startsWith("/api/public") ? 100 : 50; // Different limits based on endpoint

  const key = `${clientIp}:${pathname.split("/")[2] || "default"}`;

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = { count: 1, timestamp: now };
    return false;
  }

  const windowStart = now - windowMs;

  if (rateLimitStore[key].timestamp < windowStart) {
    // Reset if outside window
    rateLimitStore[key] = { count: 1, timestamp: now };
    return false;
  }

  // Increment count and check
  rateLimitStore[key].count++;

  return rateLimitStore[key].count > maxRequests;
}

// Extract auth token from request (cookies or Authorization header)
function getAuthToken(request: NextRequest): string | null {
  // Try to get from cookie first
  const tokenFromCookie = request.cookies.get("auth-token")?.value;
  if (tokenFromCookie) return tokenFromCookie;

  // Then check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}
