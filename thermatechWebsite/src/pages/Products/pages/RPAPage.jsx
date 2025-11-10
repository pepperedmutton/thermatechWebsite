import React from 'react';
import styles from './LangmuirPage.module.css';
import ProductDetail from './components/ProductDetail';
import rpaSwipe1 from '../../../assets/images/RPA/RPA-swipe1.png';
import rpaSwipe2 from '../../../assets/images/RPA/RPA-swipe2.png';

export default function RPAPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>阻滞能量分析仪（RPA / RFEA）</h1>
        <p className={styles.lead}>
          阻滞能量分析仪用于测量离子能量分布与通量，常用于材料表面处理、离子束刻蚀与推进器束流的能量谱分析。
        </p>

        <ProductDetail
          id="rpa"
          title="阻滞能量分析仪 (XHINS-RPA / RFEA)"
          tagline="高分辨的离子能量分布与通量测量解决方案"
          overview={
            <>
              阻滞能量分析仪测量系统 XHINS-RPA 可用于等离子体束流特性诊断中离子能量和离子通量的测量，
              可进一步分析离子能量分布函数（IEDF），适用于表面处理、刻蚀工艺与推进器束流能量分布均匀性评估等场景。
              系统包含可调偏压栅、能量选择收集面与低噪声前端放大器，便于在高/低通量场景下获取可靠谱线数据。
            </>
          }
          features={[
            '测量离子能量分布（IEDF）与离子通量',
            '可调阻滞偏压栅以扫描能谱，支持阶跃/线性扫描',
            '低噪声前端，适用于低通量测量（pA 级）',
            '支持冷却/高功率版本，易于与机械扫描或阵列结合'
          ]}
          specs={[
            ['测量范围', '0 – keV（可定制上限）', '依前端与栅极设计而定'],
            ['电流量程', 'pA – mA', '可选跨阻放大器量程'],
            ['能量分辨', '≤ 1 eV（视栅设计）', '高分辨版本可用于精细谱线分析'],
            ['接口', 'KF / CF / 定制法兰', '便于系统集成与真空兼容']
          ]}
          galleryImages={[rpaSwipe1, rpaSwipe2]}
        />

      </div>
    </div>
  );
}
