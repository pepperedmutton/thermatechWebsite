// src/pages/NewsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import News from './components/NewsList';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl } from '../../i18n/seo';
import SEOMeta from '../../i18n/SEOMeta';

export default function NewsPage() {
  const { t, locale } = useI18n();
  const canonical = buildCanonicalUrl(locale, '/news');

  return (
    <>
      <SEOMeta
        title={t('news.meta.title')}
        description={t('news.meta.description')}
        keywords={t('news.meta.keywords', '')}
        pathname="/news"
        image={`${canonical.split('/').slice(0, 3).join('/')}/og-news.jpg`}
        imageAlt={t('news.meta.title')}
      />
      <Helmet>
        {/* Schema.org Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": t('news.meta.title'),
            "description": t('news.meta.description'),
            "url": canonical,
            "publisher": {
              "@type": "Organization",
              "name": "星焓科技 (北京) 有限公司",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.starthermatech.com/logo.png"
              }
            },
            "inLanguage": locale
          })}
        </script>
      </Helmet>
      <section id="news" style={{ paddingTop: '80px' }}>
        <News />
      </section>
    </>
  );
}
