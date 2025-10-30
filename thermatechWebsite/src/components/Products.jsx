// src/components/Products.jsx
import React from 'react';
// 1. Import the reusable component
import ProductCard from './ProductCard';

// 2. Import your product images
import langmuirDual from '../assets/images/product-langmuir-dual.png';
import langmuirTri from '../assets/images/product-langmuir-tri.png';
import langmuirSingle from '../assets/images/product-langmuir-single.png';
import emissionProbe from '../assets/images/product-emission-probe.png';
import rpa from '../assets/images/product-rpa.png';
// ... add all other product images here

// 3. Create an array of your product data
const productData = [
  {
    image: langmuirDual,
    title: '朗缪尔双探针',
    description: '等离子体密度10⁶/cm³ ~ 10¹⁴/cm³ | 电子温度0.1eV ~ 15eV'
  },
  {
    image: langmuirTri,
    title: '朗缪尔三探针',
    description: '等离子体密度10⁶/cm³ ~ 10¹⁴/cm³ | 采样频率最高40 MHz'
  },
  {
    image: langmuirSingle,
    title: '朗缪尔单探针',
    description: '等离子体电势-100V ~ +150V | 电子能量分布函数（EEDF）'
  },
  {
    image: emissionProbe,
    title: '发射探针',
    description: '等离子体空间电势-100V ~ +150V | 电子温度0.1eV ~ 15eV'
  },
  {
    image: rpa,
    title: '阻滞能量分析仪 (RPA)',
    description: '离子能量1~2000 eV | 能量分辨率1 eV'
  },
  // ... add all your other products here
];

export default function Products() {
  return (
    <div className="container">
      <h2>产品中心 <span className="subtitle">PRODUCT</span></h2>
      <div className="product-grid">
        {/* 4. Map over the data and render a card for each item */}
        {productData.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}