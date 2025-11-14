import React from 'react';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import arc1 from '../../../assets/images/Cathodearc/Cathodearc-swipe1.png';

export default function CathodeArcPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>阴极弧等离子源（XHS‑CAIS）</h1>
        <p className={styles.lead}>
          我们提供的阴极弧等离子源 XHS‑CAIS 采用固体金属工质，工作过程简单高效，适用于等离子体体表面处理、地面测试与实验室研发等场景。
        </p>

        <ProductDetail
          id="cathode-arc"
          title="阴极弧等离子源 XHS‑CAIS"
          tagline="高通量金属离子束生成，适配材料沉积与表面改性"
          overview={
            <>
              XHS‑CAIS 阴极弧源通过阴极蒸发并电离固体金属材料，产生高通量的金属离子束，常用于薄膜沉积、表面改性、以及作为高质量金属等离子源供科研与工艺平台使用。该系列设备结构紧凑，支持多种金属靶材并提供稳定的束流输出与可调工艺参数。
            </>
          }
          features={[
            '适用于多种金属材料的阴极蒸发与电离',
            '高通量金属离子输出，适配沉积与表面改性工艺',
            '模块化靶材更换与冷却方案，支持长时间运行',
            '可与束流诊断（Faraday / RPA / Langmuir）联用'
          ]}
          specs={[
            ['材料兼容', '多种金属（Cu, Ti, Al...）', '按靶材定制'],
            ['束流密度', '高至 mA/cm² 级（视孔径与工作点）', '可定制束斑与孔径'],
            ['冷却/耐久', '强制冷却/可替换阴极', '适配长时间工艺运行'],
            ['接口', 'KF / CF / 定制法兰', '真空兼容与系统集成']
          ]}
          galleryImages={[arc1]}
        />

      </div>
    </div>
  );
}
