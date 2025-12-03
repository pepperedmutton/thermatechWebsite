import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import arc1 from '../../../assets/images/Cathodearc/Cathodearc-swipe1.png';

export default function CathodeArcPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/cathode-arc');
  const canonical = buildCanonicalUrl(locale, '/products/cathode-arc');
  const features = [
    t('product_cathode_arc.detail.feature1'),
    t('product_cathode_arc.detail.feature2'),
    t('product_cathode_arc.detail.feature3'),
    t('product_cathode_arc.detail.feature4'),
  ];
  const specs = [
    [t('product_cathode_arc.detail.spec1.label'), t('product_cathode_arc.detail.spec1.value')],
    [t('product_cathode_arc.detail.spec2.label'), t('product_cathode_arc.detail.spec2.value')],
    [t('product_cathode_arc.detail.spec3.label'), t('product_cathode_arc.detail.spec3.value')],
    [t('product_cathode_arc.detail.spec4.label'), t('product_cathode_arc.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_cathode_arc.meta.title')}</title>
          <meta name="description" content={t('product_cathode_arc.meta.description')} />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/cathode-arc')} hreflang="x-default" />
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_cathode_arc.page.title')}</h1>
        <p className={styles.lead}>{t('product_cathode_arc.page.lead')}</p>

        <ProductDetail
          id="cathode-arc"
          title={t('product_cathode_arc.detail.title')}
          tagline={t('product_cathode_arc.detail.tagline')}
          overview={t('product_cathode_arc.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={[arc1]}
        />

      </div>
    </div>
  );
}
