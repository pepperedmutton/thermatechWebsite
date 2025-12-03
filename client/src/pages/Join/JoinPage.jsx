// src/pages/JoinPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Join from './components/Join';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../i18n/seo';

export default function JoinPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/join');
  const canonical = buildCanonicalUrl(locale, '/join');

  return (
    <>
      <Helmet>
        <title>{t('join.meta.title')}</title>
        <meta name="description" content={t('join.meta.description')} />
        <meta name="keywords" content={t('join.meta.keywords', '')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/join')} hreflang="x-default" />
      </Helmet>
      <section id="join" style={{ paddingTop: '80px' }}>
        <Join />
      </section>
    </>
  );
}
