// src/utils/headerUtils.ts

// Client component hook to extract CSP nonce from meta tag
"use client";
export function useNonce(): string | undefined {
  const [nonce, setNonce] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Extract nonce from meta tag if available
    const metaNonce = document.querySelector('meta[name="csp-nonce"]');
    if (metaNonce && metaNonce.getAttribute("content")) {
      setNonce(metaNonce.getAttribute("content") || undefined);
    }
  }, []);

  return nonce;
}

import { useState, useEffect } from "react";
