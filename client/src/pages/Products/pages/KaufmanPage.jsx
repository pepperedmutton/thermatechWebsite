import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import kaufmanImg from '../../../assets/images/Kaufman/KaufMan.png';

export default function KaufmanPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>考夫曼等离子源</title>
          <meta
            name="description"
            content="XHS-KFIS 考夫曼等离子源支持 Ar/Xe 等工质，提供可调提取/加速电压与可选中和器，适配长时运行与束流诊断。适用于材料处理、薄膜沉积、电推进地面试验与科研束流研究。"
          />
        </Helmet>
        <h1 className={styles.pageTitle}>考夫曼等离子源（Kaufman Ion Source）</h1>

        <p className={styles.lead}>
          基于你提供的文案：我们提供考夫曼等离子源 XHS-KFIS，支持常见惰性气体（Ar、Xe 等）与工质气体，工作过程简单高效，适用于等离子体体表面处理、地面测试与实验室研发等场景。
        </p>

        <ProductDetail
          id="kaufman"
          title="考夫曼等离子源 XHS-KFIS"
          tagline="稳定、可定制的离子束生成方案，适配科研与工艺应用"
          overview={
            <>
              XHS-KFIS 考夫曼等离子源是一套成熟的等离子体产生与加速系统，适用于材料表面处理、薄膜沉积与推进器试验台架的等离子体束提供。设备支持多种气体工质、可调提取/加速电压与可选中和器，以满足不同实验与工艺要求。
            </>
          }
          features={[
            '支持 Ar / Xe / N₂ 等惰性及工质气体',
            '可调提取与加速电压，方便工艺参数扫描',
            '模块化中和器与冷却方案，适应长时间运行',
            '易于集成到真空腔、扫描平台与束流诊断链路'
          ]}
          specs={[
            ['能量范围', '几十 eV – kV 级（可定制）', '依电源与网格设计而定'],
            ['束流密度', 'mA/cm² 级（可定制）', '视束斑与孔径配置'],
            ['接口', 'KF / CF / 定制法兰', '便于系统集成与真空兼容'],
            ['冷却', '被动 / 强制冷却可选', '适配高功率运行']
          ]}
          galleryImages={[kaufmanImg]}
        />

      </div>
    </div>
  );
}
