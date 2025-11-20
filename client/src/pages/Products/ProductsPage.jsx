import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 现有组件
import DiagnosticsTable from './components/DiagnosticsTable';
import NonContactTable from './components/NonContactTable';
import ProductCard from './components/ProductCard';
import ProductsNav from './components/ProductsNav';

// 1. 导入新表格
import IonSourceTable from './components/IonSourceTable'; 
import ThrustTable from './components/ThrustTable';

export default function ProductsPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); 
    }
  }, [location]); 

  return (
    <div className={styles.pageWrapper}>
      {/* 屏幕侧边导航（垂直居中） */}
      <ProductsNav
        items={[
          { id: 'contact-diagnostics', title: '接触式诊断' },
          { id: 'non-contact-diagnostics', title: '非接触式诊断' },
          { id: 'ion-sources', title: '等离子源' },
          { id: 'thrust-measurement', title: '微推力测量' },
        ]}
      />
      <div className={styles.contentArea}>

        <h1 className={styles.pageTitle} aria-label="产品与服务">
          产品与服务
        </h1>

        {/* 1) 接触式诊断 */}
        <section id="contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>接触式诊断系统</h2>
          <p className={styles.categoryDescription}>
            最基础的低成本等离子体参数测量手段，将探针放入等离子体中，直接测量其参数
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to="/products/langmuir" 
                title="XHINS-LP系列朗缪尔探针 (Langmuir Probes)产品"
                description="自动扫描 I–V 曲线获取核心参量；支持单/双/三探针与发射探针"
                size="small"
                parameterList={[
                  <li key="lp1">电子密度 (<InlineMath math="n_e" />)、离子密度 (<InlineMath math="n_i" />)</li>,
                  <li key="lp2">电子温度 (<InlineMath math="T_e" />)</li>,
                  <li key="lp3">空间电势 (<InlineMath math="V_p" />)、悬浮电势 (<InlineMath math="V_f" />)、电子能量分布函数 (EEDF)</li>,
                ]}
              />
              <ProductCard
                to="/products/faraday"
                title="XHINS-FP系列法拉第探针 (Faraday Probe)产品"
                description="测量束流密度与总电流，评估束流均匀性与发散角。"
                size="small"
                parameterList={[
                  <li key="fp1">束流密度 (<InlineMath math="J_i" />)</li>,
                  <li key="fp2">均匀性与发散角</li>,
                  <li key="fp3">总束流</li>,
                ]}
              />
              <ProductCard
                to="/products/exb"
                title="XHINS-EBP系列E×B 探针（Wien Filter）/速度选择仪"
                description="按荷质比与速度筛选离子，用于羽流组分识别与不同价态离子含量分析，离子速度分布（IVDF）。"
                size="small"
                parameterList={[
                  <li key="eb1">离子组分比例</li>,
                  <li key="eb2">离子速度分布 (IVDF) / 漂移速度</li>,
                  <li key="eb3">杂质判定</li>,
                ]}
              />
              <ProductCard
                to="/products/rpa"
                title="阻滞能量分析仪（Retarding Potential Analyzer / Retarding Field Energy Analyzer）"
                description="测量离子能量分布与通量，用于离子IEDF 分析与表面处理工艺评估。"
                size="small"
                parameterList={[
                  <li key="rpa1">离子能量分布 (IEDF)</li>,
                  <li key="rpa2">离子通量 / 电流谱</li>,
                  <li key="rpa3">表面处理与束流均匀性评估</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <DiagnosticsTable />
            </div>
          </div>
        </section>

        {/* 2) 非接触式诊断（光学类） */}
        <section id="non-contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>光学诊断产品系列</h2>
          <p className={styles.categoryDescription}>
            基于自发光与光–物质相互作用进行远程测量，具备高选择性与高时空分辨。
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to="/products/oes"
                title="发射光谱（OES）"
                description="粒子种类识别、密度测量，估计激发/电子温度。"
                size="small"
                parameterList={[
                  <li key="oes1">物种识别</li>,
                  <li key="oes2">激发温度 / 电子温度（模型）</li>,
                  <li key="oes3">过程与稳定性监控</li>,
                ]}
              />
              <ProductCard
                to="/products/lif"
                title="激光诱导荧光（LIF）"
                description="可调谐激光选择性激发并检测荧光，密度与速度。"
                size="small"
                parameterList={[
                  <li key="lif1">目标粒子密度</li>,
                  <li key="lif2">速度分布 (VDF / IVDF)</li>,
                  <li key="lif3">粒子温度</li>
                ]}
              />
              <ProductCard
                to="/products/thomson"
                title="汤姆逊散射（Thomson Scattering）"
                description="测量电子对激光的弹性散射谱，获得温度与密度。"
                size="small"
                parameterList={[
                  <li key="ts1">电子温度 (<InlineMath math="T_e" />)</li>,
                  <li key="ts2">电子密度 (<InlineMath math="n_e" />)</li>,
                ]}
              />
              <ProductCard
                to="/products/las"
                title="激光吸收光谱（LAS）"
                description="窄线宽激光扫频获取吸收谱线，实时量化特定粒子绝对密度。"
                size="small"
                parameterList={[
                  <li key="las1">目标粒子绝对密度</li>,
                  <li key="las2">路径积分信号 / 工艺气体浓度</li>,
                  <li key="las3">吸收谱线温度或压力反演</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <NonContactTable />
            </div>
          </div>
        </section>

        {/* 3) 等离子源 */}
        <section id="ion-sources" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>等离子源（Ion Source）</h2>
          <p className={styles.categoryDescription}>
            面向实验室基础研究、电推进地面试验系统与刻蚀/材料加工线，提供稳定可调的离子束源总成，涵盖束流调节、法兰接口与中和器等完整配套。
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to="/products/kaufman"
                title="XHINS-KF系列Kaufman等离子源系统"
                description="电离腔与多孔阳极，配套中和器并支持能量宽调，适合推进器地面系统与实验室束流研究。"
                size="small"
                parameterList={[
                  <li key="is1">能量：50–1500 eV（可定制）</li>,
                  <li key="is2">束流密度：至 mA/cm²</li>,
                  <li key="is3">气体：Ar / Xe / N₂ 等</li>,
                ]}
              />
              <ProductCard
                to="/products/hall-source"
                title="XHINS-HS系列霍尔离子源系统（Hall Source）"
                description="E×B 漂移放电、结构紧凑，支持电推进地面寿命试验及实验室推进原型研究。"
                size="small"
                parameterList={[
                  <li key="is10">放电电压：150–600 V（典型）</li>,
                  <li key="is11">推重比与效率：高</li>,
                  <li key="is12">兼容：惰性气体</li>,
                ]}
              />
              <ProductCard
                title="XHINS-CA系列阴极弧等离子源系统"
                to="/products/cathode-arc"
                description="阴极蒸发并电离，输出高电流金属离子束，覆盖材料实验与表面工程验证。"
                size="small"
                parameterList={[
                  <li key="is4">能量：～50–200 eV（偏置可拓展）</li>,
                  <li key="is5">束流：高电流（脉冲/稳态）</li>,
                  <li key="is6">材料：多种金属阴极</li>,
                ]}
              />
              <ProductCard
                to="/products/rfis"
                title="XHINS-RF系列射频等离子源系统（RF/ICP）"
                description="射频耦合、无直流电极，洁净低损伤，专用于刻蚀/清洗等工艺线及基础研究。"
                size="small"
                parameterList={[
                  <li key="is7">频率：13.56 MHz（或定制）</li>,
                  <li key="is8">密度：高密度低能量束</li>,
                  <li key="is9">窗口：石英 / Al₂O₃ 等</li>,
                ]}
              />
            </div>

            {/* 2. 将新表格放在这里 */}
            <div className={styles.tableContainer}>
              <IonSourceTable />
            </div>
            
          </div>
        </section>

        {/* 4) 推力架（Thrust Stand） */}
        <section id="thrust-measurement" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>推力架产品（Thrust Stand）</h2>
          <p className={styles.categoryDescription}>
            为小推力推进器与等离子体实验源提供可交付的推力架（Thrust Stand）硬件，包含结构平台、读出链路与标定工具，适配真空舱与长时试验。
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to="/products/torsion-balance"
                title="XHINS-TTS扭摆式推力架（Torsional Thrust Stand）"
                description="高灵敏度扭摆结构，提供推力架主体、中和旁路与读出链路，适合稳态与缓变推力测量。"
                size="small"
                parameterList={[
                  <li key="mt1">分辨率 / 零漂控制</li>,
                  <li key="mt2">位移/角度读取链路</li>,
                  <li key="mt3">热与排气力矩补偿</li>,
                ]}
              />
              <ProductCard
                to="/products/em-balance"
                title="XHINS-ETS电磁平衡式推力架（Electromagnetic Thrust Stand）"
                description="电磁/静电平衡架构，支持闭环控制与快速标定，覆盖 mN 级长时推力。"
                size="small"
                parameterList={[
                  <li key="mt4">力反馈线性度</li>,
                  <li key="mt5">带宽与噪声</li>,
                  <li key="mt6">真空引线与热管理</li>,
                ]}
              />
              <ProductCard
                to="/products/calibration-service"
                title="推力架数据链路与标定套件"
                description="配套 DAQ、处理软件与不确定度工具，面向推力架系统交付。"
                size="small"
                parameterList={[
                  <li key="mt7">系统辨识与标定</li>,
                  <li key="mt8">不确定度模型</li>,
                  <li key="mt9">验收报告（含原始数据）</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <ThrustTable />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
