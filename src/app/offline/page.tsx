'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
    const [isOnline, setIsOnline] = useState(true);
    const [lastVisitedPath, setLastVisitedPath] = useState('/');
    const [, setCacheFailed] = useState(false);

    // Check online status and get last visited page from sessionStorage if available
    useEffect(() => {
        // Check if we're online or offline
        setIsOnline(navigator.onLine);

        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        // Get the last visited path from session storage if available
        const storedPath = sessionStorage.getItem('lastVisitedPath');
        if (storedPath && storedPath !== '/offline') {
            setLastVisitedPath(storedPath);
        }

        // Listen for online/offline events
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Clean up
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    // Try to load the page from cache when online
    useEffect(() => {
        if (isOnline) {
            // We're back online, see if we can preload the last visited page
            const tryFetchCache = async () => {
                try {
                    // Try to fetch the page from cache
                    const cache = await caches.open('others');
                    const cachedResponse = await cache.match(lastVisitedPath);

                    if (!cachedResponse) {
                        // Page is not in cache
                        setCacheFailed(true);
                    }
                } catch (error) {
                    console.error('Failed to check cache:', error);
                    setCacheFailed(true);
                }
            };

            tryFetchCache();
        }
    }, [isOnline, lastVisitedPath]);

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="glassmorphism p-8 max-w-md w-full rounded-2xl">
                <div className="bg-light-surface/50 dark:bg-dark-surface/40 rounded-full p-6 mb-6 inline-block">
                    <WifiOff size={48} className="text-primary-blue" />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                    {isOnline ? 'Page Not Available Offline' : 'You\'re Offline'}
                </h1>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
                    {isOnline
                        ? 'You\'re back online, but this page wasn\'t cached for offline viewing. Try refreshing or returning to the home page.'
                        : 'It seems you\'ve lost your internet connection. Don\'t worry though, you can still access previously visited pages once connection is restored.'}
                </p>

                <div className="space-y-4">
                    {isOnline ? (
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={handleRefresh}
                                className="btn-primary flex items-center justify-center mx-auto gap-2 w-full md:w-auto"
                            >
                                <RefreshCw size={18} />
                                Refresh Page
                            </button>

                            <Link href="/" className="btn-secondary flex items-center justify-center mx-auto gap-2 w-full md:w-auto">
                                <Home size={18} />
                                Go to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGoBack}
                                className="btn-secondary flex items-center justify-center gap-2 w-full md:w-auto"
                            >
                                <ArrowLeft size={18} />
                                Go Back
                            </button>

                            <button
                                onClick={handleRefresh}
                                className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-sm text-light-text-muted dark:text-dark-text-muted">
                <p>Need help? Contact support at <Link href="mailto:support@solvejet.net">support@solvejet.net</Link></p>
            </div>
        </div>
    );
}