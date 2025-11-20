import React from 'react';
import styles from './ProductDetailPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import ProductDetail from './components/ProductDetail';
import SubNav from './components/SubNav';

// 导入朗缪尔单探针的图片
import langmuirSwipe1 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe1.png';
import langmuirSwipe2 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe2.png';
import langmuirDouble1 from '../../../assets/images/LangmuirDouble/double-swipe-1.png';
import langmuirDouble2 from '../../../assets/images/LangmuirDouble/double-swipe-2.png';
import langmuirTriple1 from '../../../assets/images/LangmuirTriple/triple-swipe-1.png';
// 导入发射探针的图片
import emissiveSwipe1 from '../../../assets/images/EmissiveProbe/emissive-swipe1.png';

export default function LangmuirPage() {
  const langmuirImages = [langmuirSwipe1, langmuirSwipe2];
  const langmuirDoubleImages = [langmuirDouble1, langmuirDouble2];
  const langmuirTripleImages = [langmuirTriple1];
  const emissiveImages = [emissiveSwipe1];
  const probeTypes = [
    { id: 'single', title: '单探针' },
    { id: 'double', title: '双探针' },
    { id: 'triple', title: '三探针' },
    { id: 'emissive', title: '发射探针' },
  ];

  return (
    <div className={styles.pageWrapper}>
      <SubNav items={probeTypes} />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>朗缪尔探针（Langmuir Probe）</h1>
        <p className={styles.lead}>
          扫描 I–V 特性获取电子密度(<InlineMath math="n_e" />)、电子温度(<InlineMath math="T_e" />)、
          空间电势(<InlineMath math="V_p" />)、悬浮电势(<InlineMath math="V_f" />) 等参数。下列为我们提供的
          <strong> 单探针 / 双探针 / 三探针/发射探针 </strong>。
          系统支持探针阵列与多种构型（圆柱、平面、球型），可满足多样化的实验需求。
        </p>

        <p className={styles.lead}>
          系统可配备多种可选模块以适应不同的测量环境和需求：<br/>
          <strong>射频滤波模块</strong>用于抑制射频干扰，确保在射频放电环境中的测量精度；<br/>
          <strong>冷却模块</strong>提供主动温度控制，使探针能够在高功率等离子体中长期稳定工作；<br/>
          <strong>位移模块</strong>实现探针的精确三维位移控制，支持空间扫描和多点测量。
        </p>

        {/* 1) 单探针 */}
        <ProductDetail
          id="single"
          title="朗缪尔单探针测量系统 (XHINS-SLP)"
          tagline="全面、通用的等离子体参数诊断系统，支持多种探针形式与结构"
          overview={
            <>
              朗缪尔单探针测量系统（XHINS-SLP）是用于精确诊断等离子体核心参数的通用解决方案。通过扫描探针的 I-V 特性，系统能够全面测量电子密度、离子密度、电子温度、空间电势、悬浮电势以及电子能量分布函数（EEDF）。系统支持圆柱、平面、球型等不同探针结构，以满足多样化的实验需求。该系统具有测量参数全面、普适性强的特点，可灵活应用于各类等离子体环境的深度分析。
            </>
          }
          features={[
            <>可测量电子密度(<InlineMath math="n_e" />)、离子密度(<InlineMath math="n_i" />)、电子温度(<InlineMath math="T_e" />)、空间电势(<InlineMath math="V_p" />)、悬浮电势(<InlineMath math="V_f" />)以及电子能量分布函数 (EEDF)</>,
            <>支持圆柱/平面/球型等不同探针结构</>,
            <>电压扫描方式：线性 / 三角 / 步进；支持自动扫描与平均</>,
            <>探针材料：W / Mo / Ta（可选 SiC 涂层）</>,
            <>护套：<InlineMath math="\mathrm{Al_2O_3}" /> / BN / 石英；耐温与绝缘可选</>,
          ]}
          specs={[
            ['偏压范围', '±200 V（可拓展）', '覆盖离子至电子饱和区'],
            ['电流测量', '10 pA – 100 mA', '高精度电流检测'],
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
              <>可测量电子密度(<InlineMath math="n_e" />)、离子密度(<InlineMath math="n_i" />)、电子温度(<InlineMath math="T_e" />)等核心参数，并可配合后处理获取电子能量分布函数 (EEDF)</>,
              <>多种扫描模式（线性/三角/步进），支持自动扫描与数据平均</>,
              <>可配高灵敏电流检测电路与多种护套材料以适应苛刻环境</>,
            ]}
          specs={[
            ['偏压范围', '±200 V（可拓展）', '覆盖离子至电子饱和区'],
            ['电流测量', 'pA – mA', '高精度电流检测系统'],
            ['探针直径', '0.1–1.0 mm（可定制）', '细径扰动小，粗径耐热强'],
            ['结构/支架', '圆柱/平面/球型；线性/旋转/三维扫描', '真空法兰兼容，适配现场布局'],
          ]}
          galleryImages={langmuirDoubleImages}
        />

        {/* 3) 三探针 */}
          <ProductDetail
            id="triple"
            title="朗缪尔三探针测量系统 (XHINS-TLP)"
            tagline="三探针并行测量，实现高时间分辨率的瞬态等离子体诊断"
            overview={
              <>
                XHINS‑TLP 由三根相同尺寸探针构成，中间探针处于悬浮状态。该系统通过三通道并行采集，
                在放电周期或瞬变过程内直接获取时间序列信息，可实时反映等离子体密度和电子温度等参数的时变规律。
                三探针方案在瞬态/脉冲场景中能显著提高时间分辨率与采样效率，适用于脉冲放电、推进器瞬态及工业等离子体过程的快速诊断。
              </>
            }
            features={[
              <>三通道并行采集，适合瞬态/脉冲事件的高时间分辨率诊断</>,
              <>中间探针悬浮设计，减少对完整 I–V 扫描的依赖以提高采样效率</>,
              <>支持外部触发/DAQ 同步，便于时间对齐与统计分析</>,
              <>可选高带宽电路与滤波电路以提升信噪比</>,
            ]}
            specs={[
              ['偏置方案', '固定偏压网络 / 可编程偏压', '出厂标定与可配置选项'],
              ['时间分辨', '≤ ms（可达 μs 级，依前端电路）', '适用于瞬态/脉冲场景'],
              ['电流测量', 'pA – mA', '高精度电流检测'],
              ['通道/同步', '≥ 3 路同步采集', '支持触发与外部时钟同步'],
            ]}
            galleryImages={langmuirTripleImages}
          />

        {/* 4) 发射探针 */}
        <ProductDetail
          id="emissive"
          title="发射探针测量系统 (XHINS-EP)"
          tagline="高信噪比的空间电势与电子温度测量"
          overview={
            <>
              XHINS-EP 发射探针测量系统用于高精度测量等离子体的电子温度与空间电势。相较于常规朗缪尔探针，发射探针在测量空间电势方面表现出更高的精度与信噪比，适合需要精细电位分布信息的诊断任务。
              系统兼容多种探针结构与材料，配套软件可生成空间电势与电子温度的分布云图，便于直观分析与仿真校准。
            </>
          }
          features={[
            <>高精度空间电势(<InlineMath math="V_p" />)测量与电子温度(<InlineMath math="T_e" />)估算</>,
            <>相较于标准朗缪尔法，具有更高的信噪比与电势解析能力</>,
            <>兼容多种探针结构与材料，便于在复杂流场与高温环境中部署</>,
            <>可与数据可视化软件联动，输出热图（等电势/温度分布）用于现场诊断</>,
            ]}
            specs={[
            ['测量参数', '空间电势 (Vp)、电子温度 (Te)', '高灵敏度电位测量与快速数据输出'],
            ['电流/电压量程', 'pA – mA / ±200 V', '根据前端电路配置可定制量程'],
            ['分辨率', '空间与能量分辨可定制', '取决于探针结构与前端带宽'],
            ['接口/兼容', 'KF / CF / 定制法兰；DAQ 接口', '易于集成与同步采集'],
          ]}
          galleryImages={emissiveImages}
        />
      </div>
    </div>
  );
}

