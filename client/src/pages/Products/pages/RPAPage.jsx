import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';
import rpaSwipe1 from '../../../assets/images/RPA/RPA-swipe1.png';
import rpaSwipe2 from '../../../assets/images/RPA/RPA-swipe2.png';

export default function RPAPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/rpa');
  const canonical = buildCanonicalUrl(locale, '/products/rpa');
  
  const productSchema = generateProductSchema({
    name: t('product_rpa.page.title'),
    description: t('product_rpa.meta.description'),
    category: "等离子体诊断仪器",
    url: canonical
  });
  
  const features = [
    t('product_rpa.detail.feature1'),
    t('product_rpa.detail.feature2'),
    t('product_rpa.detail.feature3'),
    t('product_rpa.detail.feature4'),
  ];
  const specs = [
    [t('product_rpa.detail.spec1.label'), t('product_rpa.detail.spec1.value')],
    [t('product_rpa.detail.spec2.label'), t('product_rpa.detail.spec2.value')],
    [t('product_rpa.detail.spec3.label'), t('product_rpa.detail.spec3.value')],
    [t('product_rpa.detail.spec4.label'), t('product_rpa.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_rpa.meta.title')}
          description={t('product_rpa.meta.description')}
          keywords={t('product_rpa.meta.keywords', '')}
          pathname="/products/rpa"
          image={rpaSwipe1}
          imageAlt={t('product_rpa.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_rpa.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_rpa.page.lead'))}</p>

        <ProductDetail
          id="rpa"
          title={t('product_rpa.detail.title')}
          tagline={t('product_rpa.detail.tagline')}
          overview={t('product_rpa.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={[rpaSwipe1, rpaSwipe2]}
        />
      </div>
    </div>
  );
}
