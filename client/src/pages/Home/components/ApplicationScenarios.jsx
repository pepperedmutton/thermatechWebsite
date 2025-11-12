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
                为霍尔推力器、离子推力器等提供精确的束流诊断、羽流分析、性能评估以及精确微推力测量。
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
                应用于等离子体刻蚀与薄膜沉积工艺。通过实时监控等离子体工艺窗口的关键参数（如电子密度、温度、离子通量及组分），保障加工过程中等离子体状态的稳定与可重复性。
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
                  应用于等离子体注入、表面活化与功能镀膜。通过诊断与调控等离子体中的活性粒子种类与能量，辅助用户精确控制材料表层的化学成分与物理特性，以实现功能化改性。
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
                为实验室环境下的等离子体物理基础研究提供高精度的诊断工具。
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