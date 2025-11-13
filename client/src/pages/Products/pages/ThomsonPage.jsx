import React from 'react';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function ThomsonPage() {
  const thomsonDetails = {
    title: '汤姆逊散射（Thomson Scattering）',
    overview: '汤姆逊散射是诊断等离子体中电子温度和电子密度的“金标准”方法。该技术基于高功率激光与等离子体中自由电子的弹性碰撞，通过分析散射光谱的展宽和强度，可以直接、无模型地获得电子的核心参数。',
    features: [
      '直接测量，无需任何理论模型假设，结果可靠性高',
      '可同时、同地测量电子温度（Te）和电子密度（ne）',
      '非侵入式，对等离子体扰动极小',
      '可实现高时空分辨的测量',
      '适用于从低温到高温、从低密度到高密度的广泛等离子体参数范围',
    ],
    specs: [
      ['核心模块', '高功率脉冲激光、三光栅光谱仪、ICCD/EMCCD', '高抑制比与高速门控'],
      ['可测参数', '电子温度 (Te)、电子密度 (ne)', '直接测量，无需模型假设'],
      ['测量范围 (Te)', '0.1 eV – 数 keV', '配置依赖'],
      ['测量范围 (ne)', '10^16 – 10^21 m^-3', '取决于系统和光学收集效率'],
      ['典型应用', '聚变装置、霍尔推力器、等离子体源标定', '基础研究与工业标定均适用'],
    ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <ProductDetail {...thomsonDetails}/>
      </div>
    </div>
  );
}
