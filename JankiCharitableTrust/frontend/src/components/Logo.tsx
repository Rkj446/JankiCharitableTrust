import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', animated = false, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  } as const;

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={animated ? { scale: 1.03 } : {}}
      whileTap={animated ? { scale: 0.97 } : {}}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent ring-1 ring-border/60 shadow-card dark:shadow-card-dark" />
      <div className="relative w-full h-full p-1.5">
        <div className="w-full h-full rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="Janki Seva Sangh Logo"
            className="w-full h-full object-contain"
            loading="eager"
            decoding="async"
                fetchPriority="high"
          />
        </div>
      </div>
    </motion.div>
  );
}
