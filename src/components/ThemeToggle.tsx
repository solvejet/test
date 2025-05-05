// src/components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    // This useEffect only runs once on component mount
    useEffect(() => {
        setMounted(true);
        // Check if user has a preference stored
        const isDark = localStorage.getItem('darkMode') === 'true' ||
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);

        // Set initial theme on document
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        // Update document class
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Save preference to localStorage
        localStorage.setItem('darkMode', newDarkMode.toString());

        // Reset animation state after animation completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    // Don't render anything until after client-side hydration
    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-light-surface/70 dark:hover:bg-dark-surface/70 text-light-text-primary dark:text-dark-text-primary transition-all duration-300 transform hover:shadow-md"
            aria-label="Toggle theme"
            disabled={isAnimating}
        >
            <div className={`relative transition-transform duration-700 ${isAnimating ? (darkMode ? 'rotate-[360deg]' : 'rotate-[-360deg]') : ''}`}>
                {darkMode ? (
                    <Sun
                        size={20}
                        className="text-dark-text-primary transition-all duration-300 animate-fadeIn"
                    />
                ) : (
                    <Moon
                        size={20}
                        className="text-light-text-primary transition-all duration-300 animate-fadeIn"
                    />
                )}
            </div>
        </button>
    );
}