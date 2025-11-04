// src/components/CoreBusiness.jsx
import React from 'react';
import styles from './CoreBusiness.module.css';
import coreBg from '../../../assets/images/core-business-bg.png';

export default function CoreBusiness() {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${coreBg})` }}
    >
      {/* 左侧：业务总述 */}
      <div className={styles.textContainer}>
        <h2>围绕测量场景端到端交付能力</h2>
        <p>
          我们面向科研与工程应用，提供以结果为导向的等离子体测量能力：一体化系统交付、针对性定制方案、完善的设备序列，以及响应迅速的技术支持，覆盖从首次部署到规模化运行的全生命周期。
        </p>
      </div>

      {/* 右侧：四大业务核心（2×2 更均衡） */}
      <div className={styles.pointsGrid}>
        {/* 1. 完整测量系统 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-cubes" aria-hidden="true"></i> 完整测量系统 · 开箱即用</h3>
          <p>
            探头/光学头、扫描与采集电路、控制软件与数据报表<strong>整机集成</strong>，出厂匹配与标定完成；标准化接口与预置流程，<strong>上电即测</strong>。
          </p>
        </div>

        {/* 2. 深度定制 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-tools" aria-hidden="true"></i> 按需深度定制 · 适配场景</h3>
          <p>
            面向不同介质、功率、真空与磁场条件，提供<strong>几何、材料、量程、抗扰</strong>等多维定制；支持非标法兰与自动化接口，确保高匹配度。
          </p>
        </div>

        {/* 3. 测量设备序列 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-microscope" aria-hidden="true"></i> 多类型测量设备 · 完整序列</h3>
          <p>
            朗缪尔/法拉第/<span aria-label="E cross B">E×B</span> 等接触式探针，OES/LIF/汤姆逊散射等光学诊断，覆盖<strong>密度、温度、电势、束流、速度分布</strong>等关键参数。
          </p>
        </div>

        {/* 4. 技术支持 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-headset" aria-hidden="true"></i> 技术支持 · 全周期服务</h3>
          <p>
            提供现场/远程支持、交付培训与方法学咨询；快速响应售后与维护需求，提供校准与升级方案，保障长期稳定运行。
          </p>
        </div>
      </div>
    </div>
  );
}
