// src/app/login/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';

// Separate component that uses useSearchParams
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Get store functions
    const { setUser, setAuthenticated } = useAppStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // This is a mock login for demonstration
            // In a real app, you would make an API call to authenticate

            if (email === 'demo@solvejet.net' && password === 'password123') {
                // Mock a successful login
                const mockUser = {
                    id: '123',
                    name: 'Demo User',
                    email: 'demo@solvejet.net'
                };

                // Set user in store
                setUser(mockUser);
                setAuthenticated(true);

                // Store token in cookie (in a real app this would be set by the server)
                document.cookie = `auth-token=mock-jwt-token; path=/; max-age=3600; SameSite=Strict`;

                // Redirect to callback URL
                router.push(callbackUrl);
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                >
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-solvejet-light-medium-dark dark:text-solvejet-medium-grey" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 block w-full rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey px-4 py-2 focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                >
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-solvejet-light-medium-dark dark:text-solvejet-medium-grey" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 block w-full rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey px-4 py-2 focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                        placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey hover:text-solvejet-light-dark-grey dark:hover:text-solvejet-light-grey"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-solvejet-light-blue dark:text-solvejet-blue border-solvejet-light-off-white dark:border-solvejet-secondary-dark rounded"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-solvejet-light-medium-dark dark:text-solvejet-medium-grey"
                    >
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link
                        href="/forgot-password"
                        className="text-solvejet-light-blue dark:text-solvejet-blue hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-2 flex justify-center items-center"
                >
                    {isLoading ? (
                        <span className="loader">Loading...</span>
                    ) : (
                        'Sign in'
                    )}
                </button>
            </div>
        </form>
    );
}

// Loading fallback for suspense
function LoginFormLoading() {
    return (
        <div className="space-y-6">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
            <div className="flex justify-between">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-32 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-32 rounded-md"></div>
            </div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
        </div>
    );
}

// Main login page component
export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white dark:bg-solvejet-dark-grey rounded-xl shadow-md p-8 border border-solvejet-light-off-white dark:border-solvejet-secondary-dark">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey">
                        Sign in to SolveJet
                    </h1>
                    <p className="mt-2 text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                        Enter your credentials to access your account
                    </p>
                </div>

                <Suspense fallback={<LoginFormLoading />}>
                    <LoginForm />
                </Suspense>

                {/* For demo purposes */}
                <div className="mt-8 p-4 bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark rounded-md">
                    <p className="text-sm text-solvejet-light-medium-dark dark:text-solvejet-medium-grey text-center">
                        <strong>Demo Credentials:</strong><br />
                        Email: demo@solvejet.net<br />
                        Password: password123
                    </p>
                </div>
            </div>
        </div>
    );
}