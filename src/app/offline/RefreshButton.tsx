'use client';

import { RefreshCw } from 'lucide-react';

export default function RefreshButton() {
    return (
        <button
            onClick={() => window.location.reload()}
            className="btn-primary flex items-center justify-center mx-auto gap-2"
        >
            <RefreshCw size={18} />
            Try Again
        </button>
    );
}