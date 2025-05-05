// src/components/layout/MobileMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
}

interface MobileMenuProps {
    isOpen: boolean;
    onCloseAction: () => void;
    navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onCloseAction, navItems }: MobileMenuProps) {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isEntering, setIsEntering] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);

    // Animation handling with improved state management
    useEffect(() => {
        let enterTimer: NodeJS.Timeout | undefined;
        let exitTimer: NodeJS.Timeout | undefined;

        if (isOpen) {
            // Make the menu visible first
            setIsVisible(true);
            setIsExiting(false);

            // Trigger enter animation after a small delay
            enterTimer = setTimeout(() => {
                setIsEntering(true);
            }, 10);
        } else if (isVisible) {
            // Trigger exit animation
            setIsEntering(false);
            setIsExiting(true);

            // Remove from DOM after animation completes
            exitTimer = setTimeout(() => {
                setIsVisible(false);
                setIsExiting(false);
            }, 400); // Match with transition duration
        }

        // Always return a cleanup function
        return () => {
            if (enterTimer) clearTimeout(enterTimer);
            if (exitTimer) clearTimeout(exitTimer);
        };
    }, [isOpen, isVisible]);

    // Reset dropdown state when menu closes
    useEffect(() => {
        if (!isOpen) {
            setActiveDropdown(null);
        }
    }, [isOpen]);

    // Handle dropdown toggling
    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // If not visible in DOM, return null
    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            style={{ top: '64px' }} // Position below header
        >
            {/* Background overlay with click handler to close */}
            <div
                className="absolute inset-0 bg-light-background/70 dark:bg-dark-background/80 backdrop-blur-lg"
                onClick={onCloseAction}
            ></div>

            {/* Mobile menu with Tailwind transitions */}
            <div
                className={`fixed top-[64px] right-0 bottom-0 w-4/5 max-w-sm bg-white/70 dark:bg-dark-background/90 
                    backdrop-blur-lg border-l border-light-border dark:border-dark-border overflow-y-auto
                    transition-transform duration-400 ease-out
                    ${isEntering ? 'translate-x-0' : 'translate-x-full'}
                    ${isExiting ? 'translate-x-full' : ''}`}
            >
                <div className="p-6 flex flex-col h-full">
                    <nav className="space-y-4 mb-auto">
                        {navItems.map((item, index) => (
                            <div
                                key={item.name}
                                className={`py-2 border-b border-light-border/30 dark:border-dark-border/30
                                    opacity-0 translate-x-5
                                    ${isEntering ? 'animate-fade-slide-in' : ''}
                                `}
                                style={{
                                    animationDelay: `${index * 80 + 100}ms`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                {item.subItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`flex justify-between items-center w-full py-2 text-xl 
                                                text-light-text-secondary dark:text-dark-text-secondary 
                                                hover:text-primary-blue transition-colors relative
                                                active:bg-light-surface/50 dark:active:bg-dark-surface/50 rounded
                                                ${pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                                    ? 'text-primary-blue font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-3/5 before:w-1 before:bg-primary-blue before:-ml-2 before:rounded-r'
                                                    : ''
                                                }`}
                                            aria-expanded={activeDropdown === item.name}
                                            type="button"
                                        >
                                            {item.name}
                                            <svg
                                                className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <div
                                            className={`mt-2 space-y-2 pl-4 overflow-hidden transition-all duration-300 
                                                ${activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={onCloseAction}
                                                    className="block py-2.5 text-lg text-light-text-secondary dark:text-dark-text-secondary 
                                                        hover:text-primary-blue transition-colors relative pl-3
                                                        active:bg-light-surface/30 dark:active:bg-dark-surface/30 rounded"
                                                >
                                                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-light-border dark:bg-dark-border"></span>
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={onCloseAction}
                                        className={`block py-2 text-xl text-light-text-secondary dark:text-dark-text-secondary 
                                            hover:text-primary-blue transition-colors relative
                                            active:bg-light-surface/50 dark:active:bg-dark-surface/50 rounded
                                            ${pathname === item.href
                                                ? 'text-primary-blue font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-3/5 before:w-1 before:bg-primary-blue before:-ml-2 before:rounded-r'
                                                : ''
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6">
                        <div className="w-full h-px bg-light-border/30 dark:bg-dark-border/30 mb-6"></div>
                        <Link
                            href="/contact"
                            className={`group relative block w-full text-center py-4 rounded-xl 
                                bg-primary-blue text-white text-lg font-medium overflow-hidden 
                                shadow-lg hover:shadow-xl transition-all duration-300
                                opacity-0 ${isEntering ? 'animate-fade-in' : ''}`}
                            onClick={onCloseAction}
                            style={{
                                animationDelay: `${navItems.length * 80 + 200}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                Let&apos;s Talk
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-blue via-blue-500 to-primary-blue bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
                            <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 skew-x-12 z-0"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}