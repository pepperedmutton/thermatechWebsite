// src/components/DiagnosticsTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styles from './CommonTable.module.css'; // 使用统一表格样式

export default function DiagnosticsTable() {
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>探针类型</th>
            <th>可测量参数</th>
          </tr>
        </thead>
        <tbody>
          {/* 1. 朗缪尔探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="2">朗缪尔探针</td>
          </tr>
          <tr>
            <td>单探针</td>
            <td><InlineMath>n_e, T_e, V_p, V_f</InlineMath>, EEDF</td>
          </tr>
          <tr>
            <td>双探针</td>
            <td><InlineMath>n_e, T_e</InlineMath></td>
          </tr>
          <tr>
            <td>三探针</td>
            <td><InlineMath>n_e, T_e</InlineMath> (瞬态)</td>
          </tr>
          <tr>
            <td>发射探针</td>
            <td><InlineMath>V_p</InlineMath> (高精度)</td>
          </tr>

          {/* 2. 其他探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="2">其他等离子体探针</td>
          </tr>
          <tr>
            <td>磁探针</td>
            <td>磁场 <InlineMath>B</InlineMath></td>
          </tr>
          <tr>
            <td>法拉第探针</td>
            <td>离子束流密度 <InlineMath>J_i</InlineMath></td>
          </tr>
          
          {/* 3. 分析仪组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="2">粒子收集及能量分析仪</td>
          </tr>
          <tr>
            <td>E×B 探针</td>
            <td>离子组分, 速度分布</td>
          </tr>
          <tr>
            <td>阻滞能量分析仪 (RPA / RFEA)</td>
            <td>离子能量分布 (IEDF)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}