// src/components/Script.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useNonce } from './NonceProvider';

interface ScriptProps {
    id?: string;
    children: string;
    async?: boolean;
    defer?: boolean;
    src?: string;
}

export default function Script({ id, children, async = false, defer = false, src }: ScriptProps) {
    // Get nonce from context
    const nonce = useNonce();
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        if (!nonce) {
            console.error('Script component: No nonce available from context');
            return;
        }

        // Create script element
        const script = document.createElement('script');
        if (id) script.id = id;
        if (async) script.async = true;
        if (defer) script.defer = true;
        if (src) script.src = src;

        // This is the crucial part - setting the nonce
        script.setAttribute('nonce', nonce);

        // Set innerHTML safely for inline scripts
        if (children && !src) {
            script.innerHTML = children;
        }

        // Store ref for cleanup
        scriptRef.current = script;

        // Append to body (more reliable than head for some browsers)
        document.body.appendChild(script);

        // Clean up
        return () => {
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current);
            }
        };
    }, [id, children, async, defer, nonce, src]);

    return null;
}