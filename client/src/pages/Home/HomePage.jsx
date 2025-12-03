// src/pages/HomePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './components/Home'; // 顶部图像横幅

// 导入组件
import CoreBusiness from './components/CoreBusiness'; // 核心业务介绍
import ApplicationScenarios from './components/ApplicationScenarios'; // <-- 新增
import Parameters from './components/Parameters'; // 参数表
import { useI18n } from '../../i18n/i18n';
import { buildHreflangLinks, buildCanonicalUrl } from '../../i18n/seo';

export default function HomePage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/');
  const canonical = buildCanonicalUrl(locale, '/');

  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords', '')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link
            key={item.hreflang}
            rel="alternate"
            href={item.href}
            hreflang={item.hreflang}
          />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/')} hreflang="x-default" />
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
