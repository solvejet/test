// src/utils/csrf.ts
import { nanoid } from "nanoid";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Secret key for CSRF token - in production, use environment variables
const CSRF_SECRET = new TextEncoder().encode(
  process.env["CSRF_SECRET"] || "csrf_secret_replace_this_in_production"
);

// CSRF token expiration time
const CSRF_TOKEN_EXPIRATION = "1h"; // 1 hour

/**
 * Generate a CSRF token payload
 * This function does not directly interact with cookies and can be used in both server and client components
 */
export async function generateCsrfTokenPayload(): Promise<{
  tokenId: string;
  token: string;
}> {
  const tokenId = nanoid();

  // Create a signed token
  const token = await new SignJWT({ tokenId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(CSRF_TOKEN_EXPIRATION)
    .sign(CSRF_SECRET);

  return { tokenId, token };
}

/**
 * Validate the CSRF token from the request against the stored token
 */
export async function validateCsrfToken(
  request: NextRequest
): Promise<boolean> {
  try {
    // Get the token from the cookie
    const cookieToken = request.cookies.get("csrf_token")?.value;
    if (!cookieToken) {
      return false;
    }

    // Get the client token from the header or body
    const clientToken =
      request.headers.get("x-csrf-token") ||
      (await request.json().catch(() => ({}))).csrfToken;

    if (!clientToken) {
      return false;
    }

    // Verify the cookie token
    const { payload } = await jwtVerify(cookieToken, CSRF_SECRET, {
      algorithms: ["HS256"],
    });

    // Compare the tokenId from the cookie with the client token
    return payload["tokenId"] === clientToken;
  } catch (error) {
    console.error("CSRF validation error:", error);
    return false;
  }
}

/**
 * Middleware to check CSRF token for POST, PUT, DELETE requests
 */
export async function csrfMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  const method = request.method.toUpperCase();

  // Only validate for state-changing methods
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const isValid = await validateCsrfToken(request);

    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: "Invalid CSRF token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // If validation passes or isn't needed, return null to continue
  return null;
}
