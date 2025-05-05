// src/utils/csrf-client.ts
"use client";

import { useEffect, useState } from "react";

interface CsrfResponse {
  tokenId: string;
}

/**
 * Client-side hook to fetch a CSRF token
 */
export function useCsrfToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/csrf");
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        const data: CsrfResponse = await response.json();
        setToken(data.tokenId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error fetching CSRF token:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, isLoading, error };
}
