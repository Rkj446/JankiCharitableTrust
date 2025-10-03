import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import site from '../data/site';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const MENU = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
  { name: 'Volunteer', href: '/volunteer' },
];

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

  const onLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      setAccountOpen(false);
      navigate('/login');
    } catch {}
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Lock body scroll when the mobile menu is open
    if (menuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-5 left-0 w-full z-50 pointer-events-none">
      <nav
        className={`pointer-events-auto max-w-6xl mx-3 md:mx-auto flex items-center justify-between px-4 py-3 rounded-3xl transition-all duration-300 backdrop-blur-md border ${
          scrolled
            ? 'bg-white/85 dark:bg-black/60 shadow-xl border-border/60'
            : 'bg-white/70 dark:bg-black/50 shadow-lg border-border/50'
        }`}
        aria-label="Main Navigation"
      >
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" aria-label="Home">
          <Logo size="lg" animated={true} layoutId="main-logo" />
          <span className="font-bold text-xl text-foreground">{site.name}</span>
        </Link>
        <div className="hidden md:flex gap-2 items-center">
          {MENU.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 focus-ring ${
                  isActive 
                    ? 'text-primary bg-primary/10 shadow-sm' 
                    : 'text-foreground/90 hover:text-primary hover:bg-primary/10'
                }`
              }
              aria-label={item.name}
            >
              {item.name}
            </NavLink>
          ))}
          <ThemeToggle />
          <div className="relative">
            <button
              className="px-3 py-2 rounded-lg border border-border/50 bg-card/60 hover:bg-muted/50 focus-ring"
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((v) => !v)}
            >
              <span className="sr-only">Account</span>
              {/* Simple avatar/icon substitute */}
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40" />
            </button>
            {accountOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 min-w-[180px] rounded-xl border border-border/50 bg-card/95 backdrop-blur-md shadow-xl p-2 z-50"
              >
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-foreground/90 hover:bg-primary/10 hover:text-primary focus-ring"
                    role="menuitem"
                    onClick={() => setAccountOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-foreground/90 hover:bg-destructive/10 hover:text-destructive focus-ring"
                    role="menuitem"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
          <Link to="/donate" aria-label="Donate">
            <Button
              className="gradient-primary text-primary-foreground px-6 py-2 rounded-xl shadow-lg hover-glow focus-ring font-semibold"
            >
              Donate
            </Button>
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-lg focus-ring hover:bg-muted/50 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden pointer-events-auto">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" aria-hidden="true" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-3 right-3 top-24 z-20 rounded-2xl gradient-card shadow-xl p-6 flex flex-col gap-3 border border-border/50 dark:shadow-card-dark" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Menu</span>
              <button aria-label="Close" className="p-2 rounded hover:bg-muted" onClick={() => setMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            {MENU.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `py-3 text-lg rounded-lg focus-ring transition-all duration-200 ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`
                }
                aria-label={item.name}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)} className="py-3 text-lg rounded-lg focus-ring transition-all duration-200 text-foreground/80 hover:text-primary hover:bg-primary/5">
              Login
            </Link>
            <Link to="/donate" onClick={() => setMenuOpen(false)} aria-label="Donate">
              <Button className="gradient-primary text-primary-foreground w-full px-4 py-3 rounded-xl shadow-lg hover-glow focus-ring font-semibold">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
