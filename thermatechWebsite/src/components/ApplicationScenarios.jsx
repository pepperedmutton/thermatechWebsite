// src/components/ApplicationScenarios.jsx
import React from 'react';
// 我们将复用为 TechAdvantages 编写的 CSS 模块（如果已创建），
// 或者在 App.css 中复用 .advantage-item 样式（如果我们尚未模块化）。
// 为简单起见，我们先假设样式在 App.css 中。

export default function ApplicationScenarios() {
  return (
    // 我们复用 .tech-advantages-container 样式
    <div className="container tech-advantages-container">
      <h2>主要应用场景</h2>
      {/* <span className="subtitle">Application Scenarios</span> */}
      
      {/* 我们复用 .advantages-grid 样式 */}
      <div className="advantages-grid">
        
        {/* 场景 1: 电推力器 (您提出的) */}
        <div className="advantage-item">
          <h3>空间电推进</h3>
          <p>
            为霍尔推力器、离子推力器等提供精确的束流诊断、羽流分析和性能评估。
          </p>
        </div>
        
        {/* 场景 2: 等离子体刻蚀 (您提出的) */}
        <div className="advantage-item">
          <h3>半导体制造</h3>
          <p>
            用于等离子体刻蚀 (Etching) 和沉积 (Deposition) 过程的实时监控，确保工艺窗口的稳定性和一致性。
          </p>
        </div>
        
        {/* 场景 3: (我补充的) */}
        <div className="advantage-item">
          <h3>材料表面改性</h3>
          <p>
            应用于等离子体浸没注入、薄膜沉积和表面活化处理，精确控制处理效果。
          </p>
        </div>
        
        {/* 场景 4: (我补充的) */}
        <div className="advantage-item">
          <h3>基础科学研究</h3>
          <p>
            为实验室环境下的等离子体物理、聚变能、天体物理等基础研究提供高精度的诊断工具。
          </p>
        </div>
      </div>
    </div>
  );
}