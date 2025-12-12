import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import rfiImg from '../../../assets/images/RF/RFIon.png';

export default function RFISPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/rfis');
  const canonical = buildCanonicalUrl(locale, '/products/rfis');
  const features = [
    t('product_rfis.detail.feature1'),
    t('product_rfis.detail.feature2'),
    t('product_rfis.detail.feature3'),
    t('product_rfis.detail.feature4'),
  ];
  const specs = [
    [t('product_rfis.detail.spec1.label'), t('product_rfis.detail.spec1.value')],
    [t('product_rfis.detail.spec2.label'), t('product_rfis.detail.spec2.value')],
    [t('product_rfis.detail.spec3.label'), t('product_rfis.detail.spec3.value')],
    [t('product_rfis.detail.spec4.label'), t('product_rfis.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_rfis.meta.title')}</title>
          <meta name="description" content={t('product_rfis.meta.description')} />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/rfis')} hreflang="x-default" />
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_rfis.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_rfis.page.lead'))}</p>

        <ProductDetail
          id="rfis"
          title={t('product_rfis.detail.title')}
          tagline={t('product_rfis.detail.tagline')}
          overview={t('product_rfis.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={[rfiImg]}
        />
      </div>
    </div>
  );
}
