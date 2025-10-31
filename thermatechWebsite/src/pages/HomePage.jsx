// src/pages/HomePage.jsx
import React from 'react';
import Home from '../components/Home'; // 顶部图像横幅

// 导入新增的或调整用途的组件
import CoreBusiness from '../components/CoreBusiness'; // 核心业务介绍
import TechAdvantages from '../components/TechAdvantages'; // 技术优势
import Collaboration from '../components/Collaboration'; // 合作院校

export default function HomePage() {
  return (
    <>
      {/* 1. 顶部视觉横幅 */}
      <section id="home">
        {/* 这里应该使用 <Home /> 组件, 而不是 "none" */}
        <Home /> 
      </section>

      {/* 2. 核心业务介绍部分 */}
      <section id="core-business">
        <CoreBusiness />
      </section>

      {/* 3. 技术优势部分 */}
      <section id="tech-advantages">
        <TechAdvantages />
      </section>

      {/* 4. 合作与研发实力部分 */}
      <section id="collaboration">
        <Collaboration />
      </section>
    </>
  );
}