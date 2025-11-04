// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; 
import styles from './Header.module.css'; // 我们只导入 CSS 模块

export default function Header() {
  
  return (
    <header className={styles.header}> 
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Star Thermatech Logo" className={styles.logo} />
      </Link>
      
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/">首页</Link></li>
          {/* --- 1. 已修改 --- */}
          <li><Link to="/products">产品与服务</Link></li>
          {/* --- --------- --- */}
          <li><Link to="/news">新闻资讯</Link></li>
          <li><Link to="/join">招贤纳士</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
        </ul>
      </nav>
    </header>
  );
}