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
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.categoryRow}><td colSpan="3">测量设备</td></tr>
          <tr>
            <td>扭摆式推力计</td>
            <td>1 μN – 100 mN</td>
            <td>高灵敏度，适合稳态与缓变推力测量</td>
          </tr>
          <tr>
            <td>电磁/静电平衡式</td>
            <td>10 μN – 1 N</td>
            <td>动态响应快，可测脉冲推力</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">数据与服务</td></tr>
          <tr>
            <td>数据处理</td>
            <td>滤波、去噪、热漂移补偿</td>
            <td>提供 MATLAB/Python 脚本和处理报告</td>
          </tr>
          <tr>
            <td>标定与不确定度分析</td>
            <td>符合 GUM 标准</td>
            <td>生成标定证书与完整不确定度预算</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">环境与接口</td></tr>
          <tr>
            <td>真空兼容</td>
            <td>高真空 (&lt; 10^-3 Pa)</td>
            <td>可与现有真空平台集成</td>
          </tr>
          <tr>
            <td>信号接口</td>
            <td>模拟 / 数字 / DAQ</td>
            <td>支持标准数据导出与实时监控</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
