// src/components/Collaboration.jsx
import React from 'react';

export default function Collaboration() {
  return (
    <div className="container collaboration-container">
      <h2>强强联合 研发创新</h2>
      <span className="subtitle">Strong Alliances for R&D Innovation</span>
      <p>
        我们与多所知名高校及科研院所建立了紧密的合作关系，
        共同推动低温等离子体技术的理论研究与工程应用。
        主要合作单位包括：
      </p>
      <ul className="collaborators-list">
        <li>北京航空航天大学</li>
        <li>北京理工大学</li>
        <li>中国科学院等离子体物理研究所</li>
        {/* 可以添加更多合作单位 */}
      </ul>
    </div>
  );
}