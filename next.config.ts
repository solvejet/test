// next.config.ts
import type { Configuration } from "webpack";
import type { NextConfig } from "next";

// Import next-pwa in a way that's compatible with webpack 5
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],

  // Important: Add explicit fallbacks
  fallbacks: {
    document: "/offline", // When a page request fails
    image: "/images/fallback.png",
    font: "/fonts/fallback.woff2",
  },

  // Add this to enable caching during front-end navigation
  cacheOnFrontEndNav: true,

  // Force production mode for service worker even in development
  // This can help resolve offline page issues
  mode: "production",

  // Improve runtime caching configuration
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-image",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-style-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    {
      // Important: Added 200/404 status codes for route caching to work properly
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "next-data",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
        cacheableResponse: {
          statuses: [200, 404],
        },
      },
    },
    {
      urlPattern: /\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "apis",
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      // This is a catch-all for HTML pages
      // Make sure to cache all pages with 200 response
      urlPattern: /.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Replace domains with remotePatterns for better security control
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dmca.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "widget.clutch.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.goodfirms.co",
        pathname: "**",
      },
    ],
  },

  // Ensure Next.js can properly handle PWA static assets
  webpack: (
    config: Configuration,
    { isServer, dev }: { isServer: boolean; dev: boolean }
  ) => {
    // Fix for next-pwa with webpack 5
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          path: false,
          os: false,
          crypto: false,
        },
      };
    }
    return config;
  },
  // Add CSP headers
  headers: async () => {
    // Determine if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development";

    // Add 'unsafe-eval' only in development mode
    const scriptSrc = isDevelopment
      ? "'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.amplitude.com https://amplitude.com https://www.googletagmanager.com https://www.google-analytics.com https://widget.clutch.co https://assets.goodfirms.co https://images.dmca.com https://*.dmca.com"
      : "'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.amplitude.com https://amplitude.com https://www.googletagmanager.com https://www.google-analytics.com https://widget.clutch.co https://assets.goodfirms.co https://images.dmca.com https://*.dmca.com";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src ${scriptSrc}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.solvejet.net https://*.clutch.co https://*.goodfirms.co https://www.google-analytics.com https://www.googletagmanager.com https://images.dmca.com https://*.dmca.com",
              "connect-src 'self' https://*.solvejet.net https://api.solvejet.net https://*.clutch.co https://*.goodfirms.co https://cdn.amplitude.com https://amplitude.com https://www.google-analytics.com https://www.googletagmanager.com https://images.dmca.com https://*.dmca.com",
              "frame-src 'self' https://*.clutch.co https://*.goodfirms.co https://widget.clutch.co https://widget.goodfirms.co https://images.dmca.com https://*.dmca.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Add explicit rewrites to handle 404 errors
  async rewrites() {
    return {
      beforeFiles: [
        // Handle any missing paths in the app directory
        {
          source: "/:path*",
          destination: "/:path*", // Just pass it along to let Next.js handle the routing
        },
      ],
      fallback: [
        // Fallback to the Offline page for any unmatched paths in production
        // only when network is unavailable
        {
          source: "/:path*",
          destination: process.env.NODE_ENV === "production" ? "/offline" : "/",
        },
      ],
    };
  },
};

export default withPWA(nextConfig);
