// src/pages/ContactPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from './components/Contact';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl } from '../../i18n/seo';
import SEOMeta from '../../i18n/SEOMeta';

export default function ContactPage() {
  const { t, locale } = useI18n();
  const canonical = buildCanonicalUrl(locale, '/contact');

  return (
    <>
      <SEOMeta
        title={t('contact.meta.title')}
        description={t('contact.meta.description')}
        keywords={t('contact.meta.keywords', '')}
        pathname="/contact"
        image={`${canonical.split('/').slice(0, 3).join('/')}/og-contact.jpg`}
        imageAlt={t('contact.meta.title')}
      />
      <Helmet>
      </Helmet>
      <section id="contact" style={{ paddingTop: '80px' }}>
        <Contact />
      </section>
    </>
  );
}
