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
    const [animationClass, setAnimationClass] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Animation handling with proper state management
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Set a small timeout to allow the DOM to update before adding animation class
            const showTimer = setTimeout(() => {
                setAnimationClass('slide-in');
            }, 10);

            return () => clearTimeout(showTimer); // Clean up for first condition
        } else {
            setAnimationClass('slide-out');
            // Add delay before hiding completely (should match animation duration)
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 400); // Match this to your animation duration

            return () => clearTimeout(hideTimer); // Clean up for second condition
        }
    }, [isOpen]);

    // Close mobile menu when changing pages
    useEffect(() => {
        if (isOpen) {
            onCloseAction();
        }
    }, [pathname, isOpen, onCloseAction]);

    // Handle dropdown toggling
    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-40 transform transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            style={{ top: '64px' }} // Positioned below header
        >
            {/* Glassmorphism background overlay */}
            <div
                className="absolute inset-0 bg-light-background/70 dark:bg-dark-background/80 backdrop-blur-lg"
                onClick={onCloseAction} // Close when clicking outside
            ></div>

            <div className={`mobile-menu-glassmorphism ${animationClass}`}>
                <div className="p-6 flex flex-col h-full">
                    <nav className="space-y-4 mb-auto">
                        {navItems.map((item, index) => (
                            <div
                                key={item.name}
                                className="py-2 border-b border-light-border/30 dark:border-dark-border/30 mobile-nav-item"
                                style={{ '--item-index': index } as React.CSSProperties}
                            >
                                {item.subItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`mobile-nav-touch flex justify-between items-center w-full py-2 text-xl text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue transition-colors ${pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                                ? 'text-primary-blue font-medium mobile-nav-active'
                                                : ''
                                                }`}
                                            aria-expanded={activeDropdown === item.name}
                                        >
                                            {item.name}
                                            <svg
                                                className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <div
                                            className={`mt-2 space-y-2 pl-4 overflow-hidden transition-all duration-300 ${activeDropdown === item.name
                                                ? 'max-h-96 opacity-100'
                                                : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={onCloseAction}
                                                    className="mobile-nav-touch block py-2.5 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue transition-colors relative pl-3"
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
                                        className={`mobile-nav-touch block py-2 text-xl text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue transition-colors ${pathname === item.href
                                            ? 'text-primary-blue font-medium mobile-nav-active'
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
                            href="/get-started"
                            className="group relative block w-full text-center py-4 rounded-xl bg-primary-blue text-white text-lg font-medium overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mobile-nav-touch"
                            onClick={onCloseAction}
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