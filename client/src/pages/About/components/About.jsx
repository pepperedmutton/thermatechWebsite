// src/components/About.jsx
import React from 'react';

export default function About() {
  return (
    <div className="container about-container">
      <h2>关于我们 <span className="subtitle">ABOUT US</span></h2>
      <div className="about-intro">
        <p>
          星焓科技（北京）有限公司是一家商业航天公司，聚焦低温等离子体诊断与电推进相关技术的研发、生产、销售与服务。
          我们致力于提供优质可靠的等离子体诊断与测量解决方案，打造了一支兼具工程落地与创新能力的团队，
          覆盖技术研发、系统工程、市场与应用咨询等多领域，并与北航、北理、中科院等高校院所保持紧密合作。
        </p>
        <p>
          团队核心成员拥有空间电推进、等离子体诊断、光谱测量、仪器控制与算法的丰富经验，
          可提供从前期需求澄清、方案设计，到设备交付、标定培训、长期运维的全流程支持，
          让客户用得上、用得稳、用得放心。
        </p>
      </div>

      <div className="about-metrics">
        <span className="about-pill">低温等离子体诊断全链路交付</span>
        <span className="about-pill">覆盖接触式 / 非接触式测量</span>
        <span className="about-pill">电推进试验与测量服务</span>
        <span className="about-pill">航天与等离子体诊断实战经验</span>
        <span className="about-pill">项目交付与快速售后响应</span>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>技术与产品</h3>
          <ul>
            <li>朗缪尔、法拉第、ExB、RPA 等探针系统</li>
            <li>光学诊断（OES / LIF / 汤姆逊散射）方案与软件</li>
            <li>等离子源、微推力测量、真空与电源配套模块</li>
            <li>电推进地面试验支持与推进器性能测量方案</li>
            <li>数据采集、自动标定与后处理算法集成</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>行业经验</h3>
          <ul>
            <li>服务航天、电推进、材料表面处理、半导体工艺等场景</li>
            <li>为多所顶尖高校与科研院所定制诊断平台</li>
            <li>参与多型推进器标定、羽流测量与参数反演项目</li>
            <li>提供现场/远程培训与联合实验支持</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>交付与服务</h3>
          <ul>
            <li>交钥匙系统：硬件、软件、标定、培训一体化交付</li>
            <li>快速响应：售后与技术支持直达研发团队</li>
            <li>深度定制：按工况优化材料、结构与算法</li>
            <li>长期陪伴：提供扩展升级、运维与数据分析服务</li>
          </ul>
        </div>
      </div>

      <div className="about-cta">
        <h3>我们的使命</h3>
        <p>
          用稳定、可信赖的诊断测量能力，帮助科研与工程团队更高效地认知、控制与应用等离子体，
          推动先进推进与工艺技术走向更远的星空与更广的产业。
        </p>
        <a href="#contact" className="btn-primary">联系星焓科技</a>
      </div>
    </div>
  );
}
