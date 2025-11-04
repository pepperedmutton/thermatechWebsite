// src/pages/ProductsPage.jsx
import React from 'react';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 1. 导入两个表格
import DiagnosticsTable from '../components/DiagnosticsTable'; 
import NonContactTable from '../components/NonContactTable';

// 2. 导入我们新的 ProductCard 组件
import ProductCard from '../components/ProductCard';

// 导入星空背景图片
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
              将探针直接插入等离子体...
            </p>
            
            <div className={styles.contactGrid}>
              
              {/* --- 左列 (使用新组件) --- */}
              <div className={styles.productGridContact}>
                <ProductCard
                  title="朗缪尔探针 (Langmuir Probes)"
                  description="最基础和广泛的等离子体诊断工具..."
                  size="small"
                  parameterList={[
                    <li key={1}>电子/离子密度 (<InlineMath>n_e, n_i</InlineMath>)</li>,
                    <li key={2}>电子温度 (<InlineMath>T_e</InlineMath>)</li>,
                    <li key={3}>等离子体电势 (<InlineMath>V_p</InlineMath>) / 悬浮电势 (<InlineMath>V_f</InlineMath>)</li>,
                    <li key={4}>电子能量分布函数 (EEDF)</li>
                  ]}
                />
                
                <ProductCard
                  title="法拉第探针 (Faraday Probe)"
                  description="专用于测量带电粒子束流的诊断工具..."
                  size="small"
                  parameterList={[
                    <li key={1}>离子束流密度 (<InlineMath>J_i</InlineMath>)</li>,
                    <li key={2}>束流均匀性与发散角</li>,
                    <li key={3}>总束流</li>
                  ]}
                />
                
                <ProductCard
                  title="E×B 探针 (韦恩速度筛选器)"
                  description="利用正交的电场 (E) 和磁场 (B) 来分离..."
                  size="small"
                  parameterList={[
                    <li key={1}>离子组分比例</li>,
                    <li key={2}>离子速度分布 (IVDF)</li>,
                    <li key={3}>杂质分析</li>
                  ]}
                />
              </div>

              {/* --- 右列 (HTML 表格) --- */}
              <div className={styles.tableContainer}>
                <DiagnosticsTable />
              </div>

            </div>
          </div>
          {/* --- 接触式诊断 结束 --- */}


          {/* --- 下半块：非接触式诊断 --- */}
          <div className={styles.productCategory}>
            <h2 className={styles.categoryTitle}>非接触式诊断 (光学类)</h2>
            <p className={styles.categoryDescription}>
              使用激光和光谱技术，在不干扰等离子体的情况下进行远程测量。
            </p>
            
            <div className={styles.contactGrid}>

              {/* --- 左列 (使用新组件) --- */}
              <div className={styles.productGridContact}>
                <ProductCard
                  title="发射光谱 (OES)"
                  description="分析等离子体自身发出的光..."
                  size="small"
                  parameterList={[
                    <li key={1}>粒子种类鉴别</li>,
                    <li key={2}>激发温度 / 电子温度 (特定模型下)</li>,
                    <li key={3}>化学反应过程监测</li>
                  ]}
                />
                
                <ProductCard
                  title="激光诱导荧光 (LIF)"
                  description="使用一束可调谐激光激发特定能级的粒子..."
                  size="small"
                  parameterList={[
                    <li key={1}>特定粒子（离子/中性粒子）的密度</li>,
                    <li key={2}>速度分布函数 (IVDF / VDF)</li>,
                    <li key={3}>粒子温度</li>
                  ]}
                />
                
                <ProductCard
                  title="汤姆逊散射 (Thomson Scattering)"
                  description="测量电子对入射激光的散射光..."
                  size="small"
                  parameterList={[
                    <li key={1}>电子温度 (<InlineMath>T_e</InlineMath>) - 高精度</li>,
                    <li key={2}>电子密度 (<InlineMath>n_e</InlineMath>) - 高精度</li>
                  ]}
                />
              </div>

              {/* --- 右列 (HTML 表格) --- */}
              <div className={styles.tableContainer}>
                <NonContactTable />
              </div>

            </div>
          </div>
          {/* --- 非接触式诊断 结束 --- */}

        </div> {/* 结束 contentArea */}
        
      </div> // 结束 pageWrapper
    </>
  );
}