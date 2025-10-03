import { Facebook, Twitter, Instagram } from 'lucide-react';
// ...existing code...
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 border-t border-border/60 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo size="md" />
          <p className="max-w-2xl text-sm text-muted-foreground">
            Janki Seva Sangh is committed to service and empowerment through impactful
            community initiatives. Your support helps us reach more people in need.
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6">
          <a 
            href="https://www.facebook.com/people/JANKI-SEVA-SANGH/100067845215910/" 
            aria-label="Facebook" 
            target="_blank"
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            aria-label="Twitter" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            aria-label="Instagram" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center text-sm sm:text-base">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Home</a>
          <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">About</a>
          <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Projects</a>
          <a href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Gallery</a>
          <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Dashboard</a>
          <a href="/donate" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Donate</a>
          <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium">Contact</a>
        </div>
        <div className="text-center">
          <div className="text-xs sm:text-sm mb-1 text-muted-foreground">© {year} Janki Seva Sangh · All Rights Reserved</div>
          <div className="text-xs sm:text-sm font-semibold text-primary">Powered by FlagWR</div>
        </div>
      </div>
    </footer>
  );
}
