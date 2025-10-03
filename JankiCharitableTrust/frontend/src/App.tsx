import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/ui/use-toast';

import Layout from './components/Layout';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Dashboard from './components/Dashboard';
import Donate from './components/Donate';
import Contact from './components/Contact';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingBuffer from './components/LoadingBuffer';
import Volunteer from './components/Volunteer';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingBuffer onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/dashboard" element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
              <Route path="/donate" element={<Layout><Donate /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/projects" element={<Layout><Projects /></Layout>} />
              <Route path="/projects/:slug" element={<Layout><ProjectDetails /></Layout>} />
              <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
            </Routes>
          </ToastProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
