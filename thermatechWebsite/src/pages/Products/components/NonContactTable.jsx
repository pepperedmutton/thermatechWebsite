// src/components/NonContactTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// 1. 复用 DiagnosticsTable 的 CSS 模块
import styles from './DiagnosticsTable.module.css'; 

export default function NonContactTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.diagnosticsTable}>
        {/* 2. 更改为三列表头 */}
        <thead>
          <tr>
            <th>诊断方法</th>
            <th>可测量参数</th>
            <th>主要用途</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. 光谱诊断 (合并) */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">光谱与激光诊断</td>
          </tr>
          <tr>
            <td>发射光谱 (OES)</td>
            <td>粒子种类, 激发/电子温度 (特定模型)</td>
            <td>化学反应监测, 粒子鉴别</td>
          </tr>
          <tr>
            <td>激光诱导荧光 (LIF)</td>
            <td>特定粒子密度, VDF/IVDF, 粒子温度</td>
            <td>高精度速度/温度测量, 鞘层分析</td>
          </tr>
          <tr>
            <td>汤姆逊散射 (Thomson)</td>
            <td>电子温度 (<InlineMath>T_e</InlineMath>), 电子密度 (<InlineMath>n_e</InlineMath>)</td>
            <td>"金标准"测量, 无需模型假设</td>
          </tr>
          <tr>
            <td>激光吸收光谱 (LAS)</td>
            <td>特定粒子密度 (绝对值)</td>
            <td>可测量绝对密度, 精度高</td>
          </tr>
          
          {/* 4. 微波/太赫兹诊断 (合并) */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">微波/太赫兹诊断</td>
          </tr>
          <tr>
            <td>微波干涉仪</td>
            <td>电子密度 (<InlineMath>n_e</InlineMath>) (线平均)</td>
            <td>实时性好, 可测量高密度</td>
          </tr>
          <tr>
            <td>太赫兹 (THz) 测量</td>
            <td>电子密度 (<InlineMath>n_e</InlineMath>), 碰撞频率</td>
            <td>可穿透材料, 测量高密度</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
