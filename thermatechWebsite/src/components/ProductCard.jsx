// src/components/ProductCard.jsx
import React from 'react';
// 1. 导入它自己的专属 CSS 模块
import styles from './ProductCard.module.css';

export default function ProductCard({ title, description, parameterList, size = 'large' }) {
  
  // 2. 根据 'size' prop 动态组合
  const cardClasses = `${styles.card} ${size === 'small' ? styles.small : styles.large}`;

  return (
    // 3. 卡片本身负责自己的所有样式
    <div className={cardClasses}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.parameterList}>
        {parameterList} {/* 4. 直接渲染传入的 <li> 元素数组 */}
      </ul>
    </div>
  );
}