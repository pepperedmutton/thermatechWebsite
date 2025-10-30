// src/App.jsx
import './App.css'
// 1. 导入 React Router 的组件
import { Routes, Route } from 'react-router-dom';

// 2. 导入您的公共组件
import Header from './components/Header';
import Footer from './components/Footer';

// 3. 导入您的新页面
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      {/* Header 现在始终显示在顶部 */}
      <Header />
      
      <main>
        {/* 4. Routes 会根据 URL 渲染不同的页面 */}
        <Routes>
          {/* 路径 "/" 渲染首页 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 路径 "/products" 渲染产品页 */}
          <Route path="/products" element={<ProductsPage />} />
          
          {/* 您可以添加一个 "Not Found" 页面 */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </main>
      
      {/* Footer 现在始终显示在底部 */}
      <Footer />
    </>
  )
}

export default App