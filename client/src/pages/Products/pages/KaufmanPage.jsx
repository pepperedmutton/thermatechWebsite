import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';
import { generateProductSchema } from '../../../utils/schemaGenerator';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import kaufmanImg from '../../../assets/images/Kaufman/KaufMan.png';

export default function KaufmanPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/kaufman');
  const canonical = buildCanonicalUrl(locale, '/products/kaufman');
  
  const productSchema = generateProductSchema({
    name: t('product_kaufman.page.title'),
    description: t('product_kaufman.meta.description'),
    category: "等离子体源",
    url: canonical
  });
  const features = [
    t('product_kaufman.detail.feature1'),
    t('product_kaufman.detail.feature2'),
    t('product_kaufman.detail.feature3'),
    t('product_kaufman.detail.feature4'),
  ];
  const specs = [
    [t('product_kaufman.detail.spec1.label'), t('product_kaufman.detail.spec1.value')],
    [t('product_kaufman.detail.spec2.label'), t('product_kaufman.detail.spec2.value')],
    [t('product_kaufman.detail.spec3.label'), t('product_kaufman.detail.spec3.value')],
    [t('product_kaufman.detail.spec4.label'), t('product_kaufman.detail.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_kaufman.meta.title')}</title>
          <meta name="description" content={t('product_kaufman.meta.description')} />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/kaufman')} hreflang="x-default" />
          
          {/* Schema.org Product */}
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
        <h1 className={styles.pageTitle}>{t('product_kaufman.page.title')}</h1>
        <p className={styles.lead}>{renderTextWithMath(t('product_kaufman.page.lead'))}</p>

        <ProductDetail
          id="kaufman"
          title={t('product_kaufman.detail.title')}
          tagline={t('product_kaufman.detail.tagline')}
          overview={t('product_kaufman.detail.overview')}
          features={features}
          specs={specs}
          galleryImages={[kaufmanImg]}
        />
      </div>
    </div>
  );
}
