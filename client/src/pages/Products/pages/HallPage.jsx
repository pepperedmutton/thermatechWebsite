import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';

export default function HallPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>霍尔离子源</title>
          <meta
            name="description"
            content="低功率约 200 W 霍尔离子源，带阴极设计，阳极电压 150–350 V 可调，推荐工质 Xe，可选 Ar/Kr；适用于小推力推进器台架、束流供给与材料处理实验，支持法兰与接口定制。"
          />
        </Helmet>
        <h1 className={styles.pageTitle}>霍尔源（Hall Source）</h1>
        <p className={styles.lead}>
          我们提供低功率约 200 W 的带阴极霍尔源，适用于实验室与小型工艺平台，常用氙（Xe）作为工质，提供稳定的离子推力与束流输出。
        </p>

        <ProductDetail
          id="hall"
          title="霍尔源（Low-power Hall Source, ~200 W）"
          tagline="带阴极设计，适用于低功率推进与材料处理"
          overview={
            <>
              该型号为低功率（约 200 W）霍尔源，配备阴极供电与可调阳极电压范围 150–350 V，推荐工质为氙（Xe）。适用于小型推力测试、推进器台架验证以及材料表面处理的离子束供给场景。
            </>
          }
          features={[
            '低功率（约 200 W）运行点，适合实验室与小型平台',
            '阳极电压可调：150–350 V',
            '推荐工质：Xe（氙），可按需支持 Ar 等气体'
          ]}
          specs={[
            ['额定功率', '≈ 200 W（低功率版本）', '适合长时间测试与实验室使用'],
            ['阳极电压', '150–350 V', '可调以优化离子能量与推力'],
            ['工质', 'Xe（氙），可选 Ar / Kr', '依据任务与可用性选择'],
            ['接口', 'KF / CF / 定制法兰', '便于系统集成']
          ]}
          galleryImages={[]}
        />

      </div>
    </div>
  );
}
