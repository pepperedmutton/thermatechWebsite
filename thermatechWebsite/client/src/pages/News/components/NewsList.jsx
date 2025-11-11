import React from 'react';
import styles from './News.module.css';

// SVG placeholder (data URL) shown when an article has no image yet
const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
    '<rect width="100%" height="100%" fill="#f5f5f7"/>' +
    '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="sans-serif" font-size="20">暂无图片</text>' +
  '</svg>'
);

// Placeholder articles — the user will replace these with real content later.
const sampleArticles = [
  { id: 1, title: '示例文章标题 1', image: null },
  { id: 2, title: '示例文章标题 2', image: null },
  { id: 3, title: '示例文章标题 3', image: null }
];

export default function NewsList() {
  const articles = sampleArticles;

  return (
    <div className={`container ${styles.newsContainer}`}>
      <h2 className={styles.title}>新闻资讯</h2>
      <p className={styles.lead}>这里会展示公司的新闻与文章，内容稍后添加。</p>

      <div className={styles.grid}>
        {articles.map(a => (
          <article key={a.id} className={styles.card}>
            <img
              src={a.image || placeholderImage}
              alt={a.title}
              className={styles.thumb}
            />
            <h3 className={styles.cardTitle}>{a.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
