import React from 'react';
import styles from './CommonTable.module.css';

export default function ThrustTable() {
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>项目</th>
            <th>参数</th>
            <th>推荐应用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.categoryRow}><td colSpan="3">推力架平台（Thrust Stand）</td></tr>
          <tr>
            <td>XHINS-TB 扭摆式推力架（Thrust Stand）</td>
            <td>量程 1 μN – 100 mN，分辨率 &lt; 0.5 μN</td>
            <td>微推力电推进或冷气推力器的性能研发与标定</td>
          </tr>
          <tr>
            <td>XHINS-EB 电磁平衡式推力架（Thrust Stand）</td>
            <td>量程 10 μN – 1 N，闭环负反馈抑振</td>
            <td>霍尔/离子推进器长时稳态测试、脉冲推力积分</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">配套测量链路</td></tr>
          <tr>
            <td>位移/力读出模块</td>
            <td>激光干涉/光栅位移 + 低噪声仪放</td>
            <td>输出高频位移与净推力波形，便于后处理</td>
          </tr>
          <tr>
            <td>数据处理与试验脚本</td>
            <td>滤波、热漂移补偿、脉冲积分、GUM 不确定度</td>
            <td>形成科研级推力曲线及性能指标报告</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">实验环境与适配</td></tr>
          <tr>
            <td>真空与工质支持</td>
            <td>10^-4 Pa 级真空系统，Xe/Ar/Kr 供气链路</td>
            <td>推进器地面性能评估、等离子体源应用实验</td>
          </tr>
          <tr>
            <td>安装与法兰适配</td>
            <td>定制治具、接口转接、互锁联动</td>
            <td>快速部署到现有真空腔或等离子体试验平台</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
