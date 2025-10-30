// src/pages/ProductsPage.jsx
import React from 'react';
// 导入您的产品组件
import Products from '../components/Products';

export default function ProductsPage() {
  return (
    // 我们仍然使用 <section> 来保持与您 CSS 样式一致
    <section id="products" style={{ paddingTop: '80px' }}> {/* 添加一些内边距 */}
      <Products />
    </section>
  );
}