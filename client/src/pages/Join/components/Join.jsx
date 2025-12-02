// src/components/Join.jsx
import React from 'react';

export default function Join() {
  return (
    <div className="container join-container">
      <h2>招贤纳士</h2>
      <p>我们正在寻找有才华的专业人士加入我们的团队。如果您对等离子体物理充满热情，请将您的简历发送给我们。</p>

      <div className="job-list">
        {/* 岗位一：等离子体工程师 */}
        <div className="job-card">
          <div className="job-header">
            <h3>（产品研发）等离子体工程师</h3>
            <span className="job-salary">20k-28k·13薪</span>
          </div>
          <p className="job-location">📍 北京昌平区硕方大厦</p>
          <p className="job-tagline">根据需求负责公司等离子体产品的设计优化、测试、系统集成。</p>
          
          <div className="job-section">
            <h4>工作内容：</h4>
            <ul>
              <li>根据需求负责公司等离子体产品的设计优化、测试、系统集成；</li>
              <li>完成相关技术文档的编制及维护；</li>
              <li>与软、硬件等岗位人员及时沟通，解决新产品研发中的技术问题。</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>招聘要求：</h4>
            <ul>
              <li>硕士及以上学历，低温等离子体物理 / 真空放电 / 电推进 / 空心阴极材料等相关专业；</li>
              <li>具备3年及以上工作经验（硕士期间工作经历等同）；</li>
              <li>熟悉低温等离子体 / 真空放电理论及应用；</li>
              <li>熟练使用等离子体仿真软件；</li>
              <li>具有等离子体物理技术、诊断或工程相关项目研究经历。</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>优先项：</h4>
            <ul>
              <li>熟悉或精通等离子体推进某类应用者优先；</li>
              <li>熟悉或精通等离子体测试探针研发 / 应用者优先；</li>
              <li>具有相关研究成果者优先；</li>
              <li>具有航空航天 / 等离子体应用等行业从业相关经验者优先。</li>
            </ul>
          </div>

          <p className="job-keywords">
            <strong>关键词：</strong>低温等离子体 · 真空放电 · 电推进 · 空心阴极 · 等离子体探针
          </p>

          <p className="job-cta">
            简历请发送至 <a href="mailto:hr@starthermatech.com">hr@starthermatech.com</a>，备注"等离子体工程师-姓名"。
          </p>
        </div>

        {/* 岗位二：硬件工程师 */}
        <div className="job-card">
          <div className="job-header">
            <h3>（传感器研发）硬件工程师</h3>
            <span className="job-salary">18k-25k·13薪</span>
          </div>
          <p className="job-location">📍 北京昌平区硕方大厦</p>
          <p className="job-tagline">负责公司等离子体测量传感器产品的硬件电路设计优化、元器件选型、系统集成。</p>
          
          <div className="job-section">
            <h4>工作内容：</h4>
            <ul>
              <li>负责公司等离子体测量传感器产品的硬件电路设计优化、元器件选型、系统集成；</li>
              <li>负责公司其他测量装置的硬件电路设计优化；</li>
              <li>完成相关技术文档的编制及维护；</li>
              <li>负责产品电气部分的安装及调试；</li>
              <li>与机械结构设计、上位机软件等岗位人员配合，完成新产品研发。</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>招聘要求：</h4>
            <ul>
              <li>本科及以上学历（或同等能力优秀人才），电子电路 / 电气自动化 / 测控技术与仪器等相关专业；</li>
              <li>具备3年及以上工作经验（硕士期间工作经历等同）；</li>
              <li>熟悉模电、数电调试及应用，熟悉弱电理论及应用；</li>
              <li>熟练使用 eplan 等电路设计软件；</li>
              <li>熟悉电子电路的设计、选型与集成，具备独立设计电路能力；</li>
              <li>具备扎实的硬件电路设计基础与丰富的硬件设计经验。</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>优先项：</h4>
            <ul>
              <li>熟悉以太网、RS232/485、CAN、USB 等常见通讯协议者优先；</li>
              <li>熟悉 PLC/Labview 等上位系统者优先；</li>
              <li>等离子体相关专业者优先；</li>
              <li>熟悉或精通某类传感器研发 / 应用者优先；</li>
              <li>具有真空 / 等离子体 / 射频器件相关经验者优先；</li>
              <li>具有航空航天 / 军工等行业从业相关经验者优先。</li>
            </ul>
          </div>

          <p className="job-keywords">
            <strong>关键词：</strong>硬件工程师 · 硬件设计 · 电路设计 · 航空航天
          </p>

          <p className="job-cta">
            简历请发送至 <a href="mailto:hr@starthermatech.com">hr@starthermatech.com</a>，备注"硬件工程师-姓名"。
          </p>
        </div>
      </div>

      <a href="mailto:bd@starthermatech.com" className="btn-primary">发送简历</a>
    </div>
  );
}
