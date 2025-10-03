import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export default function FloatingQuickAction() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg bg-background text-foreground border border-border/60 hover:bg-muted/60 dark:bg-secondary dark:text-foreground"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}