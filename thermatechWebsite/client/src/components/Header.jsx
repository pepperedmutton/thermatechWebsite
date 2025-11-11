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
          
          {/* --- 关键修改：添加下拉菜单 --- */}
          <li className={styles.dropdownContainer}> {/* 1. 添加容器 class */}
            <Link to="/products">产品与服务</Link>
            
            {/* 2. 添加下拉菜单 ul (这会匹配您的 CSS) */}
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/products#contact-diagnostics">接触式诊断</Link>
              </li>
              <li>
                <Link to="/products#non-contact-diagnostics">非接触式诊断</Link>
              </li>
              <li>
                <Link to="/products#ion-sources">等离子源</Link>
              </li>
              <li>
                <Link to="/products#thrust-measurement">推力测量</Link>
              </li>
            </ul>
          </li>
          {/* --- 结束修改 --- */}

          <li><Link to="/news">新闻资讯</Link></li>
          <li><Link to="/join">招贤纳士</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
        </ul>
      </nav>
    </header>
  );
}