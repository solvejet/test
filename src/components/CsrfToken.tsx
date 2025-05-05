// src/components/CsrfToken.tsx
'use client';

import { useEffect, useState } from 'react';

interface CsrfTokenProps {
    token: string;
}

export default function CsrfToken({ token }: CsrfTokenProps) {
    const [csrfToken, setCsrfToken] = useState<string>(token);

    // Update the token if it changes
    useEffect(() => {
        setCsrfToken(token);
    }, [token]);

    return (
        <input type="hidden" name="csrfToken" value={csrfToken} />
    );
}

