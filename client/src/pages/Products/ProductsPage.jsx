import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './ProductsPage.module.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Helmet } from 'react-helmet-async';

import DiagnosticsTable from './components/DiagnosticsTable';
import NonContactTable from './components/NonContactTable';
import ProductCard from './components/ProductCard';
import ProductsNav from './components/ProductsNav';
import IonSourceTable from './components/IonSourceTable';
import ThrustTable from './components/ThrustTable';
import { useI18n, buildLocalizedPath } from '../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks, getOgLocale, getOgLocaleAlternates } from '../../i18n/seo';

export default function ProductsPage() {
  const location = useLocation();
  const { t, locale } = useI18n();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  const alternates = buildHreflangLinks('/products');
  const canonical = buildCanonicalUrl(locale, '/products');
  const ogLocale = getOgLocale(locale);
  const ogAlternates = getOgLocaleAlternates(locale);

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{t('products.meta.title')}</title>
        <meta name="description" content={t('products.meta.description')} />
        <meta name="keywords" content={t('products.meta.keywords', '')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products')} hreflang="x-default" />
        
        <meta property="og:locale" content={ogLocale} />
        {ogAlternates.map((alt) => (
          <meta key={alt} property="og:locale:alternate" content={alt} />
        ))}
        <meta property="og:title" content={t('products.meta.title')} />
        <meta property="og:description" content={t('products.meta.description')} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        
        {/* Schema.org ItemList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": t('products.meta.title'),
            "description": t('products.meta.description'),
            "numberOfItems": 15,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.contact.langmuir'),
                  "url": buildCanonicalUrl(locale, '/products/langmuir'),
                  "category": t('products.seoLinks.contact.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.contact.faraday'),
                  "url": buildCanonicalUrl(locale, '/products/faraday'),
                  "category": t('products.seoLinks.contact.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.contact.exb'),
                  "url": buildCanonicalUrl(locale, '/products/exb'),
                  "category": t('products.seoLinks.contact.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.contact.rpa'),
                  "url": buildCanonicalUrl(locale, '/products/rpa'),
                  "category": t('products.seoLinks.contact.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.optical.oes'),
                  "url": buildCanonicalUrl(locale, '/products/oes'),
                  "category": t('products.seoLinks.optical.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 6,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.optical.lif'),
                  "url": buildCanonicalUrl(locale, '/products/lif'),
                  "category": t('products.seoLinks.optical.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 7,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.optical.thomson'),
                  "url": buildCanonicalUrl(locale, '/products/thomson'),
                  "category": t('products.seoLinks.optical.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 8,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.ion.kaufman'),
                  "url": buildCanonicalUrl(locale, '/products/kaufman'),
                  "category": t('products.seoLinks.ion.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 9,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.ion.hall'),
                  "url": buildCanonicalUrl(locale, '/products/hall-source'),
                  "category": t('products.seoLinks.ion.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 10,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.ion.rf'),
                  "url": buildCanonicalUrl(locale, '/products/rfis'),
                  "category": t('products.seoLinks.ion.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 11,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.ion.cathode'),
                  "url": buildCanonicalUrl(locale, '/products/cathode-arc'),
                  "category": t('products.seoLinks.ion.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 12,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.thrust.torsion'),
                  "url": buildCanonicalUrl(locale, '/products/torsion-balance'),
                  "category": t('products.seoLinks.thrust.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 13,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.thrust.em'),
                  "url": buildCanonicalUrl(locale, '/products/em-balance'),
                  "category": t('products.seoLinks.thrust.title')
                }
              },
              {
                "@type": "ListItem",
                "position": 14,
                "item": {
                  "@type": "Product",
                  "name": t('products.seoLinks.thrust.calibration'),
                  "url": buildCanonicalUrl(locale, '/products/calibration-service'),
                  "category": t('products.seoLinks.thrust.title')
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <ProductsNav
        items={[
          { id: 'contact-diagnostics', title: t('products.nav.contact') },
          { id: 'non-contact-diagnostics', title: t('products.nav.optical') },
          { id: 'ion-sources', title: t('products.nav.ion') },
          { id: 'thrust-measurement', title: t('products.nav.thrust') },
        ]}
      />

      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>{t('products.page.title')}</h1>

        <section className={styles.seoLinksSection}>
          <h2 className={styles.seoLinksTitle}>{t('products.seoLinks.title')}</h2>
          <div className={styles.seoLinksGrid}>
            <div className={styles.seoLinksCategory}>
              <h3>{t('products.seoLinks.contact.title')}</h3>
              <ul>
                <li><Link to={buildLocalizedPath(locale, '/products/langmuir')}>{t('products.seoLinks.contact.langmuir')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/faraday')}>{t('products.seoLinks.contact.faraday')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/exb')}>{t('products.seoLinks.contact.exb')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/rpa')}>{t('products.seoLinks.contact.rpa')}</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>{t('products.seoLinks.optical.title')}</h3>
              <ul>
                <li><Link to={buildLocalizedPath(locale, '/products/oes')}>{t('products.seoLinks.optical.oes')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/lif')}>{t('products.seoLinks.optical.lif')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/thomson')}>{t('products.seoLinks.optical.thomson')}</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>{t('products.seoLinks.ion.title')}</h3>
              <ul>
                <li><Link to={buildLocalizedPath(locale, '/products/kaufman')}>{t('products.seoLinks.ion.kaufman')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/hall-source')}>{t('products.seoLinks.ion.hall')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/rfis')}>{t('products.seoLinks.ion.rfis')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/cathode-arc')}>{t('products.seoLinks.ion.cathode')}</Link></li>
              </ul>
            </div>
            <div className={styles.seoLinksCategory}>
              <h3>{t('products.seoLinks.thrust.title')}</h3>
              <ul>
                <li><Link to={buildLocalizedPath(locale, '/products/torsion-balance')}>{t('products.seoLinks.thrust.torsion')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/em-balance')}>{t('products.seoLinks.thrust.em')}</Link></li>
                <li><Link to={buildLocalizedPath(locale, '/products/calibration-service')}>{t('products.seoLinks.thrust.calibration')}</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>{t('products.section.contact.title')}</h2>
          <p className={styles.categoryDescription}>{t('products.section.contact.desc')}</p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to={buildLocalizedPath(locale, '/products/langmuir')}
                title={t('products.section.contact.langmuir.title')}
                description={t('products.section.contact.langmuir.desc')}
                size="small"
                parameterList={[
                  <li key="lp1">{t('products.section.contact.langmuir.param1')}</li>,
                  <li key="lp2">{t('products.section.contact.langmuir.param2')}</li>,
                  <li key="lp3">{t('products.section.contact.langmuir.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/faraday')}
                title={t('products.section.contact.faraday.title')}
                description={t('products.section.contact.faraday.desc')}
                size="small"
                parameterList={[
                  <li key="fp1">{t('products.section.contact.faraday.param1')}</li>,
                  <li key="fp2">{t('products.section.contact.faraday.param2')}</li>,
                  <li key="fp3">{t('products.section.contact.faraday.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/exb')}
                title={t('products.section.contact.exb.title')}
                description={t('products.section.contact.exb.desc')}
                size="small"
                parameterList={[
                  <li key="eb1">{t('products.section.contact.exb.param1')}</li>,
                  <li key="eb2">{t('products.section.contact.exb.param2')}</li>,
                  <li key="eb3">{t('products.section.contact.exb.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/rpa')}
                title={t('products.section.contact.rpa.title')}
                description={t('products.section.contact.rpa.desc')}
                size="small"
                parameterList={[
                  <li key="rpa1">{t('products.section.contact.rpa.param1')}</li>,
                  <li key="rpa2">{t('products.section.contact.rpa.param2')}</li>,
                  <li key="rpa3">{t('products.section.contact.rpa.param3')}</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <DiagnosticsTable />
            </div>
          </div>
        </section>

        <section id="combo-diagnostics" className={`${styles.productCategory} ${styles.comboSection}`}>
          <h2 className={styles.categoryTitle}>{t('products.section.combo.title')}</h2>
          <div className={styles.comboGrid}>
            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>{t('products.section.combo.plan1.label')}</div>
              <h3>{t('products.section.combo.plan1.title')}</h3>
              <p>{t('products.section.combo.plan1.p1')}</p>
              <p>{t('products.section.combo.plan1.p2')}</p>
              <p>{t('products.section.combo.plan1.p3')}</p>
              <p>{t('products.section.combo.plan1.p4')}</p>
              <div className={styles.comboListTitle}>{t('products.section.combo.plan1.listTitle')}</div>
              <ul className={styles.comboList}>
                <li>{t('products.section.combo.plan1.item1')}</li>
                <li>{t('products.section.combo.plan1.item2')}</li>
              </ul>
            </div>

            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>{t('products.section.combo.plan2.label')}</div>
              <h3>{t('products.section.combo.plan2.title')}</h3>
              <p>{t('products.section.combo.plan2.p1')}</p>
              <p>{t('products.section.combo.plan2.p2')}</p>
              <p>{t('products.section.combo.plan2.p3')}</p>
              <p>{t('products.section.combo.plan2.p4')}</p>
              <div className={styles.comboListTitle}>{t('products.section.combo.plan2.listTitle')}</div>
              <ul className={styles.comboList}>
                <li>{t('products.section.combo.plan2.item1')}</li>
                <li>{t('products.section.combo.plan2.item2')}</li>
                <li>{t('products.section.combo.plan2.item3')}</li>
              </ul>
            </div>

            <div className={styles.comboCard}>
              <div className={styles.comboLabel}>{t('products.section.combo.plan3.label')}</div>
              <h3>{t('products.section.combo.plan3.title')}</h3>
              <p>{t('products.section.combo.plan3.p1')}</p>
              <p>{t('products.section.combo.plan3.p2')}</p>
              <p>{t('products.section.combo.plan3.p3')}</p>
              <p>{t('products.section.combo.plan3.p4')}</p>
              <div className={styles.comboListTitle}>{t('products.section.combo.plan3.listTitle')}</div>
              <ul className={styles.comboList}>
                <li>{t('products.section.combo.plan3.item1')}</li>
                <li>{t('products.section.combo.plan3.item2')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="non-contact-diagnostics" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>{t('products.section.optical.title')}</h2>
          <p className={styles.categoryDescription}>{t('products.section.optical.desc')}</p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to={buildLocalizedPath(locale, '/products/oes')}
                title={t('products.section.optical.oes.title')}
                description={t('products.section.optical.oes.desc')}
                size="small"
                parameterList={[
                  <li key="oes1">{t('products.section.optical.oes.param1')}</li>,
                  <li key="oes2">{t('products.section.optical.oes.param2')}</li>,
                  <li key="oes3">{t('products.section.optical.oes.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/lif')}
                title={t('products.section.optical.lif.title')}
                description={t('products.section.optical.lif.desc')}
                size="small"
                parameterList={[
                  <li key="lif1">{t('products.section.optical.lif.param1')}</li>,
                  <li key="lif2">{t('products.section.optical.lif.param2')}</li>,
                  <li key="lif3">{t('products.section.optical.lif.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/thomson')}
                title={t('products.section.optical.thomson.title')}
                description={t('products.section.optical.thomson.desc')}
                size="small"
                parameterList={[
                  <li key="ts1">{t('products.section.optical.thomson.param1')}</li>,
                  <li key="ts2">{t('products.section.optical.thomson.param2')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/las')}
                title={t('products.section.optical.las.title')}
                description={t('products.section.optical.las.desc')}
                size="small"
                parameterList={[
                  <li key="las1">{t('products.section.optical.las.param1')}</li>,
                  <li key="las2">{t('products.section.optical.las.param2')}</li>,
                  <li key="las3">{t('products.section.optical.las.param3')}</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <NonContactTable />
            </div>
          </div>
        </section>

        <section id="ion-sources" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>{t('products.section.ion.title')}</h2>
          <p className={styles.categoryDescription}>{t('products.section.ion.desc')}</p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to={buildLocalizedPath(locale, '/products/kaufman')}
                title={t('products.section.ion.kaufman.title')}
                description={t('products.section.ion.kaufman.desc')}
                size="small"
                parameterList={[
                  <li key="is1">{t('products.section.ion.kaufman.param1')}</li>,
                  <li key="is2">{t('products.section.ion.kaufman.param2')}</li>,
                  <li key="is3">{t('products.section.ion.kaufman.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/hall-source')}
                title={t('products.section.ion.hall.title')}
                description={t('products.section.ion.hall.desc')}
                size="small"
                parameterList={[
                  <li key="is10">{t('products.section.ion.hall.param1')}</li>,
                  <li key="is11">{t('products.section.ion.hall.param2')}</li>,
                  <li key="is12">{t('products.section.ion.hall.param3')}</li>,
                ]}
              />
              <ProductCard
                title={t('products.section.ion.cathode.title')}
                to={buildLocalizedPath(locale, '/products/cathode-arc')}
                description={t('products.section.ion.cathode.desc')}
                size="small"
                parameterList={[
                  <li key="is4">{t('products.section.ion.cathode.param1')}</li>,
                  <li key="is5">{t('products.section.ion.cathode.param2')}</li>,
                  <li key="is6">{t('products.section.ion.cathode.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/rfis')}
                title={t('products.section.ion.rfis.title')}
                description={t('products.section.ion.rfis.desc')}
                size="small"
                parameterList={[
                  <li key="is7">{t('products.section.ion.rfis.param1')}</li>,
                  <li key="is8">{t('products.section.ion.rfis.param2')}</li>,
                  <li key="is9">{t('products.section.ion.rfis.param3')}</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <IonSourceTable />
            </div>
          </div>
        </section>

        <section id="thrust-measurement" className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>{t('products.section.thrust.title')}</h2>
          <p className={styles.categoryDescription}>{t('products.section.thrust.desc')}</p>

          <div className={styles.contactGrid}>
            <div className={styles.productGridContact}>
              <ProductCard
                to={buildLocalizedPath(locale, '/products/torsion-balance')}
                title={t('products.section.thrust.torsion.title')}
                description={t('products.section.thrust.torsion.desc')}
                size="small"
                parameterList={[
                  <li key="mt1">{t('products.section.thrust.torsion.param1')}</li>,
                  <li key="mt2">{t('products.section.thrust.torsion.param2')}</li>,
                  <li key="mt3">{t('products.section.thrust.torsion.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/em-balance')}
                title={t('products.section.thrust.em.title')}
                description={t('products.section.thrust.em.desc')}
                size="small"
                parameterList={[
                  <li key="mt4">{t('products.section.thrust.em.param1')}</li>,
                  <li key="mt5">{t('products.section.thrust.em.param2')}</li>,
                  <li key="mt6">{t('products.section.thrust.em.param3')}</li>,
                ]}
              />
              <ProductCard
                to={buildLocalizedPath(locale, '/products/calibration-service')}
                title={t('products.section.thrust.calibration.title')}
                description={t('products.section.thrust.calibration.desc')}
                size="small"
                parameterList={[
                  <li key="mt7">{t('products.section.thrust.calibration.param1')}</li>,
                  <li key="mt8">{t('products.section.thrust.calibration.param2')}</li>,
                  <li key="mt9">{t('products.section.thrust.calibration.param3')}</li>,
                ]}
              />
            </div>

            <div className={styles.tableContainer}>
              <ThrustTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
