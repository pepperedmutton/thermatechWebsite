// src/pages/JoinPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Join from './components/Join';

export default function JoinPage() {
  return (
    <>
      <Helmet>
        <title>招贤纳士｜等离子体工程师招聘 | 星焓科技</title>
        <meta
          name="description"
          content="星焓科技招募等离子体工程师，参与低温等离子体诊断与电推进测试的方案设计、实验验证、数据分析与项目交付支持。简历投递 bd@starthermatech.com。"
        />
        <meta
          name="keywords"
          content="招聘,等离子体工程师,电推进,诊断测试,研发岗位"
        />
      </Helmet>
      <section id="join" style={{ paddingTop: '80px' }}>
        <Join />
      </section>
    </>
  );
}
