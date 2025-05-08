'use client';

import { useEffect, useRef, useState, type JSX } from 'react';
import { useNonce } from '@/components/NonceProvider';
import Script from '@/components/Script';

// Rotating words array for the subtitle
const rotatingWords = [
    'Software Solutions',
    'Web Applications',
    'Mobile Apps',
    'Cloud Infrastructure',
    'AI Engineering',
];

export default function HeroSection(): JSX.Element {
    const [scrollY, setScrollY] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isChangingWord, setIsChangingWord] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const nonce = useNonce();
    const [clutchLoaded, setClutchLoaded] = useState(false);
    const [goodFirmsLoaded, setGoodFirmsLoaded] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = (): void => {
            setScrollY(window.scrollY * 0.1);
        };

        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Handle initial visibility
        setIsVisible(true);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Rotating words effect
    useEffect(() => {
        const wordRotationInterval = setInterval(() => {
            setIsChangingWord(true);

            // Wait for fade out animation to complete
            setTimeout(() => {
                setCurrentWordIndex((prevIndex) =>
                    prevIndex === rotatingWords.length - 1 ? 0 : prevIndex + 1
                );

                // Wait a bit before fading in the new word
                setTimeout(() => {
                    setIsChangingWord(false);
                }, 100);
            }, 400);
        }, 3000);

        return () => clearInterval(wordRotationInterval);
    }, []);

    // Set up event listeners for widget loading
    useEffect(() => {
        const handleClutchLoad = () => {
            setClutchLoaded(true);
        };

        const handleGoodFirmsLoad = () => {
            setGoodFirmsLoaded(true);
        };

        // Add event listeners
        window.addEventListener('clutch-widget-loaded', handleClutchLoad);
        window.addEventListener('goodfirms-widget-loaded', handleGoodFirmsLoad);

        // Clean up
        return () => {
            window.removeEventListener('clutch-widget-loaded', handleClutchLoad);
            window.removeEventListener('goodfirms-widget-loaded', handleGoodFirmsLoad);
        };
    }, []);

    // Setup global event dispatcher functions if they don't exist yet
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only execute in browser environment
            if (!window.clutchWidgetLoaded) {
                window.clutchWidgetLoaded = () => {
                    window.dispatchEvent(new Event('clutch-widget-loaded'));
                };
            }

            if (!window.goodFirmsWidgetLoaded) {
                window.goodFirmsWidgetLoaded = () => {
                    window.dispatchEvent(new Event('goodfirms-widget-loaded'));
                };
            }
        }
    }, []);

    return (
        <>
            {/* Add the widget scripts using the Script component for proper nonce handling */}
            {nonce && (
                <>
                    <Script id="clutch-widget-script">
                        {`
                            // Load Clutch Widget
                            (function() {
                                var script = document.createElement('script');
                                script.async = true;
                                script.src = "https://widget.clutch.co/static/js/widget.js";
                                script.onload = function() {
                                    if (typeof window.clutchWidgetLoaded === 'function') {
                                        window.clutchWidgetLoaded();
                                    }
                                };
                                document.body.appendChild(script);
                            })();
                        `}
                    </Script>

                    <Script id="goodfirms-widget-script">
                        {`
                            // Load GoodFirms Widget
                            (function() {
                                var script = document.createElement('script');
                                script.async = true;
                                script.src = "https://assets.goodfirms.co/assets/js/widget.min.js";
                                script.onload = function() {
                                    if (typeof window.goodFirmsWidgetLoaded === 'function') {
                                        window.goodFirmsWidgetLoaded();
                                    }
                                };
                                document.body.appendChild(script);
                            })();
                        `}
                    </Script>
                </>
            )}

            <section
                ref={heroRef}
                className="relative min-h-[80vh] sm:min-h-[75vh] flex items-center overflow-hidden py-12 sm:py-8"
            >
                {/* Main Hero Content */}
                <div className="container mx-auto px-1 relative z-10 flex flex-col justify-between min-h-[65vh] sm:min-h-[60vh]">
                    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                        {/* Main Headline with increased font size and removed tracking-wider for mobile */}
                        <h1
                            className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-light-text-primary dark:text-dark-text-primary tracking-normal sm:tracking-wider mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <span>Engineering Tomorrow</span>
                        </h1>

                        {/* Rotating text with increased font size for mobile */}
                        <div
                            className={`relative h-12 sm:h-14 md:h-16 lg:h-20 overflow-hidden mb-4 sm:mb-8 md:mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-primary-blue">
                                Crafting
                                <span className={`inline-block ml-2 sm:ml-3 transition-opacity duration-300 ${isChangingWord ? 'opacity-0' : 'opacity-100'}`}>
                                    {rotatingWords[currentWordIndex]}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Bottom row with paragraph and widgets - adaptive layout for all screen sizes */}
                    <div className="mb-12 sm:mb-12 md:mb-16">
                        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-12">
                            {/* Paragraph (left/top on mobile) */}
                            <div className="lg:w-1/2 max-w-2xl">
                                <p
                                    className={`text-base sm:text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                    style={{ transitionDelay: '400ms' }}
                                >
                                    We turn complex business requirements into exceptional software solutions.
                                    Experience premium engineering that delivers results and drives growth.
                                </p>
                            </div>

                            {/* Rating Widgets Section (right/bottom on mobile) */}
                            <div
                                className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: '500ms' }}
                            >
                                <div className="flex flex-col items-start lg:items-end">
                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full overflow-x-hidden">
                                        {/* Widget Container */}
                                        <div className="flex flex-wrap gap-6 w-full overflow-hidden">
                                            {/* Clutch Widget */}
                                            <div
                                                className={`clutch-widget rounded-md overflow-hidden h-[45px] min-w-[200px] ${!clutchLoaded ? 'bg-light-surface dark:bg-dark-surface' : ''}`}
                                                data-url="https://widget.clutch.co"
                                                data-widget-type="2"
                                                data-height="45"
                                                data-nofollow="true"
                                                data-expandifr="true"
                                                data-scale="100"
                                                data-clutchcompany-id="2101858"
                                            >
                                                {!clutchLoaded && (
                                                    <div className="w-full h-full animate-pulse flex items-center">
                                                        <div className="h-4 w-4 rounded-full bg-light-border dark:bg-dark-border ml-3"></div>
                                                        <div className="h-4 bg-light-border dark:bg-dark-border rounded ml-2 w-16"></div>
                                                        <div className="h-3 bg-light-border dark:bg-dark-border rounded ml-3 w-32"></div>
                                                        <div className="h-3 bg-light-border dark:bg-dark-border rounded ml-3 w-20"></div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* GoodFirms Widget */}
                                            <div
                                                className={`goodfirm-widget rounded-md overflow-hidden h-[45px] min-w-[180px] ${!goodFirmsLoaded ? 'bg-light-surface dark:bg-dark-surface' : ''}`}
                                                data-widget-type="goodfirms-widget-t3"
                                                data-widget-pattern="star-basic"
                                                data-height="45"
                                                data-width="180"
                                                data-company-id="173028"
                                            >
                                                {!goodFirmsLoaded && (
                                                    <div className="w-full h-full animate-pulse flex items-center">
                                                        <div className="h-4 bg-light-border dark:bg-dark-border rounded ml-3 w-16"></div>
                                                        <div className="flex space-x-1 ml-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div key={i} className="h-4 w-4 bg-light-border dark:bg-dark-border rounded-full"></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// Add type definitions for window object
declare global {
    interface Window {
        clutchWidgetLoaded?: () => void;
        goodFirmsWidgetLoaded?: () => void;
    }
}