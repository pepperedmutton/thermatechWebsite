import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from './i18n';
import { buildCanonicalUrl, buildHreflangLinks, getOgLocale, getOgLocaleAlternates, BASE_URL } from './seo';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  pathname: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export default function SEOMeta({
  title,
  description,
  keywords,
  pathname,
  image = `${BASE_URL}/logo.png`,
  imageAlt = '星焓科技 Logo',
  type = 'website',
  article,
}: SEOMetaProps) {
  const { locale } = useI18n();
  const alternates = buildHreflangLinks(pathname);
  const canonical = buildCanonicalUrl(locale, pathname);
  const ogLocale = getOgLocale(locale);
  const ogLocaleAlternates = getOgLocaleAlternates(locale);

  return (
    <Helmet>
      {/* 基础 Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Hreflang */}
      {alternates.map((item) => (
        <link
          key={item.hreflang}
          rel="alternate"
          href={item.href}
          hrefLang={item.hreflang}
        />
      ))}
      <link 
        rel="alternate" 
        href={buildCanonicalUrl('zh-CN', pathname)} 
        hrefLang="x-default" 
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="星焓科技" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={ogLocale} />
      {ogLocaleAlternates.map((alt) => (
        <meta key={alt} property="og:locale:alternate" content={alt} />
      ))}

      {/* Article specific OG tags */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
}
