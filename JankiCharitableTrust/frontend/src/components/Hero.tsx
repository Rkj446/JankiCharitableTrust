import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import site from '../data/site';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center gradient-hero min-h-[70vh]">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }} 
        className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
      >
        {site.name}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-2xl mx-auto text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed"
      >
        {site.mission}
        <span className="block mt-2 text-sm text-muted-foreground">“{site.inspiration.quote}” — {site.inspiration.author}</span>
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.9 }} 
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link 
          to="/donate" 
          className="gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-lg hover-glow focus-ring transition-all duration-300 hover:scale-105"
        >
          Donate Now
        </Link>
        <Link 
          to="/projects" 
          className="px-8 py-4 rounded-2xl border-2 border-primary/20 bg-card/80 text-foreground font-semibold shadow-lg hover:bg-primary/5 hover:border-primary/40 focus-ring transition-all duration-300 hover:scale-105"
        >
          Our Projects
        </Link>
      </motion.div>
    </section>
  );
}
