import React from 'react';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function LIFPage() {
  const lifDetails = {
    title: '激光诱导荧光（LIF）',
    overview: '激光诱导荧光（Laser-Induced Fluorescence, LIF）是一种高灵敏度、高时空分辨的诊断技术。它利用一束波长可调谐的窄带激光选择性地激发待测粒子至某一激发态，然后通过收集其退激发产生的荧光信号来反推粒子信息。',
    features: [
      '对特定粒子具有极高的选择性，抗干扰能力强',
      '可实现空间分辨的二维或三维粒子密度分布测量',
      '通过扫描激光波长，可精确测量粒子的多普勒展宽，从而得到粒子速度分布函数（VDF）和温度',
      '灵敏度极高，可探测痕量粒子',
      '可用于测量电场（通过斯塔克效应）和磁场（通过塞曼效应）',
    ],
    specs: [
      ['核心模块', '可调谐激光器、ICCD/PMT 探测系统', '如染料激光、OPO 等'],
      ['空间分辨率', '可达微米级', '取决于光学系统与成像配置'],
      ['时间分辨率', '纳秒级（取决于激光脉宽）', '需要门控探测器实现'],
      ['可测参数', '粒子密度、VDF/IVDF、温度', '对特定物种高度选择性'],
      ['适用对象', '原子/分子/离子/自由基', '视激光波长与激发谱线而定'],
    ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <ProductDetail {...lifDetails} />
      </div>
    </div>
  );
}
