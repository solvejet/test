// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import SolveJetLogo from '../ui/SolveJetLogo';
import ThemeToggle from '../ThemeToggle';
import { useScrollPosition, useScrollLock } from '@/utils/scrollUtils';
import MobileMenu from './MobileMenu';

interface NavItem {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
    {
        name: 'What We Do',
        href: '/what-we-do',
        subItems: [
            { name: 'Custom Development', href: '/what-we-do/custom-development' },
            { name: 'Cloud Solutions', href: '/what-we-do/cloud-solutions' },
            { name: 'Digital Transformation', href: '/what-we-do/digital-transformation' },
        ]
    },
    {
        name: 'Industries',
        href: '/industries',
        subItems: [
            { name: 'Healthcare', href: '/industries/healthcare' },
            { name: 'Finance', href: '/industries/finance' },
            { name: 'E-commerce', href: '/industries/e-commerce' },
        ]
    },
    {
        name: 'Methodology',
        href: '/methodology',
        subItems: [
            { name: 'Agile Development', href: '/methodology/agile' },
            { name: 'DevOps', href: '/methodology/devops' },
            { name: 'Quality Assurance', href: '/methodology/qa' },
        ]
    },
    {
        name: 'Case Studies',
        href: '/case-studies',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
];

export default function Header() {
    const pathname = usePathname();
    const isScrolled = useScrollPosition(10);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { lockScroll, unlockScroll } = useScrollLock();

    // Reset mobile menu state on mount
    useEffect(() => {
        setMobileMenuOpen(false);
        return () => { }; // Explicit empty return for TypeScript
    }, []);

    // Handle mobile menu toggle with scroll lock
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prevState => {
            const newState = !prevState;
            if (newState) {
                lockScroll();
            } else {
                unlockScroll();
            }
            return newState;
        });
    };

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        unlockScroll();
        return () => { }; // Explicit empty return for TypeScript
    }, [pathname, unlockScroll]);

    // Handle dropdown toggling for desktop navigation
    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-light-background/85 dark:bg-dark-background/85 header-blur shadow-sm'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <SolveJetLogo className="text-light-text-primary dark:text-dark-text-primary h-9 w-auto" />

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    {item.subItems ? (
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors flex items-center text-sm font-medium nav-item ${pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                                ? 'text-primary-blue font-medium'
                                                : ''
                                                }`}
                                        >
                                            {item.name}
                                            <svg
                                                className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors flex items-center text-sm font-medium nav-item ${pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                                ? 'text-primary-blue font-medium'
                                                : ''
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {/* Dropdown Menu with improved animation */}
                                    {item.subItems && (
                                        <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-light-background/95 dark:bg-dark-surface/95 border border-light-border dark:border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                                            <div className="py-2 rounded-md">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2.5 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface/90 dark:hover:bg-dark-background/90 hover:text-primary-blue transition-all duration-200"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right side with theme toggle and mobile menu button */}
                        <div className="flex items-center">
                            {/* Get Started Button - Desktop with improved styling */}
                            <div className="hidden md:flex items-center">
                                <Link
                                    href="/get-started"
                                    className="btn-talk-primary flex items-center justify-center space-x-1 px-5 py-2.5 bg-primary-blue text-white rounded-full text-sm font-medium overflow-hidden relative"
                                >
                                    <span className="relative z-10">Let&apos;s Talk</span>
                                    <ArrowRight className="ml-1 relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-500 skew-x-12"></span>
                                </Link>

                                {/* Vertical divider */}
                                <div className="mx-4 h-6 w-px bg-light-border dark:bg-dark-border"></div>

                                <ThemeToggle />
                            </div>

                            {/* Mobile only theme toggle */}
                            <div className="md:hidden mr-3">
                                <ThemeToggle />
                            </div>

                            {/* Improved Mobile Menu Button with animation */}
                            <button
                                className="mobile-menu-toggle md:hidden text-light-text-primary dark:text-dark-text-primary p-2 hover:bg-light-surface dark:hover:bg-dark-surface/50 rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-blue focus-ring"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                                aria-expanded={mobileMenuOpen}
                            >
                                <div className="relative w-6 h-6 flex items-center justify-center group">
                                    {/* Top Line */}
                                    <span
                                        className={`absolute h-0.5 w-6 bg-current rounded transition-transform duration-300 ease-in-out 
      ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
                                    />

                                    {/* Middle Line (Shorter) */}
                                    <span
                                        className={`absolute h-0.5 w-4 bg-current rounded transition-all duration-300 ease-in-out 
      ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                                    />

                                    {/* Bottom Line */}
                                    <span
                                        className={`absolute h-0.5 w-6 bg-current rounded transition-transform duration-300 ease-in-out 
      ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
                                    />
                                </div>

                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Component */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onCloseAction={() => {
                    setMobileMenuOpen(false);
                    unlockScroll();
                }}
                navItems={navItems}
            />
        </>
    );
}