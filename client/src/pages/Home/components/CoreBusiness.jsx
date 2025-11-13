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
      {/* 左侧：业务总述 (新文案) */}
      <div className={styles.textContainer}>
        {/* 装饰性 SVG */}
        <div aria-hidden style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
          {/* <YourSvgIcon /> */}
          <div>
            <h2>专注、高效的等离子体测量方案</h2>
            <p style={{ margin: 0 }}>
              我们为科研与工程客户提供高效、易用的等离子体测量解决方案。我们聚焦于您的核心需求：提供可深度定制、开箱即用的测量系统，并辅以全周期的技术与培训支持，助您快速获取精准的等离子体关键参数。
            </p>
          </div>
        </div>

        {/* 核心价值 (新文案) */}
        <ul style={{ marginTop: '14px', paddingLeft: '18px', color: '#d9dde3' }}>
          <li><strong>核心价值：</strong> 告别繁琐的系统搭建，让您专注攻克核心问题。</li>
          <li><strong>定制保障：</strong> 无论您的工况多么特殊，我们都将尽力为您提供匹配的定制方案。</li>
          <li><strong>服务承诺：</strong> 完整的交付培训与快速的售后响应，保障项目长期稳定运行。</li>
          <li><strong>专业背景：</strong> 核心团队源自北航电推进实验室，具有丰富的等离子体诊断经验，产品已服务于国内多所顶尖高校、企业与科研院所。</li>
          {/* --- 结束 --- */}
        </ul>
      </div>

      {/* 右侧：四大业务核心 (新文案) */}
      <div className={styles.pointsGrid}>
        {/* 1. 深度定制 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-tools" aria-hidden="true"></i> 深度定制 · 完美适配</h3>
          <p>
            针对您的特定应用场景和工况条件，我们提供从硬件（结构、材料）到软件（自动化接口）的全方位定制服务，确保测量系统与您的平台无缝对接。
          </p>
        </div>

        {/* 2. 完整测量系统 */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-cubes" aria-hidden="true"></i> 完整系统 · 开箱即用</h3>
          <p>
            我们提供“交钥匙”工程。所有硬件（探头、采集电路）与控制软件均已系统化集成并完成标定。标准化接口设计，让您上电即测，无需繁琐配置。
          </p>
        </div>

        {/* 3. 测量设备型谱 (新标题和文案) */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-microscope" aria-hidden="true"></i> 覆盖关键参数</h3>
          <p>
            我们综合运用多种成熟的诊断技术，可精确测量电子/离子密度、温度、电势、粒子能量等关键等离子体参数，为您提供全面的数据洞察。
          </p>
        </div>

        {/* 4. 技术支持 (新文案) */}
        <div className={styles.pointItem}>
          <h3><i className="fas fa-headset" aria-hidden="true"></i> 全周期技术支持</h3>
          <p>
            我们提供详尽的交付培训（现场或远程），确保您的团队快速上手。更在系统整个生命周期内提供快速响应的维护与升级咨询，保障项目长期稳定。
          </p>
        </div>
      </div>
    </div>
  );
}