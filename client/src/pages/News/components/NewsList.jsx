import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';
import rashidImage from '../../../assets/news/Rashid/Rashid-1.webp';

export default function NewsList() {
  const { t, locale } = useI18n();
  const placeholderText = t('news.placeholder.alt');
  const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <rect width="100%" height="100%" fill="#f5f5f7"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="sans-serif" font-size="20">${placeholderText}</text>
    </svg>`
  );

  const categoryFilters = [
    { key: 'all', label: t('news.filters.all') },
    { key: 'products', label: t('news.filters.products') },
    { key: 'applications', label: t('news.filters.applications') },
    { key: 'events', label: t('news.filters.events') },
    { key: 'insights', label: t('news.filters.insights') },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    const articles = [
      { 
        id: 'rashid', 
        title: t('news.articles.rashid.title'),
        date: t('news.articles.rashid.date'),
        category: 'applications',
        categoryLabel: t('news.articles.rashid.category'),
        tag: t('news.tags.application'),
        summary: t('news.articles.rashid.summary'),
        description: t('news.articles.rashid.description'),
        image: rashidImage,
        internalLink: buildLocalizedPath(locale, '/news/rashid-langmuir-probe'),
        featured: true,
      },
      { 
        id: 'electric', 
        title: t('news.articles.electric.title'),
        date: t('news.articles.electric.date'),
        category: 'insights',
        categoryLabel: t('news.articles.electric.category'),
        tag: t('news.tags.insight'),
        summary: t('news.articles.electric.summary'),
        description: t('news.articles.electric.description'),
        image: null,
        internalLink: buildLocalizedPath(locale, '/news/electric-propulsion'),
        featured: false,
      }
    ];
    
    return articles.filter((a) => {
      if (activeFilter === 'all') return true;
      return a.category === activeFilter;
    });
  }, [t, locale, activeFilter]);

  return (
    <div className={`container ${styles.newsContainer}`}>
      <h2 className={styles.title}>{t('news.list.title')}</h2>
      <p className={styles.lead}>{t('news.list.lead')}</p>

      <div className={styles.filters}>
        {categoryFilters.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.filterBtn} ${activeFilter === item.key ? styles.filterActive : ''}`}
            onClick={() => setActiveFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(a => (
          <article key={a.id} className={styles.card}>
            <img
              src={a.image || placeholderImage}
              alt={a.title}
              className={styles.thumb}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                {a.tag && <span className={styles.tag}>{a.tag}</span>}
                {a.date && <span className={styles.date}>{a.date}</span>}
              </div>
              {a.categoryLabel && <span className={styles.category}>{a.categoryLabel}</span>}
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
