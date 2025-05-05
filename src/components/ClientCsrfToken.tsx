// src/components/ClientCsrfToken.tsx
'use client';

import { useCsrfToken } from '@/utils/csrf-client';

export default function ClientCsrfToken() {
    const { token, isLoading, error } = useCsrfToken();

    if (error) {
        console.error('CSRF token error:', error);
    }

    if (isLoading || !token) {
        // Return an empty input while loading
        return <input type="hidden" name="csrfToken" value="" />;
    }

    return <input type="hidden" name="csrfToken" value={token} />;
}