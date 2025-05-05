// src/app/contact/page.tsx
import { Mail, MapPin, Phone } from 'lucide-react';
import ClientCsrfToken from '@/components/ClientCsrfToken';

export default function ContactPage() {
    return (
        <div className="max-w-5xl mx-auto py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6 text-center">
                Contact Us
            </h1>

            <p className="text-lg text-solvejet-light-medium-dark dark:text-solvejet-medium-grey mb-12 text-center max-w-2xl mx-auto">
                Have a question or ready to start your project? Reach out to our team and we&apos;ll get back to you promptly.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2 bg-white dark:bg-solvejet-dark-grey rounded-xl p-6 md:p-8 shadow-sm border border-solvejet-light-off-white dark:border-solvejet-secondary-dark">
                    <h2 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                        Send Us a Message
                    </h2>

                    <form className="space-y-6">
                        <ClientCsrfToken />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-2 rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-2 rounded-md border border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-secondary-dark text-solvejet-light-dark-grey dark:text-solvejet-light-grey focus:outline-none focus:ring-2 focus:ring-solvejet-light-blue dark:focus:ring-solvejet-blue"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark rounded-xl p-6 md:p-8 border border-solvejet-light-off-white/50 dark:border-solvejet-secondary-dark/50">
                    <h2 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="flex-shrink-0 w-5 h-5 text-solvejet-light-blue dark:text-solvejet-blue mt-1" />
                            <div>
                                <h3 className="font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey">
                                    Email Us
                                </h3>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    info@solvejet.net
                                </p>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    support@solvejet.net
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="flex-shrink-0 w-5 h-5 text-solvejet-light-blue dark:text-solvejet-blue mt-1" />
                            <div>
                                <h3 className="font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey">
                                    Call Us
                                </h3>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    +1 (555) 123-4567 (US)
                                </p>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    +91 (555) 987-6543 (India)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="flex-shrink-0 w-5 h-5 text-solvejet-light-blue dark:text-solvejet-blue mt-1" />
                            <div>
                                <h3 className="font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey">
                                    Visit Us
                                </h3>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    123 Tech Park Avenue,
                                </p>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    San Francisco, CA 94103
                                </p>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey mt-2">
                                    456 Innovation Center,
                                </p>
                                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                                    Ahmedabad, Gujarat 380015
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-solvejet-light-off-white/50 dark:border-solvejet-secondary-dark/80">
                        <h3 className="font-medium text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-3">
                            Business Hours
                        </h3>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            Monday - Friday: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            Saturday: 10:00 AM - 2:00 PM
                        </p>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            Sunday: Closed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}