import React from 'react';
import styles from './ThrustTable.module.css';

export default function ThrustTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.thrustTable}>
        <thead>
          <tr>
            <th>项目</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.categoryRow}><td colSpan="2">测量设备</td></tr>
          <tr>
            <td>扭摆式推力计</td>
            <td>1 μN – 100 mN</td>
          </tr>
          <tr>
            <td>电磁/静电平衡式</td>
            <td>10 μN – 1 N</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="2">数据与服务</td></tr>
          <tr>
            <td>数据处理</td>
            <td>滤波、去噪、热漂移补偿</td>
          </tr>
          <tr>
            <td>标定与不确定度分析</td>
            <td>符合 GUM 标准</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="2">环境与接口</td></tr>
          <tr>
            <td>真空兼容</td>
            <td>高真空 (&lt; 10^-3 Pa)</td>
          </tr>
          <tr>
            <td>信号接口</td>
            <td>模拟 / 数字 / DAQ</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
