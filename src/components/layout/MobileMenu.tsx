// src/components/layout/MobileMenu.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
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
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle animation states
    useEffect(() => {
        if (isOpen) {
            // Start animation
            setIsAnimating(true);
            // Add overflow hidden to body to prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Allow time for exit animation
            const timer = setTimeout(() => {
                setIsAnimating(false);
                // Restore body scrolling when menu is closed
                document.body.style.overflow = '';
            }, 300);

            return () => clearTimeout(timer);
        }

        // Clean up function to ensure body overflow is restored
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset dropdown state when menu closes
    useEffect(() => {
        if (!isOpen) {
            setActiveDropdown(null);
        }
    }, [isOpen]);

    // Handle clicks outside the menu to close it (but not when clicking on the menu itself or toggle button)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If menu is open and we clicked outside the menu content
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                // Make sure the event target is not part of the toggle button
                !(event.target as Element).closest('.mobile-menu-toggle')
            ) {
                onCloseAction();
            }
        };

        // Add click listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onCloseAction]);

    // Handle dropdown toggling
    const toggleDropdown = (name: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // If menu is closed and not animating, don't render
    if (!isOpen && !isAnimating) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 md:hidden z-40"
            style={{ top: 'calc(var(--header-height, 70px))' }}
        >
            {/* Backdrop with click handler to close menu */}
            <div
                className={`absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onCloseAction}
            />

            {/* Menu panel */}
            <div
                ref={menuRef}
                className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-full relative">
                    <div className="absolute inset-0">
                        {/* Light mode background with glassmorphism */}
                        <div className="absolute inset-0 bg-white/70 dark:bg-transparent backdrop-blur-xl dark:backdrop-blur-none border-l border-light-border/50"></div>

                        {/* Dark mode background with glassmorphism */}
                        <div className="absolute inset-0 bg-transparent dark:bg-dark-background/70 backdrop-blur-none dark:backdrop-blur-xl border-l border-transparent dark:border-dark-border/50"></div>

                        {/* Decorative elements that enhance the design */}
                        <div className="absolute top-4 right-4 w-32 h-32 bg-primary-blue/5 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-1/4 left-4 w-24 h-24 bg-primary-blue/5 rounded-full blur-xl"></div>

                        {/* Content layout with sticky footer */}
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Scrollable area for nav items */}
                            <div className="flex-grow overflow-auto p-6 pb-0">
                                <nav className="space-y-4">
                                    {navItems.map((item) => (
                                        <div
                                            key={item.name}
                                            className="py-2 border-b border-light-border/20 dark:border-dark-border/20"
                                        >
                                            {item.subItems ? (
                                                <>
                                                    <button
                                                        onClick={(e) => toggleDropdown(item.name, e)}
                                                        className={`flex justify-between items-center w-full py-2 text-xl 
                                                            text-light-text-primary dark:text-dark-text-primary
                                                            hover:text-primary-blue transition-colors relative
                                                            active:bg-light-surface/50 dark:active:bg-dark-surface/50 rounded
                                                            ${pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                                                ? 'text-primary-blue font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-3/5 before:w-1 before:bg-primary-blue before:-ml-2 before:rounded-r'
                                                                : ''
                                                            }`}
                                                        aria-expanded={activeDropdown === item.name}
                                                        type="button"
                                                    >
                                                        <span className="flex items-center">
                                                            {item.name}
                                                        </span>
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
                                                        className={`mt-2 space-y-1 pl-4 overflow-hidden transition-all duration-300 
                                                            ${activeDropdown === item.name ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                                                    >
                                                        {item.subItems.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                onClick={onCloseAction}
                                                                className="block py-2.5 text-lg text-light-text-secondary dark:text-dark-text-secondary 
                                                                    hover:text-primary-blue transition-colors relative pl-3
                                                                    active:bg-light-surface/50 dark:active:bg-dark-surface/50 rounded"
                                                            >
                                                                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-blue opacity-70"></span>
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={onCloseAction}
                                                    className={`block py-2 text-xl text-light-text-primary dark:text-dark-text-primary
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
                            </div>

                            {/* Sticky footer with CTA button and tagline */}
                            <div className="sticky bottom-0 p-6 pt-4 bg-white/70 dark:bg-dark-background/70 backdrop-blur-md z-20 border-t border-light-border/20 dark:border-dark-border/20 mt-4">
                                {/* Decorative divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-light-border/40 dark:via-dark-border/40 to-transparent mb-4"></div>

                                {/* CTA button with improved layout */}
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/contact"
                                        className="group relative block w-full text-center py-3.5 rounded-xl 
                                            bg-primary-blue text-white text-lg font-medium overflow-hidden 
                                            shadow-lg hover:shadow-xl transition-all duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop propagation to prevent sidebar closing
                                            onCloseAction();
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            Let&apos;s Talk
                                            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-primary-blue via-blue-500 to-primary-blue bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 skew-x-12 z-0"></span>
                                    </Link>

                                    {/* Tagline with improved positioning */}
                                    <p className="text-center text-sm text-light-text-muted dark:text-dark-text-muted">
                                        Engineering Tomorrow, Delivering Today
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}