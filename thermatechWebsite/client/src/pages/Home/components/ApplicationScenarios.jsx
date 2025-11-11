// src/components/ApplicationScenarios.jsx
import React from 'react';
import styles from './ApplicationScenarios.module.css';

export default function ApplicationScenarios() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* 1. 标题已更改 */}
        <h2 className={styles.title}>应用场景与合作伙伴</h2>
        
        {/* --- 应用场景部分 (保持不变) --- */}
        <div className={styles.scenariosGrid}>
          {/* 场景 1: 电推力器 */}
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                {/* 卫星主体 */}
                <circle cx="47" cy="47" r="18" fill="#1E3A8A" />
                {/* 太阳能板 */}
                <rect x="10" y="40" width="20" height="12" fill="#1E3A8A" />
                <rect x="64" y="40" width="20" height="12" fill="#1E3A8A" />
                {/* 天线 */}
                <path d="M47 30v-8M44 22l3 3M50 22l-3 3" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.scenarioContent}>
              <h3>空间电推进</h3>
              <p>
                为霍尔推力器、离子推力器等提供精确的束流诊断、羽流分析和性能评估。
              </p>
            </div>
          </div>
          {/* ... (其他 3 个场景卡片) ... */}
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-microchip"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>半导体制造</h3>
              <p>
                用于等离子体刻蚀 (Etching) 和沉积 (Deposition) 过程的实时监控，确保工艺窗口的稳定性和一致性。
              </p>
            </div>
          </div>
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-layer-group"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>材料表面改性</h3>
              <p>
                应用于等离子体浸没注入、薄膜沉积和表面活化处理，精确控制处理效果。
              </p>
            </div>
          </div>
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-atom"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>基础科学研究</h3>
              <p>
                为实验室环境下的等离子体物理、聚变能、天体物理等基础研究提供高精度的诊断工具。
              </p>
            </div>
          </div>
        </div>
        {/* --- 应用场景结束 --- */}


        {/* --- 2. 新增：分隔线 --- */}
        <hr className={styles.separator} />


        {/* 合作伙伴部分已移除（保持页面风格稳定） */}

      </div>
    </div>
  );
}