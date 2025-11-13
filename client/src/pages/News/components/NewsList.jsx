import React from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';

// SVG placeholder (data URL) shown when an article has no image yet
const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
    '<rect width="100%" height="100%" fill="#f5f5f7"/>' +
    '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="sans-serif" font-size="20">暂无图片</text>' +
  '</svg>'
);

// News articles
const sampleArticles = [
  { 
    id: 1, 
    title: '电推进：开启太空探索新时代的引擎', 
    date: '2025年6月26日',
    category: '航天技术',
    summary: '电推进技术正在通过离子推进器和霍尔效应推进器将电能转化为推力，从而改变太空探索。',
    description: '电推进技术代表着太空探索的变革性进步。这种创新方法通过静电或电磁场加速推进剂，将电能转化为机械能。其中，离子推进器因其高效率和更高的比冲而脱颖而出，特别适合长期任务。截至2019年，已有超过500艘航天器成功采用电推进技术。NASA的黎明号（Dawn）航天器和欧空局的SMART-1任务都展示了这项技术的能力。电推进系统通过提供持续的低推力加速，使航天器能够执行复杂的轨道机动并前往火星及更远的目的地。',
    image: null,
    internalLink: '/news/electric-propulsion'
  },
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
                  阅读全文 →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
