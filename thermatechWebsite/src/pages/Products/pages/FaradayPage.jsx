import React from 'react';
import styles from './LangmuirPage.module.css';
import ProductDetail from './components/ProductDetail';
import swipe1 from '../../../assets/images/FaradayPage/faraday-swipe-1.png';
import swipe2 from '../../../assets/images/FaradayPage/faraday-swipe-2.png';
import swipe3 from '../../../assets/images/FaradayPage/faraday-swipe-3.png';
import swipe4 from '../../../assets/images/FaradayPage/faraday-swipe-4.png';

export default function FaradayPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>法拉第探针（Faraday Probe）</h1>
        <p className={styles.lead}>
          我们的法拉第探针用于直接测量离子束或等离子体束流的
          电流密度与束流分布。常见形态包括 <strong>法拉第单探针</strong> 与
          <strong>法拉第双探针</strong>，可用于推进器羽流、离子源和工艺束流的定量评估。
        </p>

        {/* 单探针 */}
        <ProductDetail
          id="faraday-single"
          title="法拉第单探针（Single Faraday Cup）"
          tagline="结构简单、定标方便，适用于单点束流与整体电流测量"
          overview={
            <>
              法拉第探针测量系统 XHINS-FP 专为等离子体与离子束流特性诊断而设计，
              可直接测量离子电流分布并用于评估离子束刻蚀设备的束流密度均匀性、
              空间电推进系统的工质利用率与能量损失、束流发散以及推力矢量偏心等关键指标。
              
              我们的法拉第单探针（Faraday Cup）体积紧凑、标定方便，适用于单点电流
              与电流密度测量。单探针支持安装在可动支架或扫描机构上进行空间扫描（移动测量），
              通过逐点或连续位移采样构建束流横向剖面与局部分布曲线，便于定位不均匀性与发散源。
              配合栅极/抑制电极能有效降低二次电子影响，从而提高定量精度。
            </>
          }
          features={[
            '用于离子电流分布的直接测量与定量化分析（支持 pA–mA 范围）',
            '移动测量能力：可与线性/旋转/扫描机构配合，实现空间扫描与束流剖面成图',
            '可配置孔径/遮挡以调整空间分辨率与接受角',
            '兼容冷却或高功率散热结构，支持多种真空法兰与接口，便于系统集成'
          ]}
          specs={[
            ['测量范围', 'pA – mA（可定制）', '取决于跨阻与前端滤波'],
            ['孔径/分辨率', '可选 0.5–50 mm', '影响空间分辨与截断效果'],
            ['材料', 'Cu / SS + 防溅涂层', '耐溅射/导电收集面'],
            ['接口', 'KF / CF / 定制法兰', '真空兼容']
          ]}
          galleryImages={[swipe1, swipe2, swipe3, swipe4]}
        />

        {/* 探针阵列 */}
        <ProductDetail
          id="faraday-array"
          title="法拉第探针阵列（Faraday Probe Array）"
          tagline="多通道共时采集，用于瞬态空间分布与剖面测量"
          overview={
            <>
              探针阵列由多个独立收集面组成，侧重于多通道共时采集，能够直观
              地捕捉瞬态的空间分布与快速变化的束流结构。阵列可做成线性或面
              阵布局，并配合高速电子学实现时间分辨的空间剖面测量，适用于脉
              冲、瞬态及强干扰环境下的动态束流研究。
            </>
          }
          features={[
            '多通道共时性采集：并行测量以捕捉瞬态空间分布',
            '阵列布局支持高分辨剖面与差分分析',
            '可扩展通道数与高动态范围，适配强/弱束流场景',
            '与高速采样电子学配合用于脉冲与瞬态工况分析'
          ]}
          specs={[
            ['通道数', '多通道阵列（按需定制）', '可扩展至 N 点同步采样'],
            ['带宽', 'DC – MHz（视电子学）', '支持高速并行采样'],
            ['同步性', 'ns–μs 级（取决于电子学）', '用于瞬态事件捕捉'],
            ['布局与尺寸', '线性 / 面阵 / 定制', '按孔径与间距定制，支持 OEM 集成']
          ]}
        />

      </div>
    </div>
  );
}
