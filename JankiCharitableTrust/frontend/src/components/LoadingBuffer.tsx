import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import PageSkeleton from './PageSkeleton';

interface LoadingBufferProps {
  onComplete: () => void;
}

export default function LoadingBuffer({ onComplete }: LoadingBufferProps) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  useEffect(() => {
    const skeletonTimer = setTimeout(() => setShowSkeleton(true), 250);
    const timeoutId = setTimeout(() => onComplete(), 1400);
    return () => { clearTimeout(timeoutId); clearTimeout(skeletonTimer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[9999] bg-background/95 dark:bg-background/95 flex items-center justify-center"
      >
        <div className="relative flex items-center justify-center">
          <div className="relative" style={{ width: 120, height: 120 }}>
            <div className="absolute inset-0 rounded-full border-2 border-muted/50" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
            />
            <div className="absolute inset-6 flex items-center justify-center">
              <Logo size="lg" animated={false} />
            </div>
          </div>
        </div>
        {showSkeleton && (
          <div className="mt-8 w-full max-w-5xl">
            <PageSkeleton />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}


