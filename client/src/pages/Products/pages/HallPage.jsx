import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';
import { renderTextWithMath } from '../../../utils/mathRenderer';

export default function HallPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/hall-source');
  const canonical = buildCanonicalUrl(locale, '/products/hall-source');
  
  const productSchema = generateProductSchema({
    name: t('product_hall.page.title'),
    description: t('product_hall.meta.description'),
    category: "等离子体源",
    url: canonical
  });
  const features = [
    t('product_hall.detail.feature1'),
    t('product_hall.detail.feature2'),
    t('product_hall.detail.feature3'),
    t('product_hall.detail.feature4'),
  ];
  const specs = [
    [t('product_hall.detail.spec1.label'), t('product_hall.detail.spec1.value')],
    [t('product_hall.detail.spec2.label'), t('product_hall.detail.spec2.value')],
    [t('product_hall.detail.spec3.label'), t('product_hall.detail.spec3.value')],
    [t('product_hall.detail.spec4.label'), t('product_hall.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_hall.meta.title')}
          description={t('product_hall.meta.description')}
          keywords={t('product_hall.meta.keywords', '')}
          pathname="/products/hall-source"
          imageAlt={t('product_hall.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_hall.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_hall.page.lead'))}</p>

        <ProductDetail
          id="hall"
          title={t('product_hall.detail.title')}
          tagline={t('product_hall.detail.tagline')}
          overview={t('product_hall.detail.overview')}
          features={features}
          specs={specs}
        />
      </div>
    </div>
  );
}
