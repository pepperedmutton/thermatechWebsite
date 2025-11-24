import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; 
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };
  
  return (
    <header className={styles.header}> 
      <Link to="/" className={styles.logoContainer} onClick={closeMenu}>
        <img src={logo} alt="Star Thermatech Logo" className={styles.logo} />
      </Link>
      
      {/* 汉堡菜单按钮 (仅在移动端显示) */}
      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>首页</Link></li>
          
          <li className={styles.dropdownContainer}>
            <Link 
              to="/products" 
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  toggleProducts();
                } else {
                  closeMenu();
                }
              }}
            >
              产品与服务
              <span className={styles.arrow}>{isProductsOpen ? '▲' : '▼'}</span>
            </Link>
            
            <ul className={`${styles.dropdownMenu} ${isProductsOpen ? styles.dropdownOpen : ''}`}>
              <li>
                <Link to="/products#contact-diagnostics" onClick={closeMenu}>接触式诊断仪器</Link>
              </li>
              <li>
                <Link to="/products#non-contact-diagnostics" onClick={closeMenu}>非接触式诊断（光学类）系统</Link>
              </li>
              <li>
                <Link to="/products#ion-sources" onClick={closeMenu}>等离子源</Link>
              </li>
              <li>
                <Link to="/products#thrust-measurement" onClick={closeMenu}>微推力测量</Link>
              </li>
            </ul>
          </li>

          <li><Link to="/news" onClick={closeMenu}>新闻资讯</Link></li>
          <li><Link to="/join" onClick={closeMenu}>招贤纳士</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>联系我们</Link></li>
        </ul>
      </nav>
    </header>
  );
}
