// src/pages/AboutPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from './components/About';

export default function AboutPage() {
  return (
    // 添加内边距，使其不会被页眉遮挡
    <>
      <Helmet>
        <title>关于我们 | 星焓科技</title>
        <meta
          name="description"
          content="星焓科技是一家专注低温等离子体诊断与测量方案的高科技公司，团队来自北航等科研院所，提供研发、生产、销售与技术服务的一体化支持。"
        />
        <meta
          name="keywords"
          content="星焓科技,低温等离子体,诊断方案,北航团队,技术服务"
        />
      </Helmet>
      <section id="about" style={{ paddingTop: '80px' }}>
        <About />
      </section>
    </>
  );
}
