import Hero from './Hero';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Janki Charitable Trust - Serving Humanity with Compassion</title>
        <meta name="description" content="Janki Charitable Trust is dedicated to uplifting lives in Hooghly, WB through education, healthcare, and sustainable development initiatives." />
      </Helmet>
      <div className="flex flex-col gap-8">
        <Hero />
        <section className="px-4 max-w-5xl mx-auto text-center">
          <p className="text-lg text-foreground/80 mb-6">Explore our mission, vision, and the inspiration that guides our work.</p>
          <Link to="/about" className="underline text-primary hover:text-accent font-semibold focus-ring">Learn more on the About page</Link>
        </section>
        <Projects />
      </div>
    </>
  );
}