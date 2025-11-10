// src/components/DiagnosticsTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styles from './DiagnosticsTable.module.css'; // 我们将使用新的 CSS

export default function DiagnosticsTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.diagnosticsTable}>
        <thead>
          <tr>
            <th>探针类型</th>
            <th>可测量参数</th>
            <th>主要用途</th>
          </tr>
        </thead>
        <tbody>
          {/* 1. 朗缪尔探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">朗缪尔探针</td>
          </tr>
          <tr>
            <td>单探针</td>
            <td><InlineMath>n_e, T_e, V_p, V_f</InlineMath>, EEDF</td>
            <td>基础研究, EEDF分析</td>
          </tr>
          <tr>
            <td>双探针</td>
            <td><InlineMath>n_e, T_e</InlineMath></td>
            <td>工业射流, 浮动电位</td>
          </tr>
          <tr>
            <td>三探针</td>
            <td><InlineMath>n_e, T_e</InlineMath> (瞬态)</td>
            <td>瞬态等离子体监测</td>
          </tr>
          <tr>
            <td>发射探针</td>
            <td><InlineMath>V_p</InlineMath> (高精度)</td>
            <td>复杂电势结构, 推进器羽流</td>
          </tr>

          {/* 2. 其他探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">其他等离子体探针</td>
          </tr>
          <tr>
            <td>磁探针</td>
            <td>磁场 <InlineMath>B</InlineMath></td>
            <td>磁约束, 场拓扑结构</td>
          </tr>
          <tr>
            <td>法拉第探针</td>
            <td>离子束流密度 <InlineMath>J_i</InlineMath></td>
            <td>束流均匀性, 推进器效率</td>
          </tr>
          
          {/* 3. 分析仪组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">粒子收集及能量分析仪</td>
          </tr>
          <tr>
            <td>E×B 探针</td>
            <td>离子组分, 速度分布</td>
            <td>混合工质, 杂质分析</td>
          </tr>
          <tr>
            <td>阻滞能量分析仪 (RPA)</td>
            <td>离子能量分布 (IEDF)</td>
            <td>离子束能量分析, 刻蚀</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}