// src/App.jsx
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';

import HomePage from './pages//Home/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import AboutPage from './pages/About/AboutPage';
import NewsPage from './pages/News/NewsPage';
import JoinPage from './pages/Join/JoinPage';
import ContactPage from './pages/Contact/ContactPage';

// ⬇️ 新增：朗缪尔探针子页面
import LangmuirPage from './pages/Products/pages/LangmuirPage';
import FaradayPage from './pages/Products/pages/FaradayPage';
import ExBPage from './pages/Products/pages/ExBPage'; // 导入 ExB 页面
import RPAPage from './pages/Products/pages/RPAPage'; // 导入 RPA 页面
import KaufmanPage from './pages/Products/pages/KaufmanPage'; // 导入 Kaufman 页面
import CathodeArcPage from './pages/Products/pages/CathodeArcPage';
import RFISPage from './pages/Products/pages/RFISPage';
import HallPage from './pages/Products/pages/HallPage';
import OESPage from './pages/Products/pages/OESPage';
import LIFPage from './pages/Products/pages/LIFPage';
import ThomsonPage from './pages/Products/pages/ThomsonPage';
import TorsionBalancePage from './pages/Products/pages/TorsionBalancePage';
import EMBalancePage from './pages/Products/pages/EMBalancePage';
import CalibrationServicePage from './pages/Products/pages/CalibrationServicePage';

function App() {
  // Ensure we scroll to top on route change when there is no hash fragment.
  // This prevents landing at the bottom of a page after navigation from a product card.
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Background />

      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          {/* ⬇️ 新增子路由：/products/langmuir */}
          <Route path="/products/langmuir" element={<LangmuirPage />} />
          <Route path="/products/faraday" element={<FaradayPage />} />
          <Route path="/products/exb" element={<ExBPage />} /> {/* 添加 ExB 路由 */}
          <Route path="/products/rpa" element={<RPAPage />} />
          <Route path="/products/kaufman" element={<KaufmanPage />} />
          <Route path="/products/cathode-arc" element={<CathodeArcPage />} />
          <Route path="/products/rfis" element={<RFISPage />} />
          <Route path="/products/hall-source" element={<HallPage />} />
          <Route path="/products/oes" element={<OESPage />} />
          <Route path="/products/lif" element={<LIFPage />} />
          <Route path="/products/thomson" element={<ThomsonPage />} />
          <Route path="/products/torsion-balance" element={<TorsionBalancePage />} />
          <Route path="/products/em-balance" element={<EMBalancePage />} />
          <Route path="/products/calibration-service" element={<CalibrationServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App;
