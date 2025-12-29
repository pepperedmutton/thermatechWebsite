import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NewsDetailPage.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';
import { buildCanonicalUrl } from '../../../i18n/seo';
import SEOMeta from '../../../i18n/SEOMeta';

export default function LongMarch12APage() {
  const { t, locale } = useI18n();
  const canonical = buildCanonicalUrl(locale, '/news/long-march-12a-reusable');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <SEOMeta
          title={t('news_long_march_12a.meta.title')}
          description={t('news_long_march_12a.meta.description')}
          pathname="/news/long-march-12a-reusable"
          type="article"
          article={{
            publishedTime: "2025-12-23T00:00:00Z",
            modifiedTime: "2025-12-23T00:00:00Z",
            author: "星焓科技编辑部",
            section: t('news_long_march_12a.category'),
            tags: ['长征12A', '可重复使用火箭', '航天技术', '中国航天']
          }}
        />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": t('news_long_march_12a.title'),
              "description": t('news_long_march_12a.summary'),
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
              "datePublished": "2025-12-23",
              "dateModified": "2025-12-23",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonical
              },
              "articleSection": t('news_long_march_12a.category'),
              "inLanguage": locale,
              "keywords": "长征12A, 可重复使用火箭, 航天技术, 中国航天"
            })}
          </script>
        </Helmet>

        <article className={styles.article}>
          <nav className={styles.breadcrumb}>
            <Link to={buildLocalizedPath(locale, '/')}>{t('news_long_march_12a.breadcrumb.home')}</Link>
            <span className={styles.separator}>/</span>
            <Link to={buildLocalizedPath(locale, '/news')}>{t('news_long_march_12a.breadcrumb.news')}</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{t('news_long_march_12a.title')}</span>
          </nav>

          <header className={styles.header}>
            <span className={styles.category}>{t('news_long_march_12a.category')}</span>
            <h1 className={styles.title}>{t('news_long_march_12a.title')}</h1>
            <div className={styles.meta}>
              <span className={styles.date}>{t('news_long_march_12a.date')}</span>
              <span className={styles.source}>{t('news_long_march_12a.source')}</span>
            </div>
          </header>

          <div className={styles.summary}>
            <p>{t('news_long_march_12a.summary')}</p>
          </div>

          <div className={styles.content}>
            <section>
              <h2>{t('news_long_march_12a.section1.title')}</h2>
              <p>{t('news_long_march_12a.section1.p1')}</p>
              <p>{t('news_long_march_12a.section1.p2')}</p>
            </section>

            <section>
              <h2>{t('news_long_march_12a.section2.title')}</h2>
              <p>{t('news_long_march_12a.section2.p1')}</p>
              <p>{t('news_long_march_12a.section2.p2')}</p>
            </section>

            <section>
              <h2>{t('news_long_march_12a.section3.title')}</h2>
              <p>{t('news_long_march_12a.section3.p1')}</p>
              <p>{t('news_long_march_12a.section3.p2')}</p>
            </section>

            <section>
              <h2>{t('news_long_march_12a.section4.title')}</h2>
              <p>{t('news_long_march_12a.section4.p1')}</p>
              <p>{t('news_long_march_12a.section4.p2')}</p>
            </section>
          </div>

          <footer className={styles.footer}>
            <p className={styles.reference}>
              {t('news_long_march_12a.footer.originalSource')}:
              <a
                href="https://spacenews.com/long-march-12a-reaches-orbit-in-first-reusable-launch-attempt-but-landing-fails/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SpaceNews
              </a>
            </p>
          </footer>

          <div className={styles.backLink}>
            <Link to={buildLocalizedPath(locale, '/news')}>
              ← {t('news_long_march_12a.backToNews')}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
