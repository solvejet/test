// src/app/get-started/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function GetStartedPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-6">
                Get Started with SolveJet
            </h1>

            <p className="text-lg text-solvejet-light-medium-dark dark:text-solvejet-medium-grey mb-8">
                Follow these simple steps to begin your journey with SolveJet&apos;s powerful solutions. Our team is ready to guide you through the entire process.
            </p>

            <div className="space-y-8 mb-12">
                <StepCard
                    number={1}
                    title="Book a Consultation"
                    description="Schedule a free consultation with our solutions experts to discuss your needs and goals."
                />

                <StepCard
                    number={2}
                    title="Get a Custom Proposal"
                    description="Receive a tailored proposal designed specifically for your business requirements."
                />

                <StepCard
                    number={3}
                    title="Begin Implementation"
                    description="Our development team will start working on your solution with regular updates and milestones."
                />

                <StepCard
                    number={4}
                    title="Launch and Support"
                    description="Deploy your solution with our dedicated support team ready to assist you."
                />
            </div>

            <div className="bg-solvejet-light-off-white dark:bg-solvejet-secondary-dark rounded-xl p-6 md:p-8 border border-solvejet-light-blue/20 dark:border-solvejet-blue/20">
                <h2 className="text-xl md:text-2xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-4">
                    Ready to transform your business?
                </h2>

                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey mb-6">
                    Contact us today to start your journey with SolveJet. Our team is standing by to help you implement cutting-edge solutions for your unique challenges.
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link href="/contact">
                        <button className="btn-primary flex items-center gap-2">
                            Contact Us <ArrowRight size={18} />
                        </button>
                    </Link>

                    <Link href="/solutions">
                        <button className="btn-secondary">
                            Explore Solutions
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StepCard({
    number,
    title,
    description
}: {
    number: number;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4 items-start p-6 rounded-lg bg-white dark:bg-solvejet-dark-grey border border-solvejet-light-off-white dark:border-solvejet-secondary-dark">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-solvejet-light-blue/10 dark:bg-solvejet-blue/20 flex items-center justify-center text-solvejet-light-blue dark:text-solvejet-blue font-semibold">
                {number}
            </div>

            <div>
                <h3 className="text-xl font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-2">
                    {title}
                </h3>

                <p className="text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                    {description}
                </p>
            </div>
        </div>
    );
}