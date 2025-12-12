/**
 * Schema.org JSON-LD 生成工具
 * 用于为网站页面生成结构化数据
 */

/**
 * 生成 Organization schema
 * @param {Object} options - 配置选项
 * @param {string} options.name - 组织名称
 * @param {string} options.description - 描述
 * @param {string} options.url - 网站 URL
 * @returns {Object} Organization schema
 */
export function generateOrganizationSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name || "星焓科技",
    "alternateName": "STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD",
    "url": url || "https://www.starthermatech.com",
    "logo": "https://www.starthermatech.com/logo.png",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "学院路35号世宁大厦14层1408-003",
      "addressLocality": "海淀区",
      "addressRegion": "北京市",
      "postalCode": "100083",
      "addressCountry": "CN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-18519685090",
      "email": "bd@starthermatech.com",
      "contactType": "Sales",
      "areaServed": "CN",
      "availableLanguage": ["zh-CN", "en", "ja", "ru"]
    }
  };
}

/**
 * 生成 Product schema
 * @param {Object} options - 产品信息
 * @param {string} options.name - 产品名称
 * @param {string} options.description - 产品描述
 * @param {string} options.category - 产品类别
 * @param {string} options.url - 产品页面 URL
 * @param {string} [options.image] - 产品图片 URL
 * @returns {Object} Product schema
 */
export function generateProductSchema({ name, description, category, url, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "星焓科技 (STARENTHALPY)"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司"
    },
    "category": category,
    "url": url,
    ...(image && { "image": image }),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CNY",
      "url": url
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    }
  };
}

/**
 * 生成 Article schema
 * @param {Object} options - 文章信息
 * @param {string} options.headline - 标题
 * @param {string} options.description - 描述
 * @param {string} options.datePublished - 发布日期 (ISO 8601)
 * @param {string} options.dateModified - 修改日期 (ISO 8601)
 * @param {string} options.url - 文章 URL
 * @param {string} [options.image] - 封面图片 URL
 * @param {string} [options.category] - 文章分类
 * @param {string} [options.keywords] - 关键词
 * @param {string} [options.locale] - 语言
 * @returns {Object} Article schema
 */
export function generateArticleSchema({ 
  headline, 
  description, 
  datePublished, 
  dateModified, 
  url, 
  image,
  category,
  keywords,
  locale 
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司"
    },
    "publisher": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.starthermatech.com/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && { "image": image }),
    ...(category && { "articleSection": category }),
    ...(keywords && { "keywords": keywords }),
    ...(locale && { "inLanguage": locale })
  };
}

/**
 * 生成 Blog schema
 * @param {Object} options - 博客信息
 * @param {string} options.name - 博客名称
 * @param {string} options.description - 描述
 * @param {string} options.url - 博客 URL
 * @param {string} [options.locale] - 语言
 * @returns {Object} Blog schema
 */
export function generateBlogSchema({ name, description, url, locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": name,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "星焓科技 (北京) 有限公司",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.starthermatech.com/logo.png"
      }
    },
    ...(locale && { "inLanguage": locale })
  };
}

/**
 * 生成 ItemList schema (用于产品列表页)
 * @param {Object} options - 列表信息
 * @param {string} options.name - 列表名称
 * @param {string} options.description - 描述
 * @param {Array} options.items - 项目数组 [{name, url, category}]
 * @returns {Object} ItemList schema
 */
export function generateItemListSchema({ name, description, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "url": item.url,
        "category": item.category
      }
    }))
  };
}

/**
 * 生成 BreadcrumbList schema
 * @param {Array} breadcrumbs - 面包屑数组 [{name, url}]
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}
