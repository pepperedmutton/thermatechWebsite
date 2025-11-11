// src/components/NonContactTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 1. 复用 DiagnosticsTable 的 CSS 模块
import styles from './CommonTable.module.css'; 

export default function NonContactTable() {
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        {/* 2. 更改为两列表头 */}
        <thead>
          <tr>
            <th>诊断方法</th>
            <th>可测量参数</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. 光谱诊断 (合并) */}
          <tr className={styles.categoryRow}>
            <td colSpan="2">光谱与激光诊断</td>
          </tr>
          <tr>
            <td>发射光谱 (OES)</td>
            <td>粒子种类, 激发/电子温度 (特定模型)</td>
          </tr>
          <tr>
            <td>激光诱导荧光 (LIF)</td>
            <td>特定粒子密度, VDF/IVDF, 粒子温度</td>
          </tr>
          <tr>
            <td>汤姆逊散射 (Thomson)</td>
            <td>电子温度 (<InlineMath>T_e</InlineMath>), 电子密度 (<InlineMath>n_e</InlineMath>)</td>
          </tr>
          <tr>
            <td>激光吸收光谱 (LAS)</td>
            <td>特定粒子密度 (绝对值)</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
