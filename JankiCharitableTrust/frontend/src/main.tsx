import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { StrictMode } from 'react';
import App from './App';
import './index.css'; // Tailwind styles

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
