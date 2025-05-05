// src/app/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-solvejet-light-dark-grey dark:text-solvejet-light-grey">
          Sophisticated Engineering,{' '}
          <span className="text-solvejet-light-blue dark:text-solvejet-blue">
            Cutting-Edge Tech
          </span>
        </h1>

        <p className="text-lg md:text-xl text-solvejet-light-medium-dark dark:text-solvejet-medium-grey max-w-2xl mx-auto">
          Experience premium solutions engineered for performance and security.
          SolveJet delivers innovative technology for modern challenges.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/get-started">
            <button className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </button>
          </Link>

          <Link href="/learn-more">
            <button className="btn-secondary flex items-center gap-2">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}