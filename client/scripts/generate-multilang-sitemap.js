#!/usr/bin/env node

/**
 * generate-multilang-sitemap.js
 * 生成多语言 sitemap.xml，包含所有语言版本和 hreflang 标签
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

const BASE_URL = 'https://www.starthermatech.com';
const LOCALES = [
  { code: 'zh-CN', prefix: '', hreflang: 'zh-CN' },
  { code: 'en', prefix: '/en', hreflang: 'en' },
  { code: 'ja', prefix: '/ja', hreflang: 'ja' },
  { code: 'ru-RU', prefix: '/ru', hreflang: 'ru-RU' },
];

// 所有路由路径（不含语言前缀）
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/products/langmuir', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/faraday', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/exb', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/rpa', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/oes', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/lif', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/thomson', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/kaufman', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/cathode-arc', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/rfis', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/hall-source', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/torsion-balance', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/em-balance', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/calibration-service', priority: '0.7', changefreq: 'monthly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
  { path: '/news/electric-propulsion', priority: '0.6', changefreq: 'monthly' },
  { path: '/join', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.8', changefreq: 'weekly' },
];

function buildUrl(locale, path) {
  const cleanPath = path === '/' ? '' : path;
  return `${BASE_URL}${locale.prefix}${cleanPath}`;
}

function generateHreflangLinks(path) {
  return LOCALES.map(locale => {
    const url = buildUrl(locale, path);
    return `    <xhtml:link rel="alternate" hreflang="${locale.hreflang}" href="${url}"/>`;
  }).join('\n');
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  routes.forEach(route => {
    // 为每个路由的每种语言生成一个 <url> 条目
    LOCALES.forEach(locale => {
      const url = buildUrl(locale, route.path);
      
      xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${generateHreflangLinks(route.path)}
    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(LOCALES[0], route.path)}"/>
  </url>
`;
    });
  });

  xml += `</urlset>
`;

  return xml;
}

// 生成并写入文件
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`✓ Multi-language sitemap generated: ${outputPath}`);
console.log(`  - Total routes: ${routes.length}`);
console.log(`  - Total languages: ${LOCALES.length}`);
console.log(`  - Total URLs: ${routes.length * LOCALES.length}`);
