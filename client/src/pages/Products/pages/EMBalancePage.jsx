import React from 'react';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';

export default function EMBalancePage() {
  const details = {
    title: '电磁/静电平衡式推力计',
    overview: '电磁或静电平衡式推力计是一种主动力反馈测量系统。它通过一个闭环控制系统，产生一个与待测推力大小相等、方向相反的电磁力或静电力，使摆臂始终保持在零位附近。施加的反馈力与线圈电流或电极电压成正比，通过测量该电信号即可精确得知推力大小。',
    features: [
      '响应速度快，系统带宽较高，可测量脉冲推力或推力噪声',
      '不存在机械恢复力矩的非线性问题，线性度好',
      '通过精确的电路测量实现力测量，易于实现数字化和自动化',
      '系统刚度高，抗振动能力强',
      '可实现快速、精确的原位电学标定',
    ],
    specs: [
      ['推力范围', '10 μN – 1 N', '可定制'],
      ['反馈方式', '电磁力（音圈）或静电力', '依据系统设计'],
      ['控制系统', 'PID 闭环 + DSP', '高精度实时反馈'],
      ['带宽', '可达数十 Hz', '适配动态测量需求'],
      ['主要优势', '动态响应快，线性度高', '适合脉冲与动态测量'],
    ],
    galleryImages: []
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <ProductDetail {...details} />
      </div>
    </div>
  );
}
