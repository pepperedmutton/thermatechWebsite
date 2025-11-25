// src/pages/NewsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import News from './components/NewsList';

export default function NewsPage() {
  return (
    <>
      <Helmet>
        <title>新闻资讯｜航天与等离子体行业动态 | 星焓科技</title>
        <meta
          name="description"
          content="关注电推进、等离子体诊断与航天技术的行业洞见与公司新闻，包含电推进专题文章与产品/技术更新。"
        />
        <meta
          name="keywords"
          content="新闻资讯,电推进,等离子体诊断,航天技术,行业动态"
        />
      </Helmet>
      <section id="news" style={{ paddingTop: '80px' }}>
        <News />
      </section>
    </>
  );
}
