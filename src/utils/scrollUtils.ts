// src/utils/scrollUtils.ts
"use client";

import { useState, useEffect, type RefObject } from "react";

// Custom hook to detect scroll position
export function useScrollPosition(threshold = 10): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

// Custom hook to detect if an element is in viewport
export function useElementInView(
  ref: RefObject<HTMLElement>,
  rootMargin = "0px"
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for environments without IntersectionObserver
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false);
      },
      { rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isInView;
}

// Improved utility to manage scroll locking (useful for mobile menu)
export function useScrollLock() {
  // Keep track of the lock state to prevent duplicate calls
  const [isLocked, setIsLocked] = useState(false);

  // Store the original body overflow and padding
  const [originalStyles, setOriginalStyles] = useState({
    overflow: "",
    paddingRight: "",
  });

  // Fixed lockScroll function that handles browser-specific issues
  const lockScroll = () => {
    if (isLocked || typeof window === "undefined") return; // Prevent duplicate lock calls and check for SSR

    setOriginalStyles({
      overflow: document.body.style.overflow || "",
      paddingRight: document.body.style.paddingRight || "",
    });

    // Calculate scrollbar width to prevent layout shift
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Apply lock styles
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Set state AFTER styles are applied to ensure consistency
    setIsLocked(true);
  };

  // Fixed unlockScroll function
  const unlockScroll = () => {
    if (!isLocked || typeof window === "undefined") return; // Only unlock if currently locked and check for SSR

    // Restore original styles
    document.body.style.overflow = originalStyles.overflow;
    document.body.style.paddingRight = originalStyles.paddingRight;

    // Reset state AFTER styles are restored
    setIsLocked(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Safety check to ensure scroll is always restored when component unmounts
      if (isLocked && typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  }, [isLocked]);

  return { lockScroll, unlockScroll, isLocked };
}
