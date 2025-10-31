// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom';

// 1. 恢复到简单的组件导入
import Header from './components/Header';
import Footer from './components/Footer';

// 2. 导入所有页面
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
      {/* 3. Header 在这里，没有任何 prop */}
      <Header />
      
      <main>
        {/* 4. 路由恢复为简单列表 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
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