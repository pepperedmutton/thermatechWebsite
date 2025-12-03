import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NewsDetailPage.module.css';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';

export default function ElectricPropulsionPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/news/electric-propulsion');
  const canonical = buildCanonicalUrl(locale, '/news/electric-propulsion');

  const sections = [
    {
      title: t('news_electric_propulsion.section1.title'),
      paragraphs: [
        t('news_electric_propulsion.section1.p1'),
        t('news_electric_propulsion.section1.p2'),
        t('news_electric_propulsion.section1.p3'),
      ],
    },
    {
      title: t('news_electric_propulsion.section2.title'),
      paragraphs: [t('news_electric_propulsion.section2.p1')],
      comparison: {
        ion: {
          title: t('news_electric_propulsion.section2.ion.title'),
          items: [
            t('news_electric_propulsion.section2.ion.item1'),
            t('news_electric_propulsion.section2.ion.item2'),
            t('news_electric_propulsion.section2.ion.item3'),
            t('news_electric_propulsion.section2.ion.item4'),
          ],
        },
        hall: {
          title: t('news_electric_propulsion.section2.hall.title'),
          items: [
            t('news_electric_propulsion.section2.hall.item1'),
            t('news_electric_propulsion.section2.hall.item2'),
            t('news_electric_propulsion.section2.hall.item3'),
            t('news_electric_propulsion.section2.hall.item4'),
          ],
        },
      },
      footnote: t('news_electric_propulsion.section2.p2'),
    },
    {
      title: t('news_electric_propulsion.section3.title'),
      paragraphs: [t('news_electric_propulsion.section3.p1')],
      missions: [
        t('news_electric_propulsion.section3.mission1'),
        t('news_electric_propulsion.section3.mission2'),
        t('news_electric_propulsion.section3.mission3'),
        t('news_electric_propulsion.section3.mission4'),
        t('news_electric_propulsion.section3.mission5'),
      ],
      footnote: t('news_electric_propulsion.section3.p2'),
    },
    {
      title: t('news_electric_propulsion.section4.title'),
      paragraphs: [
        t('news_electric_propulsion.section4.p1'),
        t('news_electric_propulsion.section4.p2'),
        t('news_electric_propulsion.section4.p3'),
      ],
    },
    {
      title: t('news_electric_propulsion.section5.title'),
      paragraphs: [t('news_electric_propulsion.section5.p1')],
      challenges: [
        t('news_electric_propulsion.section5.challenge1'),
        t('news_electric_propulsion.section5.challenge2'),
        t('news_electric_propulsion.section5.challenge3'),
        t('news_electric_propulsion.section5.challenge4'),
        t('news_electric_propulsion.section5.challenge5'),
      ],
    },
    {
      title: t('news_electric_propulsion.section6.title'),
      paragraphs: [
        t('news_electric_propulsion.section6.p1'),
        t('news_electric_propulsion.section6.p2'),
        t('news_electric_propulsion.section6.p3'),
        t('news_electric_propulsion.section6.p4'),
      ],
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Helmet>
          <title>{t('news_electric_propulsion.meta.title')}</title>
          <meta
            name="description"
            content={t('news_electric_propulsion.meta.description')}
          />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link
            rel="alternate"
            href={buildCanonicalUrl('zh-CN', '/news/electric-propulsion')}
            hreflang="x-default"
          />
        </Helmet>
        <article className={styles.article}>
          <nav className={styles.breadcrumb}>
            <Link to={buildLocalizedPath(locale, '/')}>{t('news_electric_propulsion.breadcrumb.home')}</Link>
            <span className={styles.separator}>/</span>
            <Link to={buildLocalizedPath(locale, '/news')}>{t('news_electric_propulsion.breadcrumb.news')}</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{t('news_electric_propulsion.title')}</span>
          </nav>

          <header className={styles.header}>
            <span className={styles.category}>{t('news_electric_propulsion.category')}</span>
            <h1 className={styles.title}>{t('news_electric_propulsion.title')}</h1>
            <div className={styles.meta}>
              <span className={styles.date}>{t('news_electric_propulsion.date')}</span>
              <span className={styles.source}>{t('news_electric_propulsion.source')}</span>
            </div>
          </header>

          <div className={styles.summary}>
            <p>{t('news_electric_propulsion.summary')}</p>
          </div>

          <div className={styles.content}>
            {sections.map((section, idx) => (
              <section key={section.title + idx}>
                <h2>{section.title}</h2>
                {section.paragraphs && section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                {section.comparison && (
                  <div className={styles.comparison}>
                    <div className={styles.comparisonItem}>
                      <h3>{section.comparison.ion.title}</h3>
                      <ul>
                        {section.comparison.ion.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.comparisonItem}>
                      <h3>{section.comparison.hall.title}</h3>
                      <ul>
                        {section.comparison.hall.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section.footnote && <p>{section.footnote}</p>}

                {section.missions && (
                  <ul className={styles.missionList}>
                    {section.missions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.challenges && (
                  <ul className={styles.challengeList}>
                    {section.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className={styles.footer}>
            <div className={styles.sourceLink}>
              <p>{t('news_electric_propulsion.footer.note')}</p>
              <a 
                href="https://www.innovationnewsnetwork.com/electric-propulsion-the-engine-behind-the-new-era-of-space-exploration/59263/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.originalLink}
              >
                {t('news_electric_propulsion.footer.originalLink')}
              </a>
            </div>
            
            <Link to={buildLocalizedPath(locale, '/news')} className={styles.backLink}>
              {t('news_electric_propulsion.footer.back')}
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
