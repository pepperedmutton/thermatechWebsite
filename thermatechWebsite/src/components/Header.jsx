// src/components/Header.jsx
import React from 'react';
// 1. 导入 Link
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; 

export default function Header() {
  return (
    <header>
      {/* 2. Logo 应该链接到首页 */}
      <Link to="/" className="logo-container">
        <img src={logo} alt="Star Thermatech Logo" className="logo" />
      </Link>
      <nav>
        <ul>
          {/* 3. 首页链接 */}
          <li><Link to="/">首页</Link></li>
          
          {/* 4. 这些仍然是锚点链接，但它们指向首页上的锚点 */}
          <li><a href="/#about">关于我们</a></li>
          
          {/* 5. 这是您的新产品页面链接！ */}
          <li><Link to="/products">产品中心</Link></li>
          
          <li><a href="/#news">新闻资讯</a></li>
          <li><a href="/#join">招贤纳士</a></li>
          <li><a href="/#contact">联系我们</a></li>
        </ul>
      </nav>
    </header>
  );
}