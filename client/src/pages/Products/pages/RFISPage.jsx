import React from 'react';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import rfiImg from '../../../assets/images/RF/RFIon.png';

export default function RFISPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>射频等离子源（XHS‑RFIS）</h1>
        <p className={styles.lead}>
          星焱科技提供射频等离子源 XHS‑RFIS，可采用氩气、氦气、氮气等常见惰性/工质气体，工作过程简单高效，适用于射频等离子体放电地面测试、实验室试验等应用场景；也可作为一种结构紧凑、低功耗的电推进系统工质源，用于卫星轨道转移、位置保持及近程推进任务。
        </p>

        <ProductDetail
          id="rfis"
          title="射频离子源 XHS‑RFIS"
          tagline="模块化射频耦合离子源，适配科研与工艺平台"
          overview={
            <>
              XHS‑RFIS 基于射频耦合（RF/ICP）等离子体产生稳定离子流，具备结构紧凑、易维护与低直流电极依赖的优点。适用于对离子密度与能谱有可控需求的场景，常用于材料处理、等离子体化学、以及作为实验与工艺级别的离子源。
                          XHS‑RFIS 基于射频耦合（RF/ICP）等离子体产生稳定离子流，具备结构紧凑、易维护与低直流电极依赖的优点。适用于对离子密度与能谱有可控需求的场景，常用于材料处理、等离子体化学、以及作为实验与工艺级别的等离子源。
            </>
          }
          features={[
            '射频耦合产生等离子体，无需直流阴极/阳极结构',
            '兼容多种工质气体（Ar / He / N₂ 等），易于调参',
            '结构紧凑，维护简单，适合实验室与工艺环境',
            '可配合探针或法拉第等诊断设备进行束流/密度标定'
          ]}
          specs={[
            ['驱动方式', '射频耦合（ICP/RF）', '无直流电极，降低污染/磨损'],
            ['频率/功率', '13.56 MHz（或定制） / 可配置功率', '适配不同密度要求'],
            ['兼容气体', 'Ar / He / N₂ 等', '视工质与工艺需求选择'],
            ['接口', 'KF / CF / 定制法兰', '易于真空腔与诊断集成']
          ]}
          galleryImages={[rfiImg]}
        />

      </div>
    </div>
  );
}
