'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import ClientCsrfToken from '@/components/ClientCsrfToken';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactPage() {
    // Form state
    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Parallax effect state
    const [scrollY, setScrollY] = useState(0);
    const pageRef = useRef<HTMLDivElement>(null);

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message should be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Successful submission
            setFormStatus('success');
            setSubmitted(true);

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    // Parallax effect implementation
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY * 0.1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Office locations data
    const officeLocations = [
        {
            city: 'Sheridan',
            address: '30 N Gould St Ste R',
            country: 'USA',
            phone: '+1 (909) 508-1408'
        },
        {
            city: 'Ahmedabad',
            address: 'H903, Titanium City Center, 100 Feet Rd, near Shyamal Cross Road, Satellite',
            country: 'India',
            phone: '+91 93165 69843'
        }
    ];

    return (
        <div
            ref={pageRef}
            className="max-w-6xl mx-auto py-12 px-4 relative"
        >
            {/* Background elements with parallax effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 right-20 w-96 h-96 rounded-full opacity-10 dark:opacity-5"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.4) 0%, rgba(60, 134, 255, 0.1) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY * -1}px, ${scrollY * 0.5}px, 0)`,
                    }}
                />
                <div
                    className="absolute top-80 -left-48 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.4) 0%, rgba(60, 134, 255, 0.1) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY}px, ${scrollY * 0.8}px, 0)`,
                    }}
                />
                <div
                    className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-10 dark:opacity-5 hidden lg:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(60, 134, 255, 0.3) 0%, rgba(60, 134, 255, 0.05) 70%, transparent 100%)',
                        transform: `translate3d(${scrollY * 0.5}px, ${scrollY * -1}px, 0)`,
                    }}
                />
            </div>

            {/* Page Header with animated underline */}
            <div className="text-center mb-16 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 relative inline-block">
                    Contact Us
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent"></span>
                </h1>
                <p className="text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                    Have a question or ready to start your project? Reach out to our team and we&apos;ll get back to you promptly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                {/* Contact Form Card */}
                <div className="lg:col-span-2 bg-white/90 dark:bg-dark-background/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-light-border/50 dark:border-dark-border/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                    {/* Card gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none"></div>

                    <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 flex items-center">
                        <Mail className="mr-3 text-primary-blue" size={24} />
                        Send Us a Message
                    </h2>

                    {/* Status messages */}
                    {formStatus === 'success' && (
                        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-400 flex items-start">
                            <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium">Message Sent Successfully!</h3>
                                <p className="text-sm mt-1">Thank you for contacting us. We&apos;ll respond to your inquiry as soon as possible.</p>
                            </div>
                        </div>
                    )}

                    {formStatus === 'error' && (
                        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-400 flex items-start">
                            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium">Unable to Send Message</h3>
                                <p className="text-sm mt-1">Something went wrong. Please try again or contact us directly via email.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ClientCsrfToken />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-light-text-muted dark:text-dark-text-muted">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name
                                            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                                            : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/80'
                                            } text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 pl-2">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-light-text-muted dark:text-dark-text-muted">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email
                                            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                                            : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/80'
                                            } text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200`}
                                        placeholder="johndoe@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 pl-2">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                            >
                                Subject
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-light-text-muted dark:text-dark-text-muted">
                                    <FileText size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.subject
                                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                                        : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/80'
                                        } text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200`}
                                    placeholder="Project Inquiry"
                                />
                            </div>
                            {errors.subject && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1 pl-2">{errors.subject}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.message
                                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                                    : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/80'
                                    } text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200`}
                                placeholder="Tell us about your project or inquiry..."
                            />
                            {errors.message && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1 pl-2">{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-base font-medium relative overflow-hidden group"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending Message...
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    {/* Info Card */}
                    <div className="bg-white/90 dark:bg-dark-background/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-light-border/50 dark:border-dark-border/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                        {/* Card accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>

                        <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Get In Touch
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-light-surface dark:bg-dark-surface p-3 rounded-full mr-4">
                                    <Mail className="text-primary-blue w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                                        Email Us
                                    </h3>
                                    <a href="mailto:info@solvejet.net" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors block">
                                        info@solvejet.net
                                    </a>
                                    <a href="mailto:support@solvejet.net" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors block">
                                        support@solvejet.net
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-light-surface dark:bg-dark-surface p-3 rounded-full mr-4">
                                    <Phone className="text-primary-blue w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                                        Call Us
                                    </h3>
                                    <a href="tel:+15551234567" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors block">
                                        +1 (555) 123-4567 <span className="text-light-text-muted dark:text-dark-text-muted">(US)</span>
                                    </a>
                                    <a href="tel:+915559876543" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-blue dark:hover:text-primary-blue transition-colors block">
                                        +91 (555) 987-6543 <span className="text-light-text-muted dark:text-dark-text-muted">(India)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours Card */}
                    <div className="bg-white/90 dark:bg-dark-background/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-light-border/50 dark:border-dark-border/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                        {/* Card accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue via-transparent to-primary-blue"></div>

                        <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Business Hours
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">Monday - Friday:</span>
                                <span className="text-light-text-primary dark:text-dark-text-primary font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">Saturday:</span>
                                <span className="text-light-text-primary dark:text-dark-text-primary font-medium">10:00 AM - 2:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">Sunday:</span>
                                <span className="text-light-text-primary dark:text-dark-text-primary font-medium">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Office Locations */}
            <div className="mt-16 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-10 text-center">
                    Our Offices
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {officeLocations.map((office, index) => (
                        <div
                            key={index}
                            className="bg-white/90 dark:bg-dark-background/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-light-border/50 dark:border-dark-border/50 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] group"
                        >
                            <div className="flex items-start">
                                <div className="bg-light-surface dark:bg-dark-surface p-3 rounded-full mr-4 group-hover:bg-primary-blue/10 transition-colors">
                                    <MapPin className="text-primary-blue w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                        {office.city}, {office.country}
                                    </h3>
                                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-3">
                                        {office.address}
                                    </p>
                                    <div className="flex items-center">
                                        <Phone className="text-primary-blue w-4 h-4 mr-2" />
                                        <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                            {office.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center">
                    Frequently Asked Questions
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-center mb-10 max-w-2xl mx-auto">
                    Find quick answers to common questions about working with SolveJet
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white/90 dark:bg-dark-background/90 backdrop-blur-md rounded-xl p-6 shadow-sm border border-light-border/50 dark:border-dark-border/50">
                            <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// FAQ Data
const faqs = [
    {
        question: "What services does SolveJet offer?",
        answer: "We offer a wide range of services including custom software development, cloud solutions, MVP development, staff augmentation, web development, and AI/ML solutions."
    },
    {
        question: "How quickly can you start my project?",
        answer: "We can typically begin work within 1-2 weeks of finalizing project details and agreements. For urgent needs, we may be able to accommodate faster timelines."
    },
    {
        question: "Do you work with startups and small businesses?",
        answer: "Absolutely! We work with companies of all sizes, from startups to enterprises. We tailor our approach based on your specific needs and budget."
    },
    {
        question: "What is your typical project process?",
        answer: "Our process includes discovery, planning, design, development, testing, deployment, and ongoing support. We follow agile methodologies to ensure flexibility and transparency."
    }
];