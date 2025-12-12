// src/pages/NewsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import News from './components/NewsList';
import { useI18n } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../i18n/seo';

export default function NewsPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/news');
  const canonical = buildCanonicalUrl(locale, '/news');

  return (
    <>
      <Helmet>
        <title>{t('news.meta.title')}</title>
        <meta
          name="description"
          content={t('news.meta.description')}
        />
        <meta
          name="keywords"
          content={t('news.meta.keywords', '')}
        />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/news')} hreflang="x-default" />
        
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
