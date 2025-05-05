// src/app/offline/page.tsx
import { WifiOff } from 'lucide-react';
import Link from 'next/link';
import RefreshButton from './RefreshButton';

export default function OfflinePage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark rounded-full p-6 mb-6">
                <WifiOff size={48} className="text-solvejet-light-blue dark:text-solvejet-blue" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-4">
                You&apos;re Offline
            </h1>

            <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey max-w-md mb-8">
                It seems you&apos;ve lost your internet connection. Don&apos;t worry though, you can still access some previously visited pages.
            </p>

            <div className="space-y-4">
                <RefreshButton />

                <Link href="/" className="block text-solvejet-light-blue dark:text-solvejet-blue hover:underline">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}