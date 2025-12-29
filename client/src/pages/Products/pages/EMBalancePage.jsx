import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';

export default function EMBalancePage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/em-balance');
  const canonical = buildCanonicalUrl(locale, '/products/em-balance');
  
  const productSchema = generateProductSchema({
    name: t('product_em_balance.page.title'),
    description: t('product_em_balance.meta.description'),
    category: "微推力测量",
    url: canonical
  });
  
  const features = [
    t('product_em_balance.detail.feature1'),
    t('product_em_balance.detail.feature2'),
    t('product_em_balance.detail.feature3'),
    t('product_em_balance.detail.feature4'),
  ];
  const specs = [
    [t('product_em_balance.detail.spec1.label'), t('product_em_balance.detail.spec1.value')],
    [t('product_em_balance.detail.spec2.label'), t('product_em_balance.detail.spec2.value')],
    [t('product_em_balance.detail.spec3.label'), t('product_em_balance.detail.spec3.value')],
    [t('product_em_balance.detail.spec4.label'), t('product_em_balance.detail.spec4.value')],
    [t('product_em_balance.detail.spec5.label'), t('product_em_balance.detail.spec5.value')],
  ];
  const details = {
    title: t('product_em_balance.page.title'),
    overview: t('product_em_balance.page.lead'),
    features,
    specs,
    galleryImages: [],
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_em_balance.meta.title')}
          description={t('product_em_balance.meta.description')}
          keywords={t('product_em_balance.meta.keywords', '')}
          pathname="/products/em-balance"
          imageAlt={t('product_em_balance.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <ProductDetail {...details} />
      </div>
    </div>
  );
}
