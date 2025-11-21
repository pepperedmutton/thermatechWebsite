// src/components/Join.jsx
import React from 'react';

export default function Join() {
  return (
    <div className="container join-container">
      <h2>招贤纳士 <span className="subtitle">JOIN US</span></h2>
      <p>我们正在寻找有才华的专业人士加入我们的团队。如果您对等离子体物理充满热情，请将您的简历发送给我们。</p>

      <div className="job-list">
        <div className="job-card">
          <div className="job-header">
            <h3>等离子体工程师</h3>
            <span className="job-salary">20k-28k</span>
          </div>
          <p className="job-tagline">围绕低温等离子体诊断与电推进测试，提供研发、实验和现场支持。</p>
          <ul>
            <li>参与等离子体诊断/测量产品的方案设计、实验验证与迭代。</li>
            <li>结合客户需求完成实验设计、数据分析与技术报告输出。</li>
            <li>支持项目交付，包括安装调试、培训及现场技术支持。</li>
          </ul>
          <p className="job-cta">
            简历请发送至 <a href="mailto:bd@starthermatech.com">bd@starthermatech.com</a>，备注“等离子体工程师-姓名”。
          </p>
        </div>
      </div>

      <a href="mailto:bd@starthermatech.com" className="btn-primary">发送简历</a>
    </div>
  );
}
