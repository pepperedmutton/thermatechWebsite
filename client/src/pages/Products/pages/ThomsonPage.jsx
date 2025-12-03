import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';

export default function ThomsonPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/thomson');
  const canonical = buildCanonicalUrl(locale, '/products/thomson');
  const features = [
    t('product_thomson.detail.feature1'),
    t('product_thomson.detail.feature2'),
    t('product_thomson.detail.feature3'),
    t('product_thomson.detail.feature4'),
  ];
  const specs = [
    [t('product_thomson.detail.spec1.label'), t('product_thomson.detail.spec1.value')],
    [t('product_thomson.detail.spec2.label'), t('product_thomson.detail.spec2.value')],
    [t('product_thomson.detail.spec3.label'), t('product_thomson.detail.spec3.value')],
    [t('product_thomson.detail.spec4.label'), t('product_thomson.detail.spec4.value')],
    [t('product_thomson.detail.spec5.label'), t('product_thomson.detail.spec5.value')],
  ];
  const details = {
    title: t('product_thomson.page.title'),
    overview: t('product_thomson.page.lead'),
    features,
    specs,
    galleryImages: [],
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_thomson.meta.title')}</title>
          <meta name="description" content={t('product_thomson.meta.description')} />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/thomson')} hreflang="x-default" />
        </Helmet>
        <ProductDetail {...details}/>
      </div>
    </div>
  );
}
