import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Default to light mode, ignore system preference
    return false;
  });

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setIsDark((v) => !v)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/80 text-foreground shadow-lg hover:bg-muted/50 focus-ring transition-all duration-300 hover:scale-105 hover-glow"
    >
      {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-primary" />}
    </button>
  )
}



