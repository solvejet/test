// src/components/layout/Footer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Mail,
    MapPin,
    Phone,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Github,
    ArrowRight,
    ExternalLink
} from 'lucide-react';
import SolveJetLogo from '../ui/SolveJetLogo';

interface FooterLinkProps {
    href: string;
    label: string;
    isExternal?: boolean | undefined;
}

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

/**
 * Footer Component
 * 
 * Displays the site footer with modern design, company information,
 * quick links, services, contact information and newsletter subscription.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [scrollY, setScrollY] = useState(0);
    const footerRef = useRef<HTMLElement>(null);
    const isInViewport = useRef(false);
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Handle parallax effect on scroll for background elements
    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const rect = footerRef.current.getBoundingClientRect();
                const isVisible =
                    rect.top < window.innerHeight &&
                    rect.bottom >= 0;

                // Only update state when footer comes into view or leaves view
                if (isVisible !== isInViewport.current) {
                    isInViewport.current = isVisible;
                }

                if (isVisible) {
                    // Calculate scroll position relative to the footer
                    const relativePos = window.innerHeight - rect.top;
                    setScrollY(relativePos * 0.1); // Adjust multiplier for effect intensity
                }
            }
        };

        // Add event listener for scroll with passive flag for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle newsletter subscription
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) return;

        setIsSubscribing(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubscribeStatus('success');
            setEmail('');

            // Reset status after 5 seconds
            setTimeout(() => setSubscribeStatus('idle'), 5000);
        } catch {
            setSubscribeStatus('error');

            // Reset status after 5 seconds
            setTimeout(() => setSubscribeStatus('idle'), 5000);
        } finally {
            setIsSubscribing(false);
        }
    };

    // Create footer link with consistent styling
    const FooterLink = ({ href, label, isExternal }: FooterLinkProps) => (
        <li className="transform origin-left hover:translate-x-1 transition-all duration-200">
            <Link
                href={href}
                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors flex items-center group"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-light-text-muted dark:bg-dark-text-muted group-hover:bg-primary-blue transition-colors mr-2"></span>
                {label}
                {isExternal && <ExternalLink className="ml-1 h-3 w-3 opacity-70" />}
            </Link>
        </li>
    );

    // Create social media link with consistent styling
    const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
        <a
            href={href}
            className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors transform hover:scale-110 duration-200 flex items-center justify-center bg-light-surface/50 dark:bg-dark-surface/50 p-2.5 rounded-full hover:bg-primary-blue/10"
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
            <span className="sr-only">{label}</span>
        </a>
    );

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden border-t border-light-border/30 dark:border-dark-border/30 pt-16"
        >
            {/* Background decorative elements with parallax effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Gradient orbs with parallax effect */}
                <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 dark:opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.3) 0%, rgba(60, 134, 255, 0.1) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY * -1.5}px, ${scrollY}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
                <div
                    className="absolute bottom-40 left-20 w-64 h-64 rounded-full opacity-20 dark:opacity-10 hidden md:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.2) 0%, rgba(60, 134, 255, 0.05) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY}px, ${scrollY * -1}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
                <div
                    className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 dark:opacity-15"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.25) 0%, rgba(60, 134, 255, 0.05) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY * 1.2}px, ${scrollY * -0.5}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />

                {/* Subtle grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-5 dark:opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(60, 134, 255, 0.15) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
            </div>

            {/* Main footer content with z-index to appear above the background */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-7 lg:grid-cols-12">
                    {/* Column 1: Logo and company info - spans 3 columns on larger screens */}
                    <div className="md:col-span-3 lg:col-span-4 space-y-6">
                        <SolveJetLogo className="text-light-text-primary dark:text-dark-text-primary h-9 w-auto" />

                        <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-sm">
                            Engineering Tomorrow, Delivering Today. We help businesses transform through technology with sophisticated solutions that drive growth.
                        </p>

                        {/* Social media links - updated with uniform styling */}
                        <div className="flex space-x-3 mt-8">
                            <SocialLink
                                href="https://twitter.com/solvejet"
                                icon={<Twitter size={20} />}
                                label="Twitter"
                            />
                            <SocialLink
                                href="https://linkedin.com/company/solvejet"
                                icon={<Linkedin size={20} />}
                                label="LinkedIn"
                            />
                            <SocialLink
                                href="https://facebook.com/solvejet"
                                icon={<Facebook size={20} />}
                                label="Facebook"
                            />
                            <SocialLink
                                href="https://instagram.com/solvejet"
                                icon={<Instagram size={20} />}
                                label="Instagram"
                            />
                            <SocialLink
                                href="https://github.com/solvejet"
                                icon={<Github size={20} />}
                                label="GitHub"
                            />
                        </div>
                    </div>

                    {/* Column 2: Quick Links - spans 2 columns on larger screens */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-primary-blue"></span>
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <FooterLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    isExternal={link.isExternal}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services - spans 2 columns on larger screens */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 relative inline-block">
                            Our Services
                            <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-primary-blue"></span>
                        </h3>
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <FooterLink
                                    key={service.href}
                                    href={service.href}
                                    label={service.label}
                                    isExternal={service.isExternal}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact info - spans 3 columns on larger screens */}
                    <div className="md:col-span-3 lg:col-span-4">
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-primary-blue"></span>
                        </h3>
                        <div className="space-y-5">
                            {/* Email contact */}
                            <div className="flex items-start group hover:translate-x-1 transition-all duration-200">
                                <div className="bg-light-surface/80 dark:bg-dark-surface/80 p-2 rounded-full mr-3 group-hover:bg-primary-blue/10 transition-colors">
                                    <Mail className="text-primary-blue min-w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light-text-primary dark:text-dark-text-primary font-medium">Email Us</span>
                                    <a href="mailto:hello@solvejet.net" className="text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-blue transition-colors">
                                        hello@solvejet.net
                                    </a>
                                </div>
                            </div>

                            {/* Phone contact */}
                            <div className="flex items-start group hover:translate-x-1 transition-all duration-200">
                                <div className="bg-light-surface/80 dark:bg-dark-surface/80 p-2 rounded-full mr-3 group-hover:bg-primary-blue/10 transition-colors">
                                    <Phone className="text-primary-blue min-w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light-text-primary dark:text-dark-text-primary font-medium">Call Us</span>
                                    <a href="tel:+19095081408" className="text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-blue transition-colors">
                                        +1 (909) 508-1408
                                    </a>
                                </div>
                            </div>

                            {/* Address information */}
                            <div className="flex items-start group hover:translate-x-1 transition-all duration-200">
                                <div className="bg-light-surface/80 dark:bg-dark-surface/80 p-2 rounded-full mr-3 group-hover:bg-primary-blue/10 transition-colors">
                                    <MapPin className="text-primary-blue min-w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light-text-primary dark:text-dark-text-primary font-medium">Our Locations</span>
                                    <div>
                                        <span className="text-light-text-secondary dark:text-dark-text-secondary block">
                                            30 N Gould St Ste R, Sheridan, WY 82801
                                        </span>
                                        <span className="text-light-text-secondary dark:text-dark-text-secondary block mt-1">
                                            H903, Titanium City Center, Ahmedabad, 380015
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter subscription with improved design */}
                <div className="mt-16 pt-10 border-t border-light-border/30 dark:border-dark-border/30">
                    <div className="bg-gradient-to-br from-light-surface/80 to-white/30 dark:from-dark-surface/80 dark:to-dark-background/30 rounded-2xl p-8 shadow-lg border border-light-border/20 dark:border-dark-border/20 backdrop-blur-md overflow-hidden relative">
                        {/* Background pattern for newsletter section */}
                        <div className="absolute inset-0 opacity-5 dark:opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(rgba(60, 134, 255, 0.4) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                transform: `translate3d(${scrollY * -0.2}px, 0, 0)`,
                            }}
                        />

                        {/* Accent shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-blue/10 blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-primary-blue/10 blur-3xl opacity-30"></div>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                            {/* Newsletter information */}
                            <div className="md:w-1/2">
                                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                                    Subscribe to Our Newsletter
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    Stay updated with our latest news, tech insights, and exclusive offers. Join our community of innovators and tech enthusiasts.
                                </p>
                            </div>

                            {/* Newsletter form */}
                            <div className="w-full md:w-1/2">
                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-5 py-4 bg-white dark:bg-dark-background border border-light-border dark:border-dark-border rounded-xl text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue shadow-sm"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubscribing}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            {isSubscribing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing
                                                </span>
                                            ) : (
                                                <>
                                                    <span>Subscribe</span>
                                                    <ArrowRight size={16} />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Subscription status messages */}
                                    {subscribeStatus === 'success' && (
                                        <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Successfully subscribed! Thank you for joining our newsletter.
                                        </div>
                                    )}

                                    {subscribeStatus === 'error' && (
                                        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Something went wrong. Please try again later.
                                        </div>
                                    )}

                                    <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                        By subscribing, you agree to our <Link href="/privacy-policy" className="underline hover:text-primary-blue transition-colors">Privacy Policy</Link> and <Link href="/terms-of-service" className="underline hover:text-primary-blue transition-colors">Terms of Service</Link>.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar with improved design */}
                <div className="mt-12 pt-8 relative">
                    {/* Simple divider line with gradient */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-light-border/50 dark:via-dark-border/50 to-transparent mb-8"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Copyright notice with additional info */}
                        <div className="text-light-text-muted dark:text-dark-text-muted text-sm mb-6 md:mb-0">
                            <div className="flex items-center mb-2">
                                <SolveJetLogo className="h-6 w-auto mr-2 text-light-text-muted dark:text-dark-text-muted opacity-80" />
                                <span className="border-l border-light-border/30 dark:border-dark-border/30 pl-2 ml-2">© {currentYear} All rights reserved.</span>
                            </div>
                            <p>
                                ISO 27001:2022 Certified • Google Partner • 4.9/5 on Clutch
                            </p>
                        </div>

                        {/* Legal links with dividers */}
                        <div className="flex flex-wrap gap-3 md:gap-0 text-sm">
                            {legalLinks.map((link, index) => (
                                <div key={link.href} className="flex items-center">
                                    <Link
                                        href={link.href}
                                        className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors px-3"
                                    >
                                        {link.label}
                                    </Link>
                                    {index < legalLinks.length - 1 && (
                                        <div className="h-4 w-px bg-light-border/50 dark:bg-dark-border/50 hidden md:block"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Quick links navigation for the footer
 */
const quickLinks: FooterLinkProps[] = [
    { label: 'What We Do', href: '/what-we-do' },
    { label: 'Industries', href: '/industries' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Methodology', href: '/methodology' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
];

/**
 * Service links for the footer
 */
const services: FooterLinkProps[] = [
    { label: 'Custom Development', href: '/what-we-do/custom-development' },
    { label: 'Cloud Solutions', href: '/what-we-do/cloud-solutions' },
    { label: 'MVP Development', href: '/what-we-do/mvp-development' },
    { label: 'Staff Augmentation', href: '/what-we-do/staff-augmentation' },
    { label: 'Web Development', href: '/what-we-do/web-development' },
    { label: 'AI/ML Solutions', href: '/what-we-do/ai-ml' },
];

/**
 * Legal page links for the footer
 */
const legalLinks: FooterLinkProps[] = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookies Policy', href: '/cookies-policy' },
    { label: 'Sitemap', href: '/sitemap' },
];