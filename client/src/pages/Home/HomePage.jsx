// src/pages/HomePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './components/Home'; // 顶部图像横幅

// 导入组件
import CoreBusiness from './components/CoreBusiness'; // 核心业务介绍
import ApplicationScenarios from './components/ApplicationScenarios'; // <-- 新增
import Parameters from './components/Parameters'; // 参数表
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl } from '../../i18n/seo';
import SEOMeta from '../../i18n/SEOMeta';

export default function HomePage() {
  const { t, locale } = useI18n();
  const canonical = buildCanonicalUrl(locale, '/');

  return (
    <>
      <SEOMeta
        title={t('home.meta.title')}
        description={t('home.meta.description')}
        keywords={t('home.meta.keywords', '')}
        pathname="/"
        image={`${canonical.split('/').slice(0, 3).join('/')}/og-home.jpg`}
        imageAlt="星焓科技 - 低温等离子体诊断与空间电推进技术服务商"
      />
      <Helmet>
        {/* Schema.org Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "星焓科技",
            "alternateName": "STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD",
            "url": "https://www.starthermatech.com",
            "logo": "https://www.starthermatech.com/logo.png",
            "description": t('home.meta.description'),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "学院路35号世宁大厦14层1408-003",
              "addressLocality": "海淀区",
              "addressRegion": "北京市",
              "postalCode": "100083",
              "addressCountry": "CN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+86-18519685090",
              "email": "bd@starthermatech.com",
              "contactType": "Sales"
            },
            "sameAs": [
              "https://www.starthermatech.com"
            ]
          })}
        </script>
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
