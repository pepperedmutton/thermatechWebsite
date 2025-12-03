import React from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';

export default function NewsList() {
  const { t, locale } = useI18n();
  const placeholderText = t('news.placeholder.alt');
  const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <rect width="100%" height="100%" fill="#f5f5f7"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="sans-serif" font-size="20">${placeholderText}</text>
    </svg>`
  );

  const articles = [
    { 
      id: 1, 
      title: t('news.articles.electric.title'),
      date: t('news.articles.electric.date'),
      category: t('news.articles.electric.category'),
      summary: t('news.articles.electric.summary'),
      description: t('news.articles.electric.description'),
      image: null,
      internalLink: buildLocalizedPath(locale, '/news/electric-propulsion')
    }
  ];

  return (
    <div className={`container ${styles.newsContainer}`}>
      <h2 className={styles.title}>{t('news.list.title')}</h2>
      <p className={styles.lead}>{t('news.list.lead')}</p>

      <div className={styles.grid}>
        {articles.map(a => (
          <article key={a.id} className={styles.card}>
            <img
              src={a.image || placeholderImage}
              alt={a.title}
              className={styles.thumb}
            />
            <div className={styles.cardContent}>
              {a.category && <span className={styles.category}>{a.category}</span>}
              {a.date && <span className={styles.date}>{a.date}</span>}
              <h3 className={styles.cardTitle}>{a.title}</h3>
              {a.summary && <p className={styles.summary}>{a.summary}</p>}
              {a.description && <p className={styles.description}>{a.description}</p>}
              {a.internalLink && (
                <Link 
                  to={a.internalLink} 
                  className={styles.readMore}
                >
                  {t('news.readMore')}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
