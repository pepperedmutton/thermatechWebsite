// src/components/Join.jsx
import React from 'react';

export default function Join() {
  return (
    <div className="container join-container">
      <h2>招贤纳士 <span className="subtitle">JOIN US</span></h2>
      <p>我们正在寻找有才华的专业人士加入我们的团队。如果您对等离子体物理充满热情，请将您的简历发送给我们。</p>
      <a href="mailto:bd@starthermatech.com" className="btn-primary">发送简历</a>
    </div>
  );
}