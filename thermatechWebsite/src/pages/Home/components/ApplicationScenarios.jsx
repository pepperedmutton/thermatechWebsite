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
              <i className="fas fa-satellite-dish"></i>
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


        {/* --- 3. 新增：合作伙伴部分 --- */}
        <div className={styles.collaborationSection}>
          <h3 className={styles.collaborationTitle}>强强联合 研发创新</h3>
          <p className={styles.collaborationDescription}>
            我们与多所知名高校及科研院所建立了紧密的合作关系，
            共同推动低温等离子体技术的理论研究与工程应用。
            主要合作单位包括：
          </p>
          {/* 这些白色 "药丸" 在深色渐变背景上
            提供了很好的对比度，并保持了 "白色元素" 的主题
          */}
          <ul className={styles.collaboratorsList}>
            <li>北京航空航天大学</li>
            <li>北京理工大学</li>
            <li>中国科学院等离子体物理研究所</li>
            {/* ... 您可以添加更多 ... */}
          </ul>
        </div>
        {/* --- 合作伙伴结束 --- */}

      </div>
    </div>
  );
}