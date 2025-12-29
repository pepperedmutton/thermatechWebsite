// src/pages/JoinPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Join from './components/Join';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl } from '../../i18n/seo';
import SEOMeta from '../../i18n/SEOMeta';

export default function JoinPage() {
  const { t, locale } = useI18n();
  const canonical = buildCanonicalUrl(locale, '/join');

  return (
    <>
      <SEOMeta
        title={t('join.meta.title')}
        description={t('join.meta.description')}
        keywords={t('join.meta.keywords', '')}
        pathname="/join"
        image={`${canonical.split('/').slice(0, 3).join('/')}/og-join.jpg`}
        imageAlt={t('join.meta.title')}
      />
      <Helmet>
      </Helmet>
      <section id="join" style={{ paddingTop: '80px' }}>
        <Join />
      </section>
    </>
  );
}
