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
        {/* 装饰性 SVG */}
        <div aria-hidden style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
          <svg width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="52" height="52" rx="10" stroke="url(#g1)" strokeWidth="2" fill="rgba(255,255,255,0.02)" />
            {/* 卫星主体 */}
            <circle cx="32" cy="32" r="10" fill="url(#g1)" />
            {/* 太阳能板 */}
            <rect x="12" y="28" width="12" height="8" fill="#2dd4bf" />
            <rect x="40" y="28" width="12" height="8" fill="#60a5fa" />
            {/* 天线 */}
            <path d="M32 22v-6M30 16l2 2M34 16l-2 2" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <div>
            <h2>提供完整的测量解决方案</h2>
            <p style={{ margin: 0 }}>
              我们面向科研与工程应用，提供以结果为导向的等离子体测量能力：一体化系统交付、针对性定制方案、完善的设备型谱，以及响应迅速的技术支持，覆盖从试验系统/平台建立到大批量生产的完整流程。
            </p>
          </div>
        </div>

        {/* 扩展要点示例 */}
        <ul style={{ marginTop: '14px', paddingLeft: '18px', color: '#d9dde3' }}>
          <li>交付示例：整套朗缪尔探针系统（探头 + 数据采集 + 后处理软件），并提供操作与数据分析文档。</li>
          <li>定制实例：光学诊断适配方案（光学窗口 + 激光路径 + 数据接口）。</li>
          <li>服务保障：现场安装与在线培训，确保长期可重复性。</li>
        </ul>
      </div>

      {/* 右侧：四大业务核心（2×2 更均衡） */}
      <div className={styles.pointsGrid}>
        {/* 1. 完整测量系统 */}
        <div className={styles.pointItem}>
            <h3><i className="fas fa-cubes" aria-hidden="true"></i> 完整测量系统 · 开箱即用</h3>
          <p>
            探头/光学头、扫描与采集电路、控制软件与数据报表系统化集成，出厂匹配与标定完成；标准化接口与预置流程，上电即测。
          </p>
        </div>

        {/* 2. 深度定制 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-tools" aria-hidden="true"></i> 按需深度定制 · 适配场景</h3>
          <p>
            面向不同介质、不同放电形式、真空与磁场条件，提供<strong>几何、材料、量程、抗扰</strong>等多维定制；支持非标法兰与自动化接口，确保高匹配度。
          </p>
        </div>

  {/* 3. 测量设备型谱 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-microscope" aria-hidden="true"></i> 多类型测量设备 · 完整序列</h3>
          <p>
            朗缪尔探针等接触式仪器，发射光谱 (OES)、激光诱导荧光 (LIF) 等光学诊断，等非接触式仪器，覆盖电子温度、等离子体电势、悬浮电势、粒子能量/速度等关键参数。
          </p>
        </div>

        {/* 4. 技术支持 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-headset" aria-hidden="true"></i> 技术支持 · 全周期服务</h3>
          <p>
            提供现场/远程支持、交付培训与咨询；快速响应售后与维护需求，提供升级方案，保障长期稳定运行。
          </p>
        </div>
      </div>
    </div>
  );
}
