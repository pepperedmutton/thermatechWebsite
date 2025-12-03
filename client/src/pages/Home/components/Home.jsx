// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';

// 1. 导入您新上传的横幅图片
import heroBanner from '../../../assets/images/hero-banner.png'; 

export default function Home() {
  const { t, locale } = useI18n();

  return (
    // 2. 这是一个简单的 div 容器，不再是 Swiper
    <div 
      className={styles.heroContainer} 
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      {/* 3. 您的前景内容 */}
      <div className={styles.heroContent}>
        
        {/* 4. 您要求的文案 */}
        <h1>{t('home.hero.title')}</h1>
        <p>{t('home.hero.subtitle')}</p>

        {/* 5. 我们保留一个行动按钮，链接到产品页 */}
        <Link to={buildLocalizedPath(locale, '/products')} className={styles.heroButton}>
          {t('home.hero.cta')}
        </Link>
      </div>
    </div>
  );
}
