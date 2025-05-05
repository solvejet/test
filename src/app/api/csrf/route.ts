// src/app/api/csrf/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCsrfTokenPayload } from "@/utils/csrf";

export async function GET() {
  try {
    const { tokenId, token } = await generateCsrfTokenPayload();

    // Set the cookie with the token
    (await cookies()).set("csrf_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3600, // 1 hour in seconds
    });

    // Return the tokenId to the client
    return NextResponse.json(
      {
        tokenId,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
