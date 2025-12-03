import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ProductDetailPage.module.css';
import { useI18n } from '../../../i18n/i18n';
import { buildCanonicalUrl, buildHreflangLinks } from '../../../i18n/seo';

import langmuirSwipe1 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe1.png';
import langmuirSwipe2 from '../../../assets/images/LangmuirSingle/langmuir-single-swipe2.png';
import langmuirDouble1 from '../../../assets/images/LangmuirDouble/double-swipe-1.png';
import langmuirDouble2 from '../../../assets/images/LangmuirDouble/double-swipe-2.png';
import langmuirTriple1 from '../../../assets/images/LangmuirTriple/triple-swipe-1.png';
import emissiveSwipe1 from '../../../assets/images/EmissiveProbe/emissive-swipe1.png';

import ProductDetail from './components/ProductDetail';
import SubNav from './components/SubNav';

export default function LangmuirPage() {
  const { t, locale } = useI18n();
  const alternates = buildHreflangLinks('/products/langmuir');
  const canonical = buildCanonicalUrl(locale, '/products/langmuir');

  const probeTypes = [
    { id: 'single', title: t('product_langmuir.single.title') },
    { id: 'double', title: t('product_langmuir.double.title') },
    { id: 'triple', title: t('product_langmuir.triple.title') },
    { id: 'emissive', title: t('product_langmuir.emissive.title') },
  ];

  const singleFeatures = [
    t('product_langmuir.single.feature1'),
    t('product_langmuir.single.feature2'),
    t('product_langmuir.single.feature3'),
    t('product_langmuir.single.feature4'),
  ];
  const singleSpecs = [
    [t('product_langmuir.single.spec1.label'), t('product_langmuir.single.spec1.value')],
    [t('product_langmuir.single.spec2.label'), t('product_langmuir.single.spec2.value')],
    [t('product_langmuir.single.spec3.label'), t('product_langmuir.single.spec3.value')],
    [t('product_langmuir.single.spec4.label'), t('product_langmuir.single.spec4.value')],
  ];

  const doubleFeatures = [
    t('product_langmuir.double.feature1'),
    t('product_langmuir.double.feature2'),
    t('product_langmuir.double.feature3'),
    t('product_langmuir.double.feature4'),
  ];
  const doubleSpecs = [
    [t('product_langmuir.double.spec1.label'), t('product_langmuir.double.spec1.value')],
    [t('product_langmuir.double.spec2.label'), t('product_langmuir.double.spec2.value')],
    [t('product_langmuir.double.spec3.label'), t('product_langmuir.double.spec3.value')],
    [t('product_langmuir.double.spec4.label'), t('product_langmuir.double.spec4.value')],
  ];

  const tripleFeatures = [
    t('product_langmuir.triple.feature1'),
    t('product_langmuir.triple.feature2'),
    t('product_langmuir.triple.feature3'),
    t('product_langmuir.triple.feature4'),
  ];
  const tripleSpecs = [
    [t('product_langmuir.triple.spec1.label'), t('product_langmuir.triple.spec1.value')],
    [t('product_langmuir.triple.spec2.label'), t('product_langmuir.triple.spec2.value')],
    [t('product_langmuir.triple.spec3.label'), t('product_langmuir.triple.spec3.value')],
    [t('product_langmuir.triple.spec4.label'), t('product_langmuir.triple.spec4.value')],
  ];

  const emissiveFeatures = [
    t('product_langmuir.emissive.feature1'),
    t('product_langmuir.emissive.feature2'),
    t('product_langmuir.emissive.feature3'),
    t('product_langmuir.emissive.feature4'),
  ];
  const emissiveSpecs = [
    [t('product_langmuir.emissive.spec1.label'), t('product_langmuir.emissive.spec1.value')],
    [t('product_langmuir.emissive.spec2.label'), t('product_langmuir.emissive.spec2.value')],
    [t('product_langmuir.emissive.spec3.label'), t('product_langmuir.emissive.spec3.value')],
    [t('product_langmuir.emissive.spec4.label'), t('product_langmuir.emissive.spec4.value')],
  ];

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{t('product_langmuir.meta.title')}</title>
        <meta name="description" content={t('product_langmuir.meta.description')} />
        <link rel="canonical" href={canonical} />
        {alternates.map((item) => (
          <link key={item.hreflang} rel="alternate" href={item.href} hreflang={item.hreflang} />
        ))}
        <link rel="alternate" href={buildCanonicalUrl('zh-CN', '/products/langmuir')} hreflang="x-default" />
      </Helmet>
      <SubNav items={probeTypes} />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>{t('product_langmuir.page.title')}</h1>
        <p className={styles.lead}>{t('product_langmuir.page.lead')}</p>

        <ProductDetail
          id="single"
          title={t('product_langmuir.single.title')}
          tagline={t('product_langmuir.single.tagline')}
          overview={t('product_langmuir.single.overview')}
          features={singleFeatures}
          specs={singleSpecs}
          galleryImages={[langmuirSwipe1, langmuirSwipe2]}
        />

        <ProductDetail
          id="double"
          title={t('product_langmuir.double.title')}
          tagline={t('product_langmuir.double.tagline')}
          overview={t('product_langmuir.double.overview')}
          features={doubleFeatures}
          specs={doubleSpecs}
          galleryImages={[langmuirDouble1, langmuirDouble2]}
        />

        <ProductDetail
          id="triple"
          title={t('product_langmuir.triple.title')}
          tagline={t('product_langmuir.triple.tagline')}
          overview={t('product_langmuir.triple.overview')}
          features={tripleFeatures}
          specs={tripleSpecs}
          galleryImages={[langmuirTriple1]}
        />

        <ProductDetail
          id="emissive"
          title={t('product_langmuir.emissive.title')}
          tagline={t('product_langmuir.emissive.tagline')}
          overview={t('product_langmuir.emissive.overview')}
          features={emissiveFeatures}
          specs={emissiveSpecs}
          galleryImages={[emissiveSwipe1]}
        />
      </div>
    </div>
  );
}
