import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import ProductDetail from './components/ProductDetail';
import SubNav from './components/SubNav';
import swipe1 from '../../../assets/images/FaradayPage/faraday-swipe-1.png';
import swipe2 from '../../../assets/images/FaradayPage/faraday-swipe-2.png';
import swipe3 from '../../../assets/images/FaradayPage/faraday-swipe-3.png';
import swipe4 from '../../../assets/images/FaradayPage/faraday-swipe-4.png';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';

export default function FaradayPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/faraday');
  const canonical = buildCanonicalUrl(locale, '/products/faraday');

  const singleFeatures = [
    t('product_faraday.single.feature1'),
    t('product_faraday.single.feature2'),
    t('product_faraday.single.feature3'),
    t('product_faraday.single.feature4'),
  ];
  const singleSpecs = [
    [t('product_faraday.single.spec1.label'), t('product_faraday.single.spec1.value')],
    [t('product_faraday.single.spec2.label'), t('product_faraday.single.spec2.value')],
    [t('product_faraday.single.spec3.label'), t('product_faraday.single.spec3.value')],
    [t('product_faraday.single.spec4.label'), t('product_faraday.single.spec4.value')],
  ];

  const arrayFeatures = [
    t('product_faraday.array.feature1'),
    t('product_faraday.array.feature2'),
    t('product_faraday.array.feature3'),
    t('product_faraday.array.feature4'),
  ];
  const arraySpecs = [
    [t('product_faraday.array.spec1.label'), t('product_faraday.array.spec1.value')],
    [t('product_faraday.array.spec2.label'), t('product_faraday.array.spec2.value')],
    [t('product_faraday.array.spec3.label'), t('product_faraday.array.spec3.value')],
    [t('product_faraday.array.spec4.label'), t('product_faraday.array.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <Helmet>
          <title>{t('product_faraday.meta.title')}</title>
          <meta
            name="description"
            content={t('product_faraday.meta.description')}
          />
          <link rel="canonical" href={canonical} />
          {alternates.map((item) => (
            <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
          ))}
          <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/faraday')} hreflang="x-default" />
        </Helmet>
        <SubNav items={[
          { id: 'faraday-single', title: t('product_faraday.nav.single') },
          { id: 'faraday-array', title: t('product_faraday.nav.array') },
        ]} />
        <h1 className={styles.pageTitle}>{t('product_faraday.page.title')}</h1>
        <p className={styles.lead}>{t('product_faraday.page.lead')}</p>

        <ProductDetail
          id="faraday-single"
          title={t('product_faraday.single.title')}
          tagline={t('product_faraday.single.tagline')}
          overview={t('product_faraday.single.overview')}
          features={singleFeatures}
          specs={singleSpecs}
          galleryImages={[swipe1, swipe2, swipe3, swipe4]}
          ctaPrimaryHref={buildLocalizedPath(locale, '/contact')}
          ctaSecondaryHref={buildLocalizedPath(locale, '/products')}
        />

        <ProductDetail
          id="faraday-array"
          title={t('product_faraday.array.title')}
          tagline={t('product_faraday.array.tagline')}
          overview={t('product_faraday.array.overview')}
          features={arrayFeatures}
          specs={arraySpecs}
          ctaPrimaryHref={buildLocalizedPath(locale, '/contact')}
          ctaSecondaryHref={buildLocalizedPath(locale, '/products')}
        />

      </div>
    </div>
  );
}
