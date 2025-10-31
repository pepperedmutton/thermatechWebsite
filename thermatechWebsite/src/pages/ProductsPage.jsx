// src/pages/ProductsPage.jsx
import React from 'react';
// 1. 导入您的产品列表组件
import Products from '../components/Products';

// 2. 导入您之前为本页添加的横幅图片
//    (请确保图片名称 'product-page-banner.jpg' 是正确的)
import productBannerImg from '../assets/images/product-page-banner.jpg'; 

export default function ProductsPage() {
  return (
    // 3. 我们使用一个片段 (<>) 来包裹两个 <section>
    <>
      {/* 4. 这是我们添加的巨大图片横幅 */}
      <section 
        id="product-banner" 
        className="page-banner-container"
        style={{ backgroundImage: `url(${productBannerImg})` }}
      >
        {/* 这个 section 保持空白，只显示背景图 */}
      </section>

      {/* 5. 这是您的产品中心部分 */}
      <section id="products">
        {/* 6. 在这里渲染 Products 组件，而不是写 "none" */}
        <Products />
      </section>
    </>
  );
}