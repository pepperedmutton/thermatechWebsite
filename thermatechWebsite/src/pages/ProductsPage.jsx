// src/pages/ProductsPage.jsx
import React from 'react';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- 导入探针图片 (不再用于卡片背景，但可保留备用或用于其他用途) ---
// import langmuirDualImg from '../assets/images/product-langmuir-dual.png';
// import langmuirSingleImg from '../assets/images/product-langmuir-single.png';
// import langmuirTriImg from '../assets/images/product-langmuir-tri.png';
// import exbProbeImg from '../assets/images/product-emission-probe.png';
// import rpaImg from '../assets/images/product-rpa.png';

// --- 导入星空背景图片 ---
import spaceNebulaBg from '../assets/images/space-nebula.png'; 

export default function ProductsPage() {
  return (
    <>
      <div 
        className={styles.pageBackground} 
        style={{ backgroundImage: `url(${spaceNebulaBg})` }}
      />

      <div className={styles.pageWrapper}>
        <div className={styles.contentArea}>

          <h1 className={styles.pageTitle}>产品与服务</h1>
          
          {/* --- 上半块：接触式诊断 --- */}
          <div className={styles.productCategory}>
            <h2 className={styles.categoryTitle}>接触式诊断</h2>
            <p className={styles.categoryDescription}>
              将探针直接插入等离子体，以获取高空间分辨率的电学参数。适用于大多数研究和工业环境。
            </p>
            
            <div className={styles.productGrid}>
              {/* 产品1: 朗缪尔探针 - 移除背景图片 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}>
                  <h3 className={styles.productTitle}>朗缪尔探针 (Langmuir Probes)</h3>
                  <p className={styles.productDescription}>
                    最基础和广泛的等离子体诊断工具，通过收集电流-电压 (I-V) 特性曲线来分析等离子体。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>电子/离子密度 (<InlineMath>n_e, n_i</InlineMath>)</li>
                    <li>电子温度 (<InlineMath>T_e</InlineMath>)</li>
                    <li>等离子体电势 (<InlineMath>V_p</InlineMath>) / 悬浮电势 (<InlineMath>V_f</InlineMath>)</li>
                    <li>电子能量分布函数 (EEDF)</li>
                  </ul>
                </div>
              </div>

              {/* 产品2: 法拉第探针 - 移除背景图片 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}>
                  <h3 className={styles.productTitle}>法拉第探针 (Faraday Probe)</h3>
                  <p className={styles.productDescription}>
                    专用于测量带电粒子束流的诊断工具，常用于电推进器和离子源的束流特性评估。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>离子束流密度 (<InlineMath>J_i</InlineMath>)</li>
                    <li>束流均匀性与发散角</li>
                    <li>总束流</li>
                  </ul>
                </div>
              </div>

              {/* 产品3: ExB 探针 - 移除背景图片 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}>
                  <h3 className={styles.productTitle}>E×B 探针 (韦恩速度筛选器)</h3>
                  <p className={styles.productDescription}>
                    利用正交的电场 (E) 和磁场 (B) 来分离不同速度或质荷比的离子，常用于分析离子组分。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>离子组分比例</li>
                    <li>离子速度分布 (IVDF)</li>
                    <li>杂质分析</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* --- 接触式诊断 结束 --- */}


          {/* --- 下半块：非接触式诊断 --- */}
          <div className={styles.productCategory}>
            <h2 className={styles.categoryTitle}>非接触式诊断 (光学类)</h2>
            <p className={styles.categoryDescription}>
              使用激光和光谱技术，在不干扰等离子体的情况下进行远程测量。适用于高纯度或探针无法工作的环境。
            </p>
            
            <div className={styles.productGrid}>
              {/* 产品4: 发射光谱 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}> 
                  <h3 className={styles.productTitle}>发射光谱 (OES)</h3>
                  <p className={styles.productDescription}>
                    分析等离子体自身发出的光，通过识别光谱线来判断等离子体中的粒子种类和状态。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>粒子种类鉴别</li>
                    <li>激发温度 / 电子温度 (特定模型下)</li>
                    <li>化学反应过程监测</li>
                  </ul>
                </div>
              </div>

              {/* 产品5: 激光诱导荧光 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}> 
                  <h3 className={styles.productTitle}>激光诱导荧光 (LIF)</h3>
                  <p className={styles.productDescription}>
                    使用一束可调谐激光激发特定能级的粒子，通过探测其荧光信号来获取高精度信息。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>特定粒子（离子/中性粒子）的密度</li>
                    <li>速度分布函数 (IVDF / VDF)</li>
                    <li>粒子温度</li>
                  </ul>
                </div>
              </div>

              {/* 产品6: 汤姆逊散射 */}
              <div className={styles.productItem}>
                <div className={styles.contentOverlay}> 
                  <h3 className={styles.productTitle}>汤姆逊散射 (Thomson Scattering)</h3>
                  <p className={styles.productDescription}>
                    测量电子对入射激光的散射光。这是测量电子参数的“金标准”技术，无需任何理论模型。
                  </p>
                  <ul className={styles.parameterList}>
                    <li>电子温度 (<InlineMath>T_e</InlineMath>) - 高精度</li>
                    <li>电子密度 (<InlineMath>n_e</InlineMath>) - 高精度</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* --- 非接触式诊断 结束 --- */}

        </div> {/* 结束 contentArea */}
        
      </div> // 结束 pageWrapper
    </>
  );
}