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
            <th>推荐应用场景</th>
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
            <td>最广泛</td>
          </tr>
          <tr>
            <td>双探针</td>
            <td><InlineMath>n_e, T_e</InlineMath></td>
            <td>大气，高密度</td>
          </tr>
          <tr>
            <td>三探针</td>
            <td><InlineMath>n_e, T_e</InlineMath></td>
            <td>脉冲/瞬态放电、瞬态参数</td>
          </tr>
          <tr>
            <td>发射探针</td>
            <td><InlineMath>V_p</InlineMath></td>
            <td>稀薄等离子体</td>
          </tr>

          {/* 2. 其他探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">其他等离子体探针</td>
          </tr>
          <tr>
            <td>磁探针</td>
            <td>磁场 <InlineMath>B</InlineMath></td>
            <td>磁约束等离子体或推进器磁路调试</td>
          </tr>
          <tr>
            <td>法拉第探针</td>
            <td>离子束流密度 <InlineMath>J_i</InlineMath></td>
            <td>离子束测试、推进器羽流均匀性评估</td>
          </tr>
          
          {/* 3. 分析仪组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">粒子收集及能量分析仪</td>
          </tr>
          <tr>
            <td>E×B 探针</td>
            <td>离子组分, 速度分布</td>
            <td>推进器羽流离子组分、杂质监测</td>
          </tr>
          <tr>
            <td>阻滞能量分析仪 (RPA / RFEA)</td>
            <td>离子能量分布 (IEDF)</td>
            <td>表面处理工艺、推进器离子能谱优化</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
