// src/pages/HomePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './components/Home'; // 顶部图像横幅

// 导入组件
import CoreBusiness from './components/CoreBusiness'; // 核心业务介绍
import ApplicationScenarios from './components/ApplicationScenarios'; // <-- 新增
import Parameters from './components/Parameters'; // 参数表

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>首页｜低温等离子体诊断与电推进方案 | 星焓科技</title>
        <meta
          name="description"
          content="星焓科技提供朗缪尔/法拉第/ExB 探针等等离子体诊断方案，以及光学诊断、等离子源与微推力测量系统，服务航天与科研工程。"
        />
        <meta
          name="keywords"
          content="星焓科技,低温等离子体,朗缪尔探针,法拉第探针,电推进,等离子源,微推力测量"
        />
      </Helmet>
      {/* 1. 顶部视觉横幅 */}
      <section id="home">
        <Home />
      </section>

      {/* 2. 核心业务介绍部分 */}
      <section id="core-business">
        <CoreBusiness />
      </section>

      {/* 2.5 参数表 */}
      <section id="parameters">
        <Parameters />
      </section>

      {/* 3. 应用场景部分 (替换了技术优势) */}
      <section id="app-scenarios">
        <ApplicationScenarios />
      </section>
    </>
  );
}
