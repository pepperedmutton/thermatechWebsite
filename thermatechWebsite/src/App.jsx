// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom';

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

function App() {
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
