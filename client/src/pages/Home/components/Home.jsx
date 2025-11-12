// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

// 1. 导入您新上传的横幅图片
import heroBanner from '../../../assets/images/hero-banner.png'; 

export default function Home() {
  return (
    // 2. 这是一个简单的 div 容器，不再是 Swiper
    <div 
      className={styles.heroContainer} 
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      {/* 3. 您的前景内容 */}
      <div className={styles.heroContent}>
        
        {/* 4. 您要求的文案 */}
        <h1>星焓科技</h1>
        <p>低温等离子体诊断测量与电推进技术服务商</p>

        {/* 5. 我们保留一个行动按钮，链接到产品页 */}
        <Link to="/products" className={styles.heroButton}>
          查看产品与服务
        </Link>
      </div>
    </div>
  );
}