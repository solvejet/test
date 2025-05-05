// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import SolveJetLogo from '../ui/SolveJetLogo';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-light-border/30 dark:border-dark-border/30 relative overflow-hidden">
            {/* Gradient orbs in the background - only visible in dark mode */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl dark:block hidden"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl dark:block hidden"></div>

            {/* Main footer content */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: Logo and company info */}
                    <div className="space-y-6">
                        <SolveJetLogo className="text-light-text-primary dark:text-dark-text-primary h-8 w-auto" />
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            Engineering Tomorrow, Delivering Today. We help businesses transform through technology.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/solvejet" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://linkedin.com/company/solvejet" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                <Linkedin size={20} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://facebook.com/solvejet" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                <Facebook size={20} />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://instagram.com/solvejet" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                <Instagram size={20} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://github.com/solvejet" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                <Github size={20} />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/what-we-do" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    What We Do
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Industries
                                </Link>
                            </li>
                            <li>
                                <Link href="/case-studies" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link href="/methodology" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Methodology
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Our Services
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/what-we-do/custom-development" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Custom Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-we-do/cloud-solutions" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Cloud Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-we-do/mvp-development" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    MVP Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-we-do/staff-augmentation" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Staff Augmentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-we-do/web-development" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-we-do/ai-ml" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                                    AI/ML Solutions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact info */}
                    <div>
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Mail className="text-primary-blue min-w-5 h-5 mr-3 mt-1" />
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    info@solvejet.net
                                </span>
                            </div>
                            <div className="flex items-start">
                                <Phone className="text-primary-blue min-w-5 h-5 mr-3 mt-1" />
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    +1 (555) 123-4567
                                </span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="text-primary-blue min-w-5 h-5 mr-3 mt-1" />
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    123 Tech Park Avenue,<br />
                                    San Francisco, CA 94103
                                </span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="text-primary-blue min-w-5 h-5 mr-3 mt-1" />
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    456 Innovation Center,<br />
                                    Ahmedabad, Gujarat 380015
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter subscription */}
                <div className="mt-12 pt-8 border-t border-light-border/30 dark:border-dark-border/30">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="md:w-1/2">
                            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                Subscribe to Our Newsletter
                            </h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                Stay updated with our latest news and insights
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue"
                                />
                                <button
                                    type="button"
                                    className="btn-primary whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-light-border/30 dark:border-dark-border/30 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-light-text-muted dark:text-dark-text-muted text-sm mb-4 md:mb-0">
                        © {currentYear} SolveJet. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy-policy" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies-policy" className="text-light-text-muted dark:text-dark-text-muted hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                            Cookies Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}