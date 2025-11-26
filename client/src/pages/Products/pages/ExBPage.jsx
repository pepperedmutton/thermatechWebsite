import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css'; // 复用样式
import ProductDetail from './components/ProductDetail';

// 导入 ExB 探针的图片画廊（文件夹名：src/assets/images/ExB）
import exb1 from '../../../assets/images/ExB/ExB-swipe1.png';
import exb2 from '../../../assets/images/ExB/ExB-swipe2.png';
import exb3 from '../../../assets/images/ExB/ExB-swipe3.png';
import exb4 from '../../../assets/images/ExB/ExB-swipe4.png';
// 示例：若需要画廊，取消上面注释并把 exbImages 作为 galleryImages 传入 ProductDetail

export default function ExBPage() {
  const exbImages = [exb1, exb2, exb3, exb4];

  // 可直接使用下面的 XHINS-EBP 产品说明（已写入 ProductDetail）

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>E×B 探针速度选择器｜离子速度/能量分布诊断 | 星焓科技</title>
          <meta
            name="description"
            content="XHINS-ExB 速度选择探针（Wien Filter）利用正交电磁场筛选荷质比，获取 IVDF 与能量分布；适用于霍尔推进器、等离子源羽流组分与杂质分析，支持多通道采集、准直与法兰定制。"
          />
        </Helmet>
        <h1 className={styles.pageTitle}>E×B 探针（Wien Filter）</h1>
        <p className={styles.lead}>
          E×B 探针，也称为 Wien Filter，是一种用于测量带电粒子（主要是离子）速度分布和能量分布的精密诊断工具。它通过施加相互垂直的电场和磁场，仅允许特定速度的粒子通过，从而实现对离子能量和速度的精确筛选。
        </p>

        {/* ExB 探针详情 */}
        <ProductDetail
          id="exb-probe"
          title="E×B 探针测量系统 (XHINS-ExB)"
          tagline="高精度离子速度与能量分布诊断，适用于霍尔推进器等离子体源分析"
          overview={
            <>
              XHINS-ExB 探针测量系统利用正交的电场（E）和磁场（B）构建一个速度选择器。只有速度 v = E/B 的离子能够无偏转地通过探针的准直孔并被收集器接收。通过扫描电场或磁场强度，可以获得完整的离子速度分布函数（IVDF）。该系统是分析霍尔推进器羽流、等离子源束流以及其他等离子体射流中能量色散和速度分布的关键工具。
            </>
          }
          features={[
            '直接测量离子速度分布函数 (IVDF)',
            '高速度/能量分辨率，可分辨不同加速电位下的离子成分',
            '适用于霍尔推进器、等离子源及其他等离子体加速装置的羽流诊断',
            '可配置多通道采集，用于空间分布扫描',
            '模块化设计，易于集成到现有真空系统和运动平台',
          ]}
          specs={[
            ['能量范围', '10 eV – 5 keV (可定制)', '覆盖典型电推进应用'],
            ['速度分辨率', '典型 < 1%', '取决于准直系统和场精度'],
            ['磁场强度', '0 – 0.5 T (可调)', '由永磁体或电磁铁产生'],
            ['电场强度', '0 – 10 kV/m (可调)', '高压偏置电极'],
            ['接口', 'KF / CF / 定制法兰', '兼容各类真空系统'],
          ]}
          galleryImages={exbImages}
        />
      </div>
    </div>
  );
}
