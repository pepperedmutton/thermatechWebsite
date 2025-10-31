// src/pages/HomePage.jsx
import React from 'react';
import Home from '../components/Home'; // 顶部图像横幅

// 导入组件
import CoreBusiness from '../components/CoreBusiness'; // 核心业务介绍
// import TechAdvantages from '../components/TechAdvantages'; // <-- 已移除
import ApplicationScenarios from '../components/ApplicationScenarios'; // <-- 新增
import Collaboration from '../components/Collaboration'; // 合作院校

export default function HomePage() {
  return (
    <>
      {/* 1. 顶部视觉横幅 */}
      <section id="home">
        <Home />
      </section>

      {/* 2. 核心业务介绍部分 */}
      <section id="core-business">
        <CoreBusiness />
      </section>

      {/* 3. 应用场景部分 (替换了技术优势) */}
      <section id="app-scenarios">
        <ApplicationScenarios />
      </section>

      {/* 4. 合作与研发实力部分 */}
      <section id="collaboration">
        <Collaboration />
      </section>
    </>
  );
}