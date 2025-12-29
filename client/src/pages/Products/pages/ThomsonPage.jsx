import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';

export default function ThomsonPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/thomson');
  const canonical = buildCanonicalUrl(locale, '/products/thomson');
  
  const productSchema = generateProductSchema({
    name: t('product_thomson.page.title'),
    description: t('product_thomson.meta.description'),
    category: "非接触式诊断（光学类）系统",
    url: canonical
  });
  
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
        <SEOMeta
          title={t('product_thomson.meta.title')}
          description={t('product_thomson.meta.description')}
          keywords={t('product_thomson.meta.keywords', '')}
          pathname="/products/thomson"
          imageAlt={t('product_thomson.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <ProductDetail {...details}/>
      </div>
    </div>
  );
}
