import React from 'react';
import styles from './LangmuirPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import ProductDetail from './components/ProductDetail';

// 导入朗缪尔单探针的图片
import langmuirSwipe1 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe1.png';
import langmuirSwipe2 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe2.png';
import langmuirDouble1 from '../../../assets/images/LangmuirDouble/double-swipe-1.png';
import langmuirDouble2 from '../../../assets/images/LangmuirDouble/double-swipe-2.png';

export default function LangmuirPage() {
  const langmuirImages = [langmuirSwipe1, langmuirSwipe2];
  const langmuirDoubleImages = [langmuirDouble1, langmuirDouble2];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>朗缪尔探针（Langmuir Probe）</h1>
        <p className={styles.lead}>
          扫描 I–V 特性获取 <InlineMath math="n_e" />、<InlineMath math="T_e" />、
          <InlineMath math="V_p" />、<InlineMath math="V_f" /> 等参数。下列为我们提供的
          <strong> 单探针 / 双探针 / 三探针 </strong>三款产品形态。
        </p>

        {/* 1) 单探针 */}
        <ProductDetail
          id="single"
          title="朗缪尔单探针测量系统 (XHINS-SLP)"
          tagline="全面、通用的等离子体参数诊断系统，支持多种探针形式与结构"
          overview={
            <>
              朗缪尔探针测量系统（XHINS-SLP）是用于精确诊断等离子体核心参数的通用解决方案。通过扫描探针的 I-V 特性，系统能够全面测量电子密度、离子密度、电子温度、空间电势、悬浮电势以及电子能量分布函数（EEDF）。我们提供包括单探针、双探针、三探针及探针阵列等多种形式，并支持圆柱、平面、球型等不同探针结构，以满足多样化的实验需求。该系统具有测量参数全面、普适性强的特点，可灵活组合使用，深度分析各类等离子体环境。
            </>
          }
          features={[
            <>可测量 <InlineMath math="n_e, n_i, T_e, V_p, V_f" /> 及 EEDF</>,
            <>支持单/双/三探针及探针阵列等多种形式</>,
            <>支持圆柱/平面/球型等不同探针结构</>,
            <>电压扫描方式：线性 / 三角 / 步进；支持自动扫描与平均</>,
            <>探针材料：W / Mo / Ta（可选 SiC 涂层）</>,
            <>护套：<InlineMath math="\mathrm{Al_2O_3}" /> / BN / 石英；耐温与绝缘可选</>,
          ]}
          specs={[
            ['偏压范围', '±200 V（可拓展）', '覆盖离子至电子饱和区'],
            ['电流测量', '10 pA – 100 mA', '皮安计/跨阻放大器'],
            ['探针直径', '0.1–1.0 mm（可定制）', '细径扰动小，粗径耐热强'],
            ['支架/运动', '线性/旋转/三维扫描', '真空法兰兼容'],
          ]}
          galleryImages={langmuirImages}
        />

        {/* 2) 双探针 */}
        <ProductDetail
          id="double"
          title="双探针（Double Probe）"
          tagline="无需接地参考，抗噪声能力强，适合浮地或强干扰系统"
          overview={
            <>
              两根等效探针以对称方式偏置，测得的 <InlineMath math="I(V)" /> 曲线不依赖
              真实地电位，因此对接地不良或噪声环境更稳健。可用于空间等离子体、
              浮地推进器/反应器等场景。
            </>
          }
          features={[
            <>弱地参考依赖：降低接地环路与噪声耦合</>,
            <>适用漂浮系统或高共模场景</>,
            <>与单探针对比，<InlineMath math="V_p" /> 的获取需结合模型或额外测量</>,
            <>可搭配抑制电极与护套，提升抗溅射与耐热</>,
          ]}
          specs={[
            ['偏压配置', '对称±V', '中心点近似等于浮动电位参考'],
            ['测量量程', 'pA – mA', '依接线与跨阻选择'],
            ['材料与护套', 'W / Mo / Ta + Al₂O₃/BN/石英', '与单探针一致'],
            ['使用场景', '浮地系统 / 强干扰', '推进器、空间等离子体等'],
          ]}
          galleryImages={langmuirDoubleImages}
        />

        {/* 3) 三探针 */}
        <ProductDetail
          id="triple"
          title="三探针（Triple Probe）"
          tagline="快速测温，无需完整扫描；瞬变/脉冲场景优先选择"
          overview={
            <>
              通过三根探针在固定偏置组合下同步测流，直接计算
              <InlineMath math="T_e" /> 与相关参数，避免完整电压扫描，适合瞬态或
              高频变化工况。
            </>
          }
          features={[
            <>无需 I–V 全扫：实时性好，数据率高</>,
            <>对 <InlineMath math="T_e" /> 的灵敏度高，便于过程控制</>,
            <>需要较好的电路匹配与几何一致性</>,
            <>可加入抑制电极以降低二次电子影响</>,
          ]}
          specs={[
            ['偏置方案', '固定偏压网络', '出厂标定与校正'],
            ['时间分辨', '≤ ms 级（视电路）', '适合脉冲/瞬变'],
            ['电流通道', '≥ 3 路同步', '跨阻/皮安计并行'],
            ['适用场景', '瞬变/脉冲/高扫速受限', '推进器启动、脉冲放电'],
          ]}
        />
      </div>
    </div>
  );
}
