// src/app/learn-more/page.tsx
import { ArrowRight, Award, Code, FileCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function LearnMorePage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                About SolveJet
            </h1>

            <p className="text-lg text-solvejet-light-medium-dark dark:text-solvejet-medium-grey mb-8">
                SolveJet is a premier Custom Software Development Company, proudly holding Google Partner status and ISO 27001:2022 certification. With a team of expert engineers and consultants, we deliver cutting-edge solutions to clients worldwide.
            </p>

            {/* Our Expertise Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                    Our Expertise
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ExpertiseCard
                        icon={<Code size={24} />}
                        title="Custom Software Development"
                        description="Tailored solutions designed to address your unique business challenges and opportunities."
                    />

                    <ExpertiseCard
                        icon={<Users size={24} />}
                        title="Enterprise Solutions"
                        description="Robust, scalable platforms that support your organization's growth and digital transformation."
                    />

                    <ExpertiseCard
                        icon={<FileCheck size={24} />}
                        title="Quality Assurance"
                        description="Rigorous testing methodologies that ensure flawless performance and security."
                    />

                    <ExpertiseCard
                        icon={<Award size={24} />}
                        title="Certified Excellence"
                        description="Industry-recognized standards and certifications that validate our commitment to quality."
                    />
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                    Our Approach
                </h2>

                <div className="space-y-6">
                    <div className="p-6 rounded-lg bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark">
                        <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-3">
                            1. Understand
                        </h3>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            We begin by deeply understanding your business, challenges, and goals through comprehensive discovery sessions.
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark">
                        <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-3">
                            2. Design
                        </h3>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            Our experts design a tailored solution architecture that aligns with your specific needs and future growth plans.
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark">
                        <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-3">
                            3. Develop
                        </h3>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            Using agile methodologies, we build your solution with regular iterations and continuous feedback implementation.
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark">
                        <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-3">
                            4. Deploy & Support
                        </h3>
                        <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                            We ensure smooth deployment and provide ongoing support and maintenance to keep your solution running optimally.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="p-8 rounded-xl bg-gradient-to-r from-solvejet-light-blue to-solvejet-light-blue/80 dark:from-solvejet-blue dark:to-solvejet-blue/80 text-white">
                <h2 className="text-2xl font-bold mb-4">
                    Ready to transform your business?
                </h2>

                <p className="mb-6 text-white/90">
                    Get in touch with our team to discuss how SolveJet can help you achieve your technology goals.
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link href="/contact">
                        <button className="bg-white text-solvejet-light-blue dark:text-solvejet-blue px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-all flex items-center gap-2">
                            Contact Us <ArrowRight size={18} />
                        </button>
                    </Link>

                    <Link href="/case-studies">
                        <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-all">
                            View Case Studies
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function ExpertiseCard({
    icon,
    title,
    description
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="p-6 rounded-lg bg-white dark:bg-solvejet-dark-grey border border-solvejet-light-off-white dark:border-solvejet-secondary-dark">
            <div className="text-solvejet-light-blue dark:text-solvejet-blue mb-4">
                {icon}
            </div>

            <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2">
                {title}
            </h3>

            <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                {description}
            </p>
        </div>
    );
}