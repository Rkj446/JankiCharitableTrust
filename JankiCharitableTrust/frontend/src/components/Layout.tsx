import Header from './Header';
import Footer from './Footer';
import FloatingQuickAction from './FloatingQuickAction';
import { ReactNode } from 'react';
import ScrollProgressBar from './ScrollProgressBar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <FloatingQuickAction />
      <main className="pt-24 md:pt-20 min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
