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
      </Helmet>
      <section id="about" style={{ paddingTop: '80px' }}>
        <About />
      </section>
    </>
  );
}
