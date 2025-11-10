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

        {/* 2) 双探针（XHINS-DLP） */}
        <ProductDetail
          id="double"
          title="朗缪尔双探针测量系统 (XHINS-DLP)"
          tagline="基于参考电极的稳健式等离子体诊断，适用于无地参考或参考电极距离较远的场景"
          overview={
            <>
              XHINS-DLP 是在朗缪尔单探针基础上演化出的双探针测量系统。系统以其中一根探针作为参考电极，
              通过两探针间的对称偏置与电流测量，在缺少或远离地参考电极的环境下依然能可靠提取等离子体关键参数，
              包括电子密度、离子密度与电子温度等。该方案特别适合大气压等离子体射流、浮地装置与强干扰环境，兼具普适性与更高抗噪性能。
            </>
          }
          features={[
            <>基于参考电极的测量方法，降低接地依赖并提高抗干扰能力</>,
            <>可测量 <InlineMath math="n_e, n_i, T_e" /> 等核心参数，并可配合后处理获取 EEDF</>,
            <>支持单/双/三探针及探针阵列，结构支持圆柱、平面、球型</>,
            <>多种扫描模式（线性/三角/步进），支持自动扫描与数据平均</>,
            <>可配高灵敏跨阻放大器与多种护套材料以适应苛刻环境</>,
          ]}
          specs={[
            ['偏压范围', '±200 V（可拓展）', '覆盖离子至电子饱和区'],
            ['电流测量', 'pA – mA', '可选跨阻/皮安计以适配量程'],
            ['探针直径', '0.1–1.0 mm（可定制）', '细径扰动小，粗径耐热强'],
            ['结构/支架', '圆柱/平面/球型；线性/旋转/三维扫描', '真空法兰兼容，适配现场布局'],
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
