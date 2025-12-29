import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';
import rfiImg from '../../../assets/images/RF/RFIon.png';

export default function RFISPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/rfis');
  const canonical = buildCanonicalUrl(locale, '/products/rfis');
  
  const productSchema = generateProductSchema({
    name: t('product_rfis.page.title'),
    description: t('product_rfis.meta.description'),
    category: "等离子体源",
    url: canonical
  });
  
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
        <SEOMeta
          title={t('product_rfis.meta.title')}
          description={t('product_rfis.meta.description')}
          keywords={t('product_rfis.meta.keywords', '')}
          pathname="/products/rfis"
          image={rfiImg}
          imageAlt={t('product_rfis.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
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
