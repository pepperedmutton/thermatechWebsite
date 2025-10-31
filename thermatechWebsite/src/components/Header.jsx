// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; 

// 1. 像导入 JS 一样导入您的 CSS 模块
import styles from './Header.module.css'; 

export default function Header() {
  return (
    // 2. 使用 {styles.header}
    <header className={styles.header}> 
      
      {/* 3. 应用 {styles.logoContainer} */}
      <Link to="/" className={styles.logoContainer}>
        {/* 4. 应用 {styles.logo} */}
        <img src={logo} alt="Star Thermatech Logo" className={styles.logo} />
      </Link>
      
      {/* 5. 应用 {styles.nav} */}
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/products">产品与服务</Link></li>
          <li><Link to="/news">新闻资讯</Link></li>
          <li><Link to="/join">招贤纳士</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
          <li><Link to="/about">关于我们</Link></li>
        </ul>
      </nav>
    </header>
  );
}