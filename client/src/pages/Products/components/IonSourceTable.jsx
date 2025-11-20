import React from 'react';
import styles from './CommonTable.module.css'; // 导入统一样式

export default function IonSourceTable() {
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>等离子源类型</th>
            <th>工作原理</th>
            <th>离子能量 (eV)</th>
            <th>适用工质</th>
            <th>中和器</th>
            <th>主要应用</th>
            <th>典型应用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>XHINS-KF系列Kaufman等离子源系统</strong></td>
            <td>热阴极 / 直流放电</td>
            <td>50 – 1500 (宽可调)</td>
            <td>Ar, Xe, N₂ (惰性/反应)</td>
            <td>必需 (热阴极)</td>
            <td>离子束溅射, 材料改性</td>
            <td>实验室基础研究与电推进地面系统的束流调试，也可直接用于刻蚀/溅射工艺线</td>
          </tr>
          <tr>
            <td><strong>XHINS-HS系列霍尔离子源系统（Hall Source）</strong></td>
            <td>E×B 闭环放电</td>
            <td>150 – 600 (中)</td>
            <td>Xe, Kr, Ar</td>
            <td>必需 (空心阴极)</td>
            <td>空间推进, 表面处理</td>
            <td>电推进地面寿命试验与实验室推进原型研究</td>
          </tr>
          <tr>
            <td><strong>XHINS-CA系列阴极弧等离子源系统</strong></td>
            <td>真空弧光放电</td>
            <td>~50 – 200 (多价态)</td>
            <td>金属 (Ti, C, Cu 等)</td>
            <td>自中和 (等离子体)</td>
            <td>硬质涂层 (TiN), 薄膜沉积</td>
            <td>实验室薄膜材料研究及刻蚀/镀膜生产线的高附着力涂层制备</td>
          </tr>
          <tr>
            <td><strong>XHINS-RF系列射频等离子源系统（RF/ICP）</strong></td>
            <td>感应耦合放电</td>
            <td>小于100 (低)</td>
            <td>Ar, O₂, N₂, H₂</td>
            <td>可选 (栅极引出)</td>
            <td>半导体刻蚀, 清洗, 辅助沉积</td>
            <td>晶圆刻蚀/清洗工艺以及低损伤材料实验平台</td>
          </tr>
          {/* --- ECR 已移动到最后 --- */}
          <tr>
            <td><strong>XHINS-ECR系列ECR等离子源系统</strong></td>
            <td>电子回旋共振</td>
            <td>10 – 2000+ (宽范围)</td>
            <td>Ar, O₂, N₂, 多价态离子</td>
            <td>可选 (栅极引出)</td>
            <td>多价态等离子源, 空间推进, 注入</td>
            <td>基础研究装置的多价态束流、及推进/刻蚀实验中的特种离子激励</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
