// src/App.jsx
import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import { useI18n } from './i18n/i18n';

function App() {
  // Ensure we scroll to top on route change when there is no hash fragment.
  // This prevents landing at the bottom of a page after navigation from a product card.
  const location = useLocation();
  const { locale } = useI18n();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <HelmetProvider>
      <Helmet htmlAttributes={{ lang: locale }} />
      <Background />

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </HelmetProvider>
  )
}

export default App;
