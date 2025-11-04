import React from 'react';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';

import DiagnosticsTable from './components/DiagnosticsTable';
import NonContactTable from './components/NonContactTable';
import ProductCard from './components/ProductCard';

export default function ProductsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>

        <h1 className={styles.pageTitle}>产品与服务</h1>

        {/* 接触式诊断 */}
        <div className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>接触式诊断</h2>
          <p className={`${styles.categoryDescription} ${styles.singleLine}`}>
  将探针置入放电区，直接测量电流、电压与束流特性，得到密度、温度与电势等参数
</p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                title={<Link to="/products/langmuir">朗缪尔探针 (Langmuir Probes)</Link>}
                description="扫描 I–V 曲线以获取基本参量；支持单/双/三探针与自动扫描。"
                size="small"
                parameterList={[
                  <li key={1}>密度 <InlineMath>n_e, n_i</InlineMath></li>,
                  <li key={2}>电子温度 <InlineMath>T_e</InlineMath></li>,
                  <li key={3}>电势 <InlineMath>V_p</InlineMath> / <InlineMath>V_f/EEDF</InlineMath></li>,
                ]}
              />

              <ProductCard
                title="法拉第探针 (Faraday Probe)"
                description="测量束流电流密度与总电流，评估均匀性和发散。"
                size="small"
                parameterList={[
                  <li key={1}>束流密度 <InlineMath>J_i</InlineMath></li>,
                  <li key={2}>均匀性与发散角</li>,
                  <li key={3}>总束流</li>
                ]}
              />

              <ProductCard
                title="E×B 探针（韦恩筛选器）"
                description="正交电场与磁场按荷质比与速度选择离子，用于组分与 IVDF 分析。"
                size="small"
                parameterList={[
                  <li key={1}>离子组分比例</li>,
                  <li key={2}>IVDF / 漂移速度</li>,
                  <li key={3}>杂质判定</li>
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <DiagnosticsTable />
            </div>
          </div>
        </div>

        {/* 非接触式诊断 */}
        <div className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>非接触式诊断（光学类）</h2>
          <p className={styles.categoryDescription}>
            基于自发光与光–物质相互作用进行远程测量，具有高选择性与高时间/空间分辨。
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                title="发射光谱（OES）"
                description="读取自发光谱进行物种识别与相对密度评估；可估计激发/电子温度。"
                size="small"
                parameterList={[
                  <li key={1}>物种识别</li>,
                  <li key={2}>激发温度 / 电子温度（模型）</li>,
                  <li key={3}>过程与稳定性监控</li>
                ]}
              />
              <ProductCard
                title="激光诱导荧光（LIF）"
                description="可调谐激光选择性激发并检测荧光，得到密度、速度与温度。"
                size="small"
                parameterList={[
                  <li key={1}>目标粒子密度</li>,
                  <li key={2}>IVDF / VDF</li>,
                  <li key={3}>粒子温度</li>
                ]}
              />
              <ProductCard
                title="汤姆逊散射（Thomson Scattering）"
                description="测量电子对激光的弹性散射谱，直接获得 Te 与 ne。"
                size="small"
                parameterList={[
                  <li key={1}>电子温度 <InlineMath>T_e</InlineMath></li>,
                  <li key={2}>电子密度 <InlineMath>n_e</InlineMath></li>
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <NonContactTable />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
