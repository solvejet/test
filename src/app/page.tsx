// src/app/page.tsx

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
      </section>
    </div>
  );
}