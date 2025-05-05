// src/components/NonceProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';

// Create a context for the nonce
const NonceContext = createContext<string>('');

// Create a hook to use the nonce
export function useNonce() {
    return useContext(NonceContext);
}

// Provider component
export default function NonceProvider({
    children,
    nonce,
}: {
    children: React.ReactNode;
    nonce: string;
}) {
    return (
        <NonceContext.Provider value={nonce}>
            {children}
        </NonceContext.Provider>
    );
}