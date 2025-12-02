import App from './App';

import HomePage from './pages/Home/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import AboutPage from './pages/About/AboutPage';
import NewsPage from './pages/News/NewsPage';
import JoinPage from './pages/Join/JoinPage';
import ContactPage from './pages/Contact/ContactPage';
import SitemapPage from './pages/Sitemap/SitemapPage';

import LangmuirPage from './pages/Products/pages/LangmuirPage';
import FaradayPage from './pages/Products/pages/FaradayPage';
import ExBPage from './pages/Products/pages/ExBPage';
import RPAPage from './pages/Products/pages/RPAPage';
import KaufmanPage from './pages/Products/pages/KaufmanPage';
import CathodeArcPage from './pages/Products/pages/CathodeArcPage';
import RFISPage from './pages/Products/pages/RFISPage';
import HallPage from './pages/Products/pages/HallPage';
import OESPage from './pages/Products/pages/OESPage';
import LIFPage from './pages/Products/pages/LIFPage';
import ThomsonPage from './pages/Products/pages/ThomsonPage';
import TorsionBalancePage from './pages/Products/pages/TorsionBalancePage';
import EMBalancePage from './pages/Products/pages/EMBalancePage';
import CalibrationServicePage from './pages/Products/pages/CalibrationServicePage';

import ElectricPropulsionPage from './pages/News/pages/ElectricPropulsionPage';

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/langmuir', element: <LangmuirPage /> },
      { path: 'products/faraday', element: <FaradayPage /> },
      { path: 'products/exb', element: <ExBPage /> },
      { path: 'products/rpa', element: <RPAPage /> },
      { path: 'products/kaufman', element: <KaufmanPage /> },
      { path: 'products/cathode-arc', element: <CathodeArcPage /> },
      { path: 'products/rfis', element: <RFISPage /> },
      { path: 'products/hall-source', element: <HallPage /> },
      { path: 'products/oes', element: <OESPage /> },
      { path: 'products/lif', element: <LIFPage /> },
      { path: 'products/thomson', element: <ThomsonPage /> },
      { path: 'products/torsion-balance', element: <TorsionBalancePage /> },
      { path: 'products/em-balance', element: <EMBalancePage /> },
      { path: 'products/calibration-service', element: <CalibrationServicePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/electric-propulsion', element: <ElectricPropulsionPage /> },
      { path: 'join', element: <JoinPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'sitemap', element: <SitemapPage /> },
    ],
  },
];

export default routes;
