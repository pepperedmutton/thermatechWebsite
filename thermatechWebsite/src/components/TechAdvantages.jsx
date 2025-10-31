// src/components/TechAdvantages.jsx
import React from 'react';

export default function TechAdvantages() {
  return (
    <div className="container tech-advantages-container">
      <h2>我们的技术优势</h2>
      <span className="subtitle">Our Technological Strengths</span>
      <div className="advantages-grid">
        <div className="advantage-item">
          <h3>高精度诊断</h3>
          <p>精确测量等离子体参数，确保实验与生产可靠性。</p>
        </div>
        <div className="advantage-item">
          <h3>定制化解决方案</h3>
          <p>根据客户需求，提供专业的非标设备定制。</p>
        </div>
        <div className="advantage-item">
          <h3>持续创新</h3>
          <p>紧跟行业发展前沿，不断推出新产品与技术。</p>
        </div>
        <div className="advantage-item">
          <h3>稳定可靠</h3>
          <p>产品经过严格测试，运行稳定，维护简便。</p>
        </div>
      </div>
    </div>
  );
}