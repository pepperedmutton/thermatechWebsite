#!/usr/bin/env node

/**
 * inject-seo-tags.js
 * 在 vite-react-ssg 构建后注入 SEO 标签到所有主要页面
 * 从 i18n 翻译文件中读取 meta description
 * 同时修复多语言页面的 <html lang> 属性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const localesDir = path.resolve(__dirname, '../src/locales');

// 加载翻译文件
function loadTranslations(locale, file) {
  try {
    const filePath = path.join(localesDir, locale, `${file}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not load ${locale}/${file}.json`);
    return {};
  }
}

// 语言代码映射
const LANG_MAP = {
  'en': 'en',
  'ja': 'ja',
  'ru': 'ru',
  'zh-CN': 'zh-CN', // 默认中文
};

// 检测文件路径对应的语言
function detectLanguageFromPath(filePath) {
  // 规范化路径分隔符
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  if (normalizedPath.includes('/en/') || normalizedPath.endsWith('en.html') || normalizedPath.endsWith('/en')) return 'en';
  if (normalizedPath.includes('/ja/') || normalizedPath.endsWith('ja.html') || normalizedPath.endsWith('/ja')) return 'ja';
  if (normalizedPath.includes('/ru/') || normalizedPath.endsWith('ru.html') || normalizedPath.endsWith('/ru')) return 'ru';
  return 'zh-CN'; // 默认中文
}

// 根据文件名和语言生成 SEO 配置
function getPageConfig(filename, locale) {
  const basename = path.basename(filename);
  
  // 定义页面到翻译文件的映射
  const pageTranslationMap = {
    'index.html': 'home',
    'about.html': 'about',
    'news.html': 'news',
    'contact.html': 'contact',
    'join.html': 'join',
    'products.html': 'products',
    // 产品详情页
    'langmuir.html': 'product_langmuir',
    'faraday.html': 'product_faraday',
    'rpa.html': 'product_rpa',
    'exb.html': 'product_exb',
    'kaufman.html': 'product_kaufman',
    'hall.html': 'product_hall',
    'cathode-arc.html': 'product_cathode_arc',
    'rfis.html': 'product_rfis',
    'oes.html': 'product_oes',
    'lif.html': 'product_lif',
    'thomson.html': 'product_thomson',
    'torsion-balance.html': 'product_torsion',
    'em-balance.html': 'product_em_balance',
    'calibration-service.html': 'product_calibration',
  };
  
  const translationFile = pageTranslationMap[basename];
  if (!translationFile) return null;
  
  const translations = loadTranslations(locale, translationFile);
  
  const baseUrl = 'https://starthermatech.com';
  let pathname = basename.replace('.html', '');
  if (basename === 'index.html') pathname = '';
  
  // 产品详情页需要添加 /products 前缀
  const isProductPage = translationFile.startsWith('product_');
  if (isProductPage && pathname) {
    pathname = `products/${pathname}`;
  }
  
  // 构建语言前缀
  const langPrefix = locale === 'zh-CN' ? '' : `/${locale}`;
  const fullPath = langPrefix + (pathname ? `/${pathname}` : '');
  
  const config = {
    title: translations['meta.title'] || '星焓科技',
    description: translations['meta.description'] || '',
    keywords: translations['meta.keywords'] || '',
    url: `${baseUrl}${fullPath}`,
    type: 'website'
  };
  
  // 为首页添加 Organization Schema
  if (basename === 'index.html') {
    config.structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "星焓科技",
      "alternateName": "STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/logo-D-3pmcxY.jpg`,
      "description": config.description,
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
      },
      "sameAs": [
        baseUrl
      ]
    };
  }
  
  return config;
}

// 生成 SEO 标签的函数
function generateSeoTags(config) {
  const tags = [];
  
  // Basic Meta Tags
  tags.push(`    <!-- Basic Meta Tags -->`);
  tags.push(`    <meta name="description" content="${config.description}">`);
  if (config.keywords) {
    tags.push(`    <meta name="keywords" content="${config.keywords}">`);
  }
  
  // Canonical URL
  tags.push(`    \n    <!-- Canonical URL -->`);
  tags.push(`    <link rel="canonical" href="${config.url}">`);
  
  // Open Graph Tags
  tags.push(`    \n    <!-- Open Graph Tags -->`);
  tags.push(`    <meta property="og:type" content="${config.type}">`);
  tags.push(`    <meta property="og:url" content="${config.url}">`);
  tags.push(`    <meta property="og:title" content="${config.title}">`);
  tags.push(`    <meta property="og:description" content="${config.description}">`);
  // 使用 config.image 如果提供，否则使用默认 logo（Vite 打包后的真实路径）
  const imageUrl = config.image || 'https://www.starthermatech.com/assets/logo-D-3pmcxY.jpg';
  tags.push(`    <meta property="og:image" content="${imageUrl}">`);
  tags.push(`    <meta property="og:site_name" content="星焓科技">`);
  tags.push(`    <meta property="og:locale" content="zh_CN">`);
  
  // Twitter Card Tags
  tags.push(`    \n    <!-- Twitter Card Tags -->`);
  tags.push(`    <meta name="twitter:card" content="summary_large_image">`);
  tags.push(`    <meta name="twitter:title" content="${config.title}">`);
  tags.push(`    <meta name="twitter:description" content="${config.description}">`);
  tags.push(`    <meta name="twitter:image" content="${imageUrl}">`);
  
  // JSON-LD 结构化数据
  if (config.structuredData) {
    tags.push(`    \n    <!-- JSON-LD 结构化数据 -->`);
    tags.push(`    <script type="application/ld+json">`);
    tags.push(JSON.stringify(config.structuredData, null, 2).split('\n').map(line => '    ' + line).join('\n'));
    tags.push(`    </script>`);
  }
  
  return '\n' + tags.join('\n') + '\n';
}

// 注入 SEO 标签到指定 HTML 文件
function injectSeoTags(filename, config) {
  const filePath = path.join(distDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ 文件不存在: ${filePath}`);
    return false;
  }
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // 1. 修复 <html lang> 属性
  const detectedLang = detectLanguageFromPath(filePath);
  const correctLang = LANG_MAP[detectedLang] || 'zh-CN';
  
  // 替换 <html lang="zh-CN"> 为正确的语言代码
  html = html.replace(
    /<html lang="[^"]*">/,
    `<html lang="${correctLang}">`
  );
  
  // 2. 替换 <title> 标签（使用完整的 SEO 标题）
  if (config.title) {
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${config.title}</title>`
    );
  }
  
  // 检查是否已经注入过
  if (html.includes('<!-- Canonical URL -->')) {
    console.log(`  ✓ ${filename} - SEO 标签已存在，title 和 lang 已更新`);
    // 即使已注入，也要确保 title 和 lang 属性正确
    fs.writeFileSync(filePath, html, 'utf-8');
    return true;
  }
  
  // 2. 在 </head> 标签前注入 SEO 标签
  if (!html.includes('</head>')) {
    console.error(`  ✗ ${filename} - 未找到 </head> 标签`);
    return false;
  }
  
  const seoTags = generateSeoTags(config);
  html = html.replace('</head>', `${seoTags}  </head>`);
  
  // 写回文件
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`  ✓ ${filename} - Title 和 SEO 标签已注入，lang="${correctLang}"`);
  return true;
}

// 修复所有 HTML 文件的 lang 属性
function fixAllHtmlLangAttributes(dir = distDir) {
  let fixedCount = 0;
  
  function traverseDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        traverseDirectory(fullPath);
      } else if (item.endsWith('.html')) {
        // 处理 HTML 文件
        const detectedLang = detectLanguageFromPath(fullPath);
        const correctLang = LANG_MAP[detectedLang] || 'zh-CN';
        
        let html = fs.readFileSync(fullPath, 'utf-8');
        const originalHtml = html;
        
        // 替换 lang 属性
        html = html.replace(
          /<html lang="[^"]*">/,
          `<html lang="${correctLang}">`
        );
        
        // 如果有修改，写回文件
        if (html !== originalHtml) {
          fs.writeFileSync(fullPath, html, 'utf-8');
          const relativePath = path.relative(distDir, fullPath);
          console.log(`  ✓ ${relativePath} - lang 属性已修复为 "${correctLang}"`);
          fixedCount++;
        }
      }
    }
  }
  
  traverseDirectory(dir);
  return fixedCount;
}

// 主流程
console.log('========================================');
console.log('开始优化 SEO 标签和多语言属性...\n');
console.log('========================================\n');

// 第一步：修复所有 HTML 文件的 lang 属性
console.log('步骤 1: 修复所有 HTML 文件的 lang 属性');
console.log('----------------------------------------');
const langFixedCount = fixAllHtmlLangAttributes();
console.log(`✅ 完成! 修复了 ${langFixedCount} 个文件的 lang 属性\n`);

// 第二步：注入 SEO 标签到主要页面
console.log('步骤 2: 注入 SEO 标签到主要页面');
console.log('----------------------------------------');

let successCount = 0;
let totalCount = 0;

// 主要页面列表
const mainPages = ['index.html', 'about.html', 'news.html', 'contact.html', 'join.html', 'products.html'];

// 产品详情页列表
const productPages = [
  'langmuir.html',
  'faraday.html',
  'rpa.html',
  'exb.html',
  'kaufman.html',
  'hall.html',
  'cathode-arc.html',
  'rfis.html',
  'oes.html',
  'lif.html',
  'thomson.html',
  'torsion-balance.html',
  'em-balance.html',
  'calibration-service.html'
];

// 处理中文版本
for (const page of mainPages) {
  const config = getPageConfig(page, 'zh-CN');
  if (config) {
    totalCount++;
    if (injectSeoTags(page, config)) {
      successCount++;
    }
  }
}

// 处理中文版产品详情页
for (const page of productPages) {
  const productFile = path.join('products', page);
  const fullPath = path.join(distDir, productFile);
  
  if (fs.existsSync(fullPath)) {
    const config = getPageConfig(page, 'zh-CN');
    if (config) {
      totalCount++;
      if (injectSeoTags(productFile, config)) {
        successCount++;
      }
    }
  }
}

// 处理其他语言版本
const langs = ['en', 'ja', 'ru'];
for (const lang of langs) {
  // 处理语言根文件（en.html, ja.html, ru.html - 对应首页）
  const langRootFile = `${lang}.html`;
  const langRootPath = path.join(distDir, langRootFile);
  
  if (fs.existsSync(langRootPath)) {
    const config = getPageConfig('index.html', lang); // 使用首页配置
    if (config) {
      totalCount++;
      if (injectSeoTags(langRootFile, config)) {
        successCount++;
      }
    }
  }
  
  // 处理子目录下的主页面
  for (const page of mainPages) {
    const langFile = path.join(lang, page);
    const fullPath = path.join(distDir, langFile);
    
    if (fs.existsSync(fullPath)) {
      const config = getPageConfig(page, lang);
      if (config) {
        totalCount++;
        if (injectSeoTags(langFile, config)) {
          successCount++;
        }
      }
    }
  }
  
  // 处理其他语言版本的产品详情页
  for (const page of productPages) {
    const productFile = path.join(lang, 'products', page);
    const fullPath = path.join(distDir, productFile);
    
    if (fs.existsSync(fullPath)) {
      const config = getPageConfig(page, lang);
      if (config) {
        totalCount++;
        if (injectSeoTags(productFile, config)) {
          successCount++;
        }
      }
    }
  }
}

console.log(`\n✅ SEO 标签注入完成! 成功处理 ${successCount}/${totalCount} 个页面`);
console.log('\n========================================');
console.log('总结:');
console.log(`- 修复 lang 属性: ${langFixedCount} 个文件`);
console.log(`- 注入 SEO 标签: ${successCount}/${totalCount} 个主要页面`);
console.log('========================================\n');

if (successCount < totalCount) {
  // eslint-disable-next-line no-undef
  process.exit(1);
}
