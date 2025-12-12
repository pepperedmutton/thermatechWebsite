import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './SitemapPage.module.css';
import { useI18n, buildLocalizedPath } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks, getOgLocale, getOgLocaleAlternates } from '../../i18n/seo';

export default function SitemapPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/sitemap');
  const canonical = buildCanonicalUrl(locale, '/sitemap');
  const ogLocale = getOgLocale(locale);
  const ogAlternates = getOgLocaleAlternates(locale);

  const sections = [
    {
      title: t('sitemap.sections.main.title'),
      links: [
        { to: '/', label: t('sitemap.sections.main.home') },
        { to: '/about', label: t('sitemap.sections.main.about') },
        { to: '/products', label: t('sitemap.sections.main.products') },
        { to: '/news', label: t('sitemap.sections.main.news') },
        { to: '/join', label: t('sitemap.sections.main.join') },
        { to: '/contact', label: t('sitemap.sections.main.contact') },
      ],
    },
    {
      title: t('sitemap.sections.contact.title'),
      links: [
        { to: '/products/langmuir', label: t('sitemap.sections.contact.langmuir.label'), desc: t('sitemap.sections.contact.langmuir.desc') },
        { to: '/products/faraday', label: t('sitemap.sections.contact.faraday.label'), desc: t('sitemap.sections.contact.faraday.desc') },
        { to: '/products/exb', label: t('sitemap.sections.contact.exb.label'), desc: t('sitemap.sections.contact.exb.desc') },
        { to: '/products/rpa', label: t('sitemap.sections.contact.rpa.label'), desc: t('sitemap.sections.contact.rpa.desc') },
      ],
    },
    {
      title: t('sitemap.sections.optical.title'),
      links: [
        { to: '/products/oes', label: t('sitemap.sections.optical.oes.label'), desc: t('sitemap.sections.optical.oes.desc') },
        { to: '/products/lif', label: t('sitemap.sections.optical.lif.label'), desc: t('sitemap.sections.optical.lif.desc') },
        { to: '/products/thomson', label: t('sitemap.sections.optical.thomson.label'), desc: t('sitemap.sections.optical.thomson.desc') },
      ],
    },
    {
      title: t('sitemap.sections.ion.title'),
      links: [
        { to: '/products/kaufman', label: t('sitemap.sections.ion.kaufman.label'), desc: t('sitemap.sections.ion.kaufman.desc') },
        { to: '/products/hall-source', label: t('sitemap.sections.ion.hall.label'), desc: t('sitemap.sections.ion.hall.desc') },
        { to: '/products/rfis', label: t('sitemap.sections.ion.rfis.label'), desc: t('sitemap.sections.ion.rfis.desc') },
        { to: '/products/cathode-arc', label: t('sitemap.sections.ion.cathode.label'), desc: t('sitemap.sections.ion.cathode.desc') },
      ],
    },
    {
      title: t('sitemap.sections.thrust.title'),
      links: [
        { to: '/products/torsion-balance', label: t('sitemap.sections.thrust.torsion.label'), desc: t('sitemap.sections.thrust.torsion.desc') },
        { to: '/products/em-balance', label: t('sitemap.sections.thrust.em.label'), desc: t('sitemap.sections.thrust.em.desc') },
        { to: '/products/calibration-service', label: t('sitemap.sections.thrust.calibration.label'), desc: t('sitemap.sections.thrust.calibration.desc') },
      ],
    },
    {
      title: t('sitemap.sections.news.title'),
      links: [
        { to: '/news/rashid-langmuir-probe', label: t('sitemap.sections.news.rashid') },
        { to: '/news/electric-propulsion', label: t('sitemap.sections.news.electric') },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{t('sitemap.meta.title')}</title>
        <meta name="description" content={t('sitemap.meta.description')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/sitemap')} hreflang="x-default" />
        
        <meta property="og:locale" content={ogLocale} />
        {ogAlternates.map((alt) => (
          <meta key={alt} property="og:locale:alternate" content={alt} />
        ))}
        <meta property="og:title" content={t('sitemap.meta.title')} />
        <meta property="og:description" content={t('sitemap.meta.description')} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className={styles.title}>{t('sitemap.title')}</h1>

      {sections.map((section) => (
        <section key={section.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <ul className={styles.linkList}>
            {section.links.map((link) => (
              <li key={link.to}>
                <Link to={buildLocalizedPath(locale, link.to)}>{link.label}</Link>
                {link.desc && <p className={styles.linkDesc}>{link.desc}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className={styles.footer}>
        <p>{t('sitemap.footer.updated')}</p>
      </footer>
    </div>
  );
}
