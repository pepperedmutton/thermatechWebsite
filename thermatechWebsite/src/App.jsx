// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom';

// 导入公共组件
import Header from './components/Header';
import Footer from './components/Footer';

// 1. 导入所有页面
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';     // <-- 新增
import NewsPage from './pages/NewsPage';       // <-- 新增
import JoinPage from './pages/JoinPage';       // <-- 新增
import ContactPage from './pages/ContactPage';   // <-- 新增

function App() {
  return (
    <>
      <Header />
      <main>
        {/* 2. 为每个页面设置路由 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />       {/* <-- 新增 */}
          <Route path="/news" element={<NewsPage />} />         {/* <-- 新增 */}
          <Route path="/join" element={<JoinPage />} />         {/* <-- 新增 */}
          <Route path="/contact" element={<ContactPage />} />   {/* <-- 新增 */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App