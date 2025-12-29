import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import SEOMeta from '../../../i18n/SEOMeta';
import arc1 from '../../../assets/images/Cathodearc/Cathodearc-swipe1.png';

export default function CathodeArcPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/cathode-arc');
  const canonical = buildCanonicalUrl(locale, '/products/cathode-arc');
  
  const productSchema = generateProductSchema({
    name: t('product_cathode_arc.page.title'),
    description: t('product_cathode_arc.meta.description'),
    category: "等离子体源",
    url: canonical
  });
  
  const features = [
    t('product_cathode_arc.detail.feature1'),
    t('product_cathode_arc.detail.feature2'),
    t('product_cathode_arc.detail.feature3'),
    t('product_cathode_arc.detail.feature4'),
  ];
  const specs = [
    [t('product_cathode_arc.detail.spec1.label'), t('product_cathode_arc.detail.spec1.value')],
    [t('product_cathode_arc.detail.spec2.label'), t('product_cathode_arc.detail.spec2.value')],
    [t('product_cathode_arc.detail.spec3.label'), t('product_cathode_arc.detail.spec3.value')],
    [t('product_cathode_arc.detail.spec4.label'), t('product_cathode_arc.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <SEOMeta
          title={t('product_cathode_arc.meta.title')}
          description={t('product_cathode_arc.meta.description')}
          keywords={t('product_cathode_arc.meta.keywords', '')}
          pathname="/products/cathode-arc"
          image={arc1}
          imageAlt={t('product_cathode_arc.page.title')}
        />
        <Helmet>
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_cathode_arc.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_cathode_arc.page.lead'))}</p>

        <ProductDetail
          id="cathode-arc"
          title={t('product_cathode_arc.detail.title')}
          tagline={t('product_cathode_arc.detail.tagline')}
          overview={t('product_cathode_arc.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={[arc1]}
        />

      </div>
    </div>
  );
}
