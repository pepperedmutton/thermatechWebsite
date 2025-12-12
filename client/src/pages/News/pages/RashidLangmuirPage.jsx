import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NewsDetailPage.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import rashidImage from '../../../assets/news/Rashid/Rashid-1.webp';
import rashidBody from '../../../assets/news/Rashid/Rashid-1.txt?raw';

export default function RashidLangmuirPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/news/rashid-langmuir-probe');
  const canonical = buildCanonicalUrl(locale, '/news/rashid-langmuir-probe');
  const originalLink = t('news_rashid_langmuir.footer.originalLink', '');
  const originalHref = t('news_rashid_langmuir.footer.originalHref', '');

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('news_rashid_langmuir.title'),
    "description": t('news_rashid_langmuir.summary'),
    "author": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司"
    },
    "publisher": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.starthermatech.com/logo.png"
      }
    },
    "datePublished": "2024-12-08",
    "dateModified": "2024-12-08",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "articleSection": t('news_rashid_langmuir.category'),
    "inLanguage": locale,
    "keywords": "Langmuir probe, lunar plasma, Rashid-1, photoelectron sheath"
  };

  const paragraphs = rashidBody
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Helmet>
          <title>{t('news_rashid_langmuir.meta.title')}</title>
          <meta
            name="description"
            content={t('news_rashid_langmuir.meta.description')}
          />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link
            rel="alternate"
            href={buildCanonicalUrl('zh-CN', '/news/rashid-langmuir-probe')}
            hreflang="x-default"
          />
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
        </Helmet>

        <article className={styles.article}>
          <nav className={styles.breadcrumb}>
            <Link to={buildLocalizedPath(locale, '/')}>{t('news_rashid_langmuir.breadcrumb.home')}</Link>
            <span className={styles.separator}>/</span>
            <Link to={buildLocalizedPath(locale, '/news')}>{t('news_rashid_langmuir.breadcrumb.news')}</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{t('news_rashid_langmuir.title')}</span>
          </nav>

          <header className={styles.header}>
            <span className={styles.category}>{t('news_rashid_langmuir.category')}</span>
            <h1 className={styles.title}>{t('news_rashid_langmuir.title')}</h1>
            <div className={styles.meta}>
              <span className={styles.date}>{t('news_rashid_langmuir.date')}</span>
              <span className={styles.source}>{t('news_rashid_langmuir.source')}</span>
            </div>
          </header>

          <div className={styles.summary}>
            <p>{t('news_rashid_langmuir.summary')}</p>
          </div>

          <div className={styles.hero}>
            <img
              src={rashidImage}
              alt={t('news_rashid_langmuir.hero.alt')}
              className={styles.heroImage}
            />
            <p className={styles.heroCaption}>{t('news_rashid_langmuir.hero.caption')}</p>
          </div>

          <div className={styles.content}>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <footer className={styles.footer}>
            <div className={styles.sourceLink}>
              <p>{t('news_rashid_langmuir.footer.note')}</p>
              {originalHref && originalLink && (
                <a
                  href={originalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.originalLink}
                >
                  {originalLink}
                </a>
              )}
            </div>

            <Link to={buildLocalizedPath(locale, '/news')} className={styles.backLink}>
              {t('news_rashid_langmuir.footer.back')}
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
