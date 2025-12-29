import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';

export default function TorsionBalancePage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/torsion-balance');
  const canonical = buildCanonicalUrl(locale, '/products/torsion-balance');
  
  const productSchema = generateProductSchema({
    name: t('product_torsion.page.title'),
    description: t('product_torsion.meta.description'),
    category: "微推力测量",
    url: canonical
  });
  
  const features = [
    t('product_torsion.detail.feature1'),
    t('product_torsion.detail.feature2'),
    t('product_torsion.detail.feature3'),
    t('product_torsion.detail.feature4'),
  ];
  const specs = [
    [t('product_torsion.detail.spec1.label'), t('product_torsion.detail.spec1.value')],
    [t('product_torsion.detail.spec2.label'), t('product_torsion.detail.spec2.value')],
    [t('product_torsion.detail.spec3.label'), t('product_torsion.detail.spec3.value')],
    [t('product_torsion.detail.spec4.label'), t('product_torsion.detail.spec4.value')],
    [t('product_torsion.detail.spec5.label'), t('product_torsion.detail.spec5.value')],
  ];
  const details = {
    title: t('product_torsion.page.title'),
    overview: t('product_torsion.page.lead'),
    features,
    specs,
    galleryImages: [],
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_torsion.meta.title')}
          description={t('product_torsion.meta.description')}
          keywords={t('product_torsion.meta.keywords', '')}
          pathname="/products/torsion-balance"
          imageAlt={t('product_torsion.page.title')}
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
