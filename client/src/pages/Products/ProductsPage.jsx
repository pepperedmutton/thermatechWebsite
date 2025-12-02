import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 现有组件
import DiagnosticsTable from './components/DiagnosticsTable';
import NonContactTable from './components/NonContactTable';
import ProductCard from './components/ProductCard';
import ProductsNav from './components/ProductsNav';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>产品与服务｜接触式诊断·光学诊断·等离子源·微推力架产品 | Starthermatech</title>
        <meta
          name="description"
          content="覆盖四大板块：朗缪尔探针、法拉第探针、E×B、RPA 等接触式诊断；OES/LIF/汤姆逊等非接触光学诊断；Kaufman/Hall/RF/阴极弧等离子源；扭摆、电磁平衡推力架与标定服务，支持电推进羽流与等离子体工艺的全链路测试。"
        />
        <meta
          name="keywords"
          content="朗缪尔探针,法拉第探针,E×B探针,RPA,非接触光学诊断,OES,LIF,汤姆逊散射,等离子源,Kaufman,霍尔源,射频等离子源,微推力架产品,电推进羽流"
        />
      </Helmet>
      
      {/* 
        注意：Canonical、Open Graph、Twitter Card、JSON-LD 结构化数据
        由构建脚本 scripts/inject-seo-tags.js 在 build 后自动注入
        因为 react-helmet-async 在 vite-react-ssg 环境中不支持 SSR
      */}

      {/* 屏幕侧边导航（垂直居中） */}
      <ProductsNav
        items={[
          { id: 'contact-diagnostics', title: '接触式诊断仪器产品' },
          { id: 'non-contact-diagnostics', title: '非接触式诊断（光学类）系统' },
          { id: 'ion-sources', title: '等离子源' },
          { id: 'thrust-measurement', title: '微推力架产品' },
        ]}
      />
      <div className={styles.contentArea}>

        <h1 className={styles.pageTitle} aria-label="产品与服务">
          产品与服务
        </h1>

        {/* SEO 友好的产品链接列表 - 纯 HTML，不依赖组件 */}
        <section className={styles.seoLinksSection}>
          <h2 className={styles.seoLinksTitle}>产品详情页快速导航</h2>
          <div className={styles.seoLinksGrid}>
            <div className={styles.seoLinksCategory}>
              <h3>接触式诊断仪器</h3>
              <ul>
                <li><Link to="/products/langmuir">朗缪尔探针 (Langmuir Probes)</Link></li>
                <li><Link to="/products/faraday">法拉第探针 (Faraday Probes)</Link></li>
                <li><Link to="/products/exb">E×B探针 (E×B Probes)</Link></li>
                <li><Link to="/products/rpa">阻滞能量分析仪 (RPA)</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>非接触式诊断</h3>
              <ul>
                <li><Link to="/products/oes">发射光谱诊断 (OES)</Link></li>
                <li><Link to="/products/lif">激光诱导荧光 (LIF)</Link></li>
                <li><Link to="/products/thomson">汤姆逊散射 (Thomson)</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>等离子源</h3>
              <ul>
                <li><Link to="/products/kaufman">考夫曼离子源 (Kaufman)</Link></li>
                <li><Link to="/products/hall-source">霍尔推力器 (Hall Thruster)</Link></li>
                <li><Link to="/products/rfis">射频等离子源 (RF Ion Source)</Link></li>
                <li><Link to="/products/cathode-arc">阴极弧等离子源 (Cathode Arc)</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>微推力架产品</h3>
              <ul>
                <li><Link to="/products/torsion-balance">扭摆式微推力架</Link></li>
                <li><Link to="/products/em-balance">电磁平衡微推力架</Link></li>
                <li><Link to="/products/calibration-service">标定服务</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1) 接触式诊断 */}
        <section id="contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>接触式诊断仪器产品</h2>
          <p className={styles.categoryDescription}>
            最基础的等离子体参数测量手段，将探针放入等离子体中，直接测量其参数
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
                description="按特定荷质比与速度筛选离子，用于识别羽流组分，分析不同种类离子含量与离子能量分布(IEDF)。"
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
                description="测量离子能量分布与离子通量，评估等离子体加工工艺"
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

        {/* 组合探针包 */}
        <section id="combo-diagnostics" className={`${styles.productCategory} ${styles.comboSection}`}>
          <h2 className={styles.categoryTitle}>组合探针包</h2>
          <div className={styles.comboGrid}>
            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>方案一</div>
              <h3>粒子羽流分析套装</h3>
              <p>核心价值：精准评估电推进器工作状态与羽流特性，是性能测试与优化的入门利器。</p>
              <p>典型应用场景：离子电推进器或霍尔推力器的地面真空仓性能测试与羽流表征。</p>
              <p>包含探针：法拉第探针 + RPA 各一套。</p>
              <p>解决的核心痛点：单独法拉第探针只知流强，RPA 只知能量；组合使用才能给出完整羽流剖面，回答“打得准不准、强不强”。</p>
              <div className={styles.comboListTitle}>可同时获取的关键参数：</div>
              <ul className={styles.comboList}>
                <li>离子电流密度空间分布（法拉第探针）：羽流角分布、推力矢量方向、束流聚焦。</li>
                <li>离子能量/单位电荷能量分布（RPA）：加速电压有效性、能量利用效率、低能拖尾识别。</li>
              </ul>
            </div>

            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>方案二</div>
              <h3>等离子体综合性诊断平台</h3>
              <p>核心价值：深度解析等离子体产生、加速与环境相互作用的全过程，适合机理研究与高级性能分析。</p>
              <p>典型应用场景：新型电推进器研发、航天器相互作用研究、羽流污染评估。</p>
              <p>包含探针：朗缪尔探针 + 法拉第探针 + RPA 各一套。</p>
              <p>解决的核心痛点：在羽流分析套装基础上增加朗缪尔探针，诊断背景等离子体与电位分布，补齐航天器充电与侵蚀的关键信息。</p>
              <div className={styles.comboListTitle}>可同时获取的关键参数：</div>
              <ul className={styles.comboList}>
                <li>方案一全部参数。</li>
                <li>背景等离子体电子温度与密度（朗缪尔）：评估电中性程度、预测表面电位。</li>
                <li>等离子体电位空间分布（朗缪尔）：理解电场分布与离子加速、电子输运机制。</li>
              </ul>
            </div>

            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>方案三</div>
              <h3>粒子能量分析套装</h3>
              <p>核心价值：聚焦能量维度，对高能电子与离子进行精细化诊断。</p>
              <p>典型应用场景：霍尔推力器非理想效应研究、高能粒子诊断、需要精确能量分布函数的前沿研究。</p>
              <p>包含探针：RPA + EB 探针 各一套。</p>
              <p>解决的核心痛点：RPA 聚焦离子能谱，EB 探针（电子能量分析器）给出电子能量分布函数，直指电子传输与能量损失机制。</p>
              <div className={styles.comboListTitle}>可同时获取的关键参数：</div>
              <ul className={styles.comboList}>
                <li>离子能量分布函数（RPA）。</li>
                <li>电子能量分布函数（EB 探针）：更精确的电子温度，识别高能电子群。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2) 非接触式诊断（光学类） */}
        <section id="non-contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>非接触式诊断（光学类）系统</h2>
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
            面向实验室基础研究、电推进地面试验系统与刻蚀/材料加工线，提供稳定可控的离子束源总成，涵盖束流调节、栅极光学接口与中和器等完整配套。
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
          <h2 className={styles.categoryTitle}>微推力架产品（Thrust Stand）</h2>
          <p className={styles.categoryDescription}>
            为小推力推进器与等离子体实验源提供可交付的推力架（Thrust Stand）产品，包含结构平台、标定工具与配套测试软件，适配真空舱与长时试验。
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to="/products/torsion-balance"
                title="XHINS-TTS扭摆式推力架（Torsional Thrust Stand）"
                description="高灵敏度扭摆结构，适合稳态与缓变推力测量。"
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
                title="标定、阻尼、补偿、反馈与传感模块"
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
