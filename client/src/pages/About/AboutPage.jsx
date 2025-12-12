// src/pages/AboutPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from './components/About';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../i18n/seo';

export default function AboutPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/about');
  const canonical = buildCanonicalUrl(locale, '/about');

  return (
    <>
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
        <meta name="keywords" content={t('about.meta.keywords', '')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/about')} hreflang="x-default" />
        
        {/* Schema.org Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "星焓科技",
            "alternateName": "STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD",
            "url": "https://www.starthermatech.com",
            "logo": "https://www.starthermatech.com/logo.png",
            "description": t('about.meta.description'),
            "foundingDate": "2023",
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
              "contactType": "Sales",
              "areaServed": "CN",
              "availableLanguage": ["zh-CN", "en", "ja", "ru"]
            },
            "knowsAbout": [
              "等离子体诊断",
              "电推进技术",
              "朗缪尔探针",
              "霍尔推力器",
              "离子源"
            ]
          })}
        </script>
      </Helmet>
      <section id="about" style={{ paddingTop: '80px' }}>
        <About />
      </section>
    </>
  );
}
