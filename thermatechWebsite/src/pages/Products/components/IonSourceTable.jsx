import React from 'react';
import styles from './IonSourceTable.module.css'; // 导入样式

export default function IonSourceTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.ionSourceTable}>
        <thead>
          <tr>
            <th>离子源类型</th>
            <th>工作原理</th>
            <th>离子能量 (eV)</th>
            <th>适用工质</th>
            <th>中和器</th>
            <th>主要应用</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kaufman 离子源</strong></td>
            <td>热阴极 / 直流放电</td>
            <td>50 – 1500 (宽可调)</td>
            <td>Ar, Xe, N₂ (惰性/反应)</td>
            <td>必需 (热阴极)</td>
            <td>离子束溅射, 材料改性</td>
          </tr>
          <tr>
            <td><strong>阴极弧离子源</strong></td>
            <td>真空弧光放电</td>
            <td>~50 – 200 (多价态)</td>
            <td>金属 (Ti, C, Cu 等)</td>
            <td>自中和 (等离子体)</td>
            <td>硬质涂层 (TiN), 薄膜沉积</td>
          </tr>
          <tr>
            <td><strong>射频离子源 (RF/ICP)</strong></td>
            <td>感应耦合放电</td>
            <td>小于100 (低)</td>
            <td>Ar, O₂, N₂, H₂</td>
            <td>可选 (栅极引出)</td>
            <td>半导体刻蚀, 清洗, 辅助沉积</td>
          </tr>
          <tr>
            <td><strong>霍尔源 (Hall Source)</strong></td>
            <td>E×B 闭环放电</td>
            <td>150 – 600 (中)</td>
            <td>Xe, Kr, Ar</td>
            <td>必需 (空心阴极)</td>
            <td>空间推进, 表面处理</td>
          </tr>
          {/* --- ECR 已移动到最后 --- */}
          <tr>
            <td><strong>ECR 离子源</strong></td>
            <td>电子回旋共振</td>
            <td>10 – 2000+ (宽范围)</td>
            <td>Ar, O₂, N₂, 多价态离子</td>
            <td>可选 (栅极引出)</td>
            <td>多价态离子源, 空间推进, 注入</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}