// src/components/NonContactTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 1. 我们将复用 DiagnosticsTable 的 CSS 模块
import styles from './DiagnosticsTable.module.css'; 

export default function NonContactTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.diagnosticsTable}>
        {/* 1. 扩展表头 */}
        <thead>
          <tr>
            <th>诊断方法</th>
            <th>可测量参数</th>
            <th>主要优势</th>
            <th>主要挑战</th>
          </tr>
        </thead>
        <tbody>
          {/* 2. 发射光谱 (OES) */}
          <tr>
            <td>发射光谱 (OES)</td>
            <td>粒子种类, 激发/电子温度 (特定模型)</td>
            <td>成本低, 非侵入, 实时监测</td>
            <td>空间分辨率低, 依赖理论模型</td>
          </tr>

          {/* 3. 激光诱导荧光 (LIF) */}
          <tr>
            <td>激光诱导荧光 (LIF)</td>
            <td>特定粒子密度, VDF/IVDF, 粒子温度</td>
            <td>高选择性, 高时空分辨率</td>
            <td>系统昂贵, 需要可调谐激光器</td>
          </tr>

          {/* 4. 汤姆逊散射 */}
          <tr>
            <td>汤姆逊散射 (Thomson)</td>
            <td>电子温度 (<InlineMath>T_e</InlineMath>), 电子密度 (<InlineMath>n_e</InlineMath>)</td>
            <td>“金标准”测量, 无需模型假设</td>
            <td>信号极弱, 系统昂贵且复杂</td>
          </tr>
          
          {/* 5. (新增行) */}
           <tr>
            <td>太赫兹 (THz) 测量</td>
            <td>电子密度 (<InlineMath>n_e</InlineMath>), 碰撞频率</td>
            <td>高密度测量, 实时性好</td>
            <td>需要复杂的光路和发射/接收器</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}