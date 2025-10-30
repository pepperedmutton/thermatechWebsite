// src/components/About.jsx
import React from 'react';

export default function About() {
  return (
    <div className="container about-container">
      <h2>关于我们 <span className="subtitle">ABOUT US</span></h2>
      <p>
        星焓科技（北京）有限公司是一家以低温等离子体技术研发、生产、销售、服务为一体的高科技企业。
        我们致力于提供优质可靠的低温等离子体诊断与测量的专业化解决方案。
        我们打造了一支极具专业经验和创造力的团队，人才涵盖了技术研发、市场营销、顾问咨询等多领域，
        并与北航、北理、中科院等高校院所的专业实验室有合作，综合实力强劲。
        我们旨在推动低温等离子体技术及其应用改善人类的生活方式和品质。
      </p>
      <a href="#contact" className="btn-primary">了解更多</a>
    </div>
  );
}