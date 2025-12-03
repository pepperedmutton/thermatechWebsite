// src/pages/ContactPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from './components/Contact';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../i18n/seo';

export default function ContactPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/contact');
  const canonical = buildCanonicalUrl(locale, '/contact');

  return (
    <>
      <Helmet>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
        <meta name="keywords" content={t('contact.meta.keywords', '')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/contact')} hreflang="x-default" />
      </Helmet>
      <section id="contact" style={{ paddingTop: '80px' }}>
        <Contact />
      </section>
    </>
  );
}
