import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from './components/ProductDetail';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';

export default function CalibrationServicePage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/calibration-service');
  const canonical = buildCanonicalUrl(locale, '/products/calibration-service');
  
  const productSchema = generateProductSchema({
    name: t('product_calibration.page.title'),
    description: t('product_calibration.meta.description'),
    category: "技术服务",
    url: canonical
  });
  
  const features = [
    t('product_calibration.detail.feature1'),
    t('product_calibration.detail.feature2'),
    t('product_calibration.detail.feature3'),
    t('product_calibration.detail.feature4'),
  ];
  const specs = [
    [t('product_calibration.detail.spec1.label'), t('product_calibration.detail.spec1.value')],
    [t('product_calibration.detail.spec2.label'), t('product_calibration.detail.spec2.value')],
    [t('product_calibration.detail.spec3.label'), t('product_calibration.detail.spec3.value')],
    [t('product_calibration.detail.spec4.label'), t('product_calibration.detail.spec4.value')],
    [t('product_calibration.detail.spec5.label'), t('product_calibration.detail.spec5.value')],
  ];
  const details = {
    title: t('product_calibration.page.title'),
    overview: t('product_calibration.page.lead'),
    features,
    specs,
    galleryImages: [],
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_calibration.meta.title')}
          description={t('product_calibration.meta.description')}
          keywords={t('product_calibration.meta.keywords', '')}
          pathname="/products/calibration-service"
          imageAlt={t('product_calibration.page.title')}
        />
        <Helmet>
          {/* Schema.org Service */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <ProductDetail {...details} />
      </div>
    </div>
  );
}
