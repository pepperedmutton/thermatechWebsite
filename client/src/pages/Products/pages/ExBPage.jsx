import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { renderTextWithMath } from '../../../utils/mathRenderer';

import exb1 from '../../../assets/images/ExB/ExB-swipe1.png';
import exb2 from '../../../assets/images/ExB/ExB-swipe2.png';
import exb3 from '../../../assets/images/ExB/ExB-swipe3.png';
import exb4 from '../../../assets/images/ExB/ExB-swipe4.png';

export default function ExBPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/exb');
  const canonical = buildCanonicalUrl(locale, '/products/exb');
  const exbImages = [exb1, exb2, exb3, exb4];
  const features = [
    t('product_exb.detail.feature1'),
    t('product_exb.detail.feature2'),
    t('product_exb.detail.feature3'),
    t('product_exb.detail.feature4'),
  ];
  const specs = [
    [t('product_exb.detail.spec1.label'), t('product_exb.detail.spec1.value')],
    [t('product_exb.detail.spec2.label'), t('product_exb.detail.spec2.value')],
    [t('product_exb.detail.spec3.label'), t('product_exb.detail.spec3.value')],
    [t('product_exb.detail.spec4.label'), t('product_exb.detail.spec4.value')],
    [t('product_exb.detail.spec5.label'), t('product_exb.detail.spec5.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_exb.meta.title')}</title>
          <meta name="description" content={t('product_exb.meta.description')} />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/exb')} hreflang="x-default" />
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_exb.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_exb.page.lead'))}</p>

        <ProductDetail
          id="exb-probe"
          title={t('product_exb.detail.title')}
          tagline={t('product_exb.detail.tagline')}
          overview={t('product_exb.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={exbImages}
        />
      </div>
    </div>
  );
}
