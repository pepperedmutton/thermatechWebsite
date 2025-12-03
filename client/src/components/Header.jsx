import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import styles from './Header.module.css';
import { useI18n, SUPPORTED_LOCALES, buildLocalizedPath as buildPathHelper } from '../i18n/i18n';

export default function Header() {
  const { locale, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };

  const dropdownItems = [
    { key: 'contact', label: t('common.nav.dropdown.contact'), hash: '#contact-diagnostics' },
    { key: 'optical', label: t('common.nav.dropdown.optical'), hash: '#non-contact-diagnostics' },
    { key: 'ion', label: t('common.nav.dropdown.ion'), hash: '#ion-sources' },
    { key: 'thrust', label: t('common.nav.dropdown.thrust'), hash: '#thrust-measurement' },
  ];

  const handleLangSwitch = (target) => {
    const currentPath = `${location.pathname || '/'}${location.hash || ''}`;
    const nextPath = buildPathHelper(target, currentPath);
    navigate(nextPath);
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };
  
  return (
    <header className={styles.header}> 
      <Link to={buildPathHelper(locale, '/')} className={styles.logoContainer} onClick={closeMenu}>
        <img src={logo} alt={t('common.brand.short')} className={styles.logo} />
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
          <li><Link to={buildPathHelper(locale, '/')} onClick={closeMenu}>{t('common.nav.home')}</Link></li>
          
          <li className={styles.dropdownContainer}>
            <Link 
              to={buildPathHelper(locale, '/products')} 
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  toggleProducts();
                } else {
                  closeMenu();
                }
              }}
            >
              {t('common.nav.products')}
              <span className={styles.arrow}>{isProductsOpen ? '▲' : '▼'}</span>
            </Link>
            
            <ul className={`${styles.dropdownMenu} ${isProductsOpen ? styles.dropdownOpen : ''}`}>
              {dropdownItems.map((item) => (
                <li key={item.key}>
                  <Link to={buildPathHelper(locale, `/products${item.hash}`)} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li><Link to={buildPathHelper(locale, '/news')} onClick={closeMenu}>{t('common.nav.news')}</Link></li>
          <li><Link to={buildPathHelper(locale, '/about')} onClick={closeMenu}>{t('common.nav.about')}</Link></li>
          <li><Link to={buildPathHelper(locale, '/join')} onClick={closeMenu}>{t('common.nav.join')}</Link></li>
          <li><Link to={buildPathHelper(locale, '/contact')} onClick={closeMenu}>{t('common.nav.contact')}</Link></li>
        </ul>
      </nav>
      
      {/* 语言切换器 - 移至右上角 */}
      <div className={styles.languageToggle} aria-label={t('common.nav.lang.label')}>
        {SUPPORTED_LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => handleLangSwitch(code)}
            className={`${styles.langButton} ${locale === code ? styles.langActive : ''}`}
          >
            {t(`common.nav.lang.${code}`)}
          </button>
        ))}
      </div>
    </header>
  );
}
