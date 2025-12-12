#!/usr/bin/env node

/**
 * inject-seo-tags.js
 * 在 vite-react-ssg 构建后注入 SEO 标签到所有主要页面
 * 因为 react-helmet-async 在 vite-react-ssg 环境中不生效
 * 同时修复多语言页面的 <html lang> 属性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

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

// 页面 SEO 配置
const pageConfigs = {
  'index.html': {
    title: '星焓科技 - 等离子体诊断与电推进系统解决方案',
    description: '星焓科技专注于等离子体诊断仪器、电推进系统、等离子源及微推力架的研发与制造，为航天、材料科学、半导体等领域提供专业的测试设备与解决方案。',
    url: 'https://www.starthermatech.com/',
    type: 'website',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "星焓科技",
      "url": "https://www.starthermatech.com",
      "logo": "https://www.starthermatech.com/assets/logo.jpg",
      "description": "等离子体诊断与电推进系统解决方案提供商",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CN"
      }
    }
  },
  'about.html': {
    title: '关于我们 - 星焓科技',
    description: '星焓科技致力于等离子体诊断与电推进技术研发，团队由资深专家组成，为全球客户提供高质量的诊断设备与技术支持。',
    url: 'https://www.starthermatech.com/about',
    type: 'website'
  },
  'news.html': {
    title: '新闻动态 - 星焓科技',
    description: '了解星焓科技最新动态、行业资讯、技术进展与产品更新。',
    url: 'https://www.starthermatech.com/news',
    type: 'website'
  },
  'contact.html': {
    title: '联系我们 - 星焓科技',
    description: '联系星焓科技，获取等离子体诊断与电推进系统的专业咨询与技术支持。',
    url: 'https://www.starthermatech.com/contact',
    type: 'website'
  },
  'join.html': {
    title: '加入我们 - 星焓科技',
    description: '加入星焓科技团队，共同推动等离子体诊断与电推进技术的创新发展。',
    url: 'https://www.starthermatech.com/join',
    type: 'website'
  },
  'products.html': {
    title: '产品与服务 - 等离子体诊断与电推进解决方案 | 星焓科技',
    description: '星焓科技提供接触式/非接触式等离子体诊断仪器、等离子源、微推力架等产品，涵盖朗缪尔探针、法拉第探针、E×B探针、RPA、OES、LIF、Kaufman离子源、霍尔推力器等全系列解决方案。',
    url: 'https://www.starthermatech.com/products',
    type: 'website',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "朗缪尔探针 (Langmuir Probes)",
          "description": "自动扫描 I–V 曲线获取核心参量；支持单/双/三探针与发射探针",
          "url": "https://www.starthermatech.com/products/langmuir",
          "category": "接触式诊断仪器"
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "法拉第探针 (Faraday Probe)",
          "description": "测量束流密度与总电流，评估束流均匀性与发散角。",
          "url": "https://www.starthermatech.com/products/faraday",
          "category": "接触式诊断仪器"
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "E×B 探针 (Wien Filter)",
          "description": "按特定荷质比与速度筛选离子，用于识别羽流组分，分析不同种类离子含量与离子能量分布(IEDF)。",
          "url": "https://www.starthermatech.com/products/exb",
          "category": "接触式诊断仪器"
        },
        {
          "@type": "Product",
          "position": 4,
          "name": "阻滞能量分析仪 (RPA)",
          "description": "测量离子能量分布与离子通量，评估等离子体加工工艺",
          "url": "https://www.starthermatech.com/products/rpa",
          "category": "接触式诊断仪器"
        },
        {
          "@type": "Product",
          "position": 5,
          "name": "发射光谱 (OES)",
          "description": "粒子种类识别、密度测量，估计激发/电子温度。",
          "url": "https://www.starthermatech.com/products/oes",
          "category": "非接触式诊断"
        },
        {
          "@type": "Product",
          "position": 6,
          "name": "激光诱导荧光 (LIF)",
          "description": "可调谐激光选择性激发并检测荧光，密度与速度。",
          "url": "https://www.starthermatech.com/products/lif",
          "category": "非接触式诊断"
        },
        {
          "@type": "Product",
          "position": 7,
          "name": "汤姆逊散射 (Thomson Scattering)",
          "description": "测量电子对激光的弹性散射谱，获得温度与密度。",
          "url": "https://www.starthermatech.com/products/thomson",
          "category": "非接触式诊断"
        },
        {
          "@type": "Product",
          "position": 8,
          "name": "Kaufman等离子源系统",
          "description": "电离腔与多孔阳极，配套中和器并支持能量宽调，适合推进器地面系统与实验室束流研究。",
          "url": "https://www.starthermatech.com/products/kaufman",
          "category": "等离子源"
        },
        {
          "@type": "Product",
          "position": 9,
          "name": "霍尔离子源系统 (Hall Source)",
          "description": "E×B 漂移放电、结构紧凑，支持电推进地面寿命试验及实验室推进原型研究。",
          "url": "https://www.starthermatech.com/products/hall-source",
          "category": "等离子源"
        },
        {
          "@type": "Product",
          "position": 10,
          "name": "阴极弧等离子源系统",
          "description": "阴极蒸发并电离，输出高电流金属离子束，覆盖材料实验与表面工程验证。",
          "url": "https://www.starthermatech.com/products/cathode-arc",
          "category": "等离子源"
        },
        {
          "@type": "Product",
          "position": 11,
          "name": "射频等离子源系统 (RF/ICP)",
          "description": "射频耦合、无直流电极，洁净低损伤，专用于刻蚀/清洗等工艺线及基础研究。",
          "url": "https://www.starthermatech.com/products/rfis",
          "category": "等离子源"
        },
        {
          "@type": "Product",
          "position": 12,
          "name": "扭摆式推力架 (Torsional Thrust Stand)",
          "description": "高灵敏度扭摆结构，适合稳态与缓变推力测量。",
          "url": "https://www.starthermatech.com/products/torsion-balance",
          "category": "微推力架"
        },
        {
          "@type": "Product",
          "position": 13,
          "name": "电磁平衡式推力架 (Electromagnetic Thrust Stand)",
          "description": "电磁/静电平衡架构，支持闭环控制与快速标定，覆盖 mN 级长时推力。",
          "url": "https://www.starthermatech.com/products/em-balance",
          "category": "微推力架"
        }
      ]
    }
  }
};

// 生成 SEO 标签的函数
function generateSeoTags(config) {
  const tags = [];
  
  // Canonical URL
  tags.push(`    <!-- Canonical URL -->`);
  tags.push(`    <link rel="canonical" href="${config.url}">`);
  
  // Open Graph Tags
  tags.push(`    \n    <!-- Open Graph Tags -->`);
  tags.push(`    <meta property="og:type" content="${config.type}">`);
  tags.push(`    <meta property="og:url" content="${config.url}">`);
  tags.push(`    <meta property="og:title" content="${config.title}">`);
  tags.push(`    <meta property="og:description" content="${config.description}">`);
  tags.push(`    <meta property="og:image" content="https://www.starthermatech.com/assets/logo.jpg">`);
  tags.push(`    <meta property="og:site_name" content="星焓科技">`);
  tags.push(`    <meta property="og:locale" content="zh_CN">`);
  
  // Twitter Card Tags
  tags.push(`    \n    <!-- Twitter Card Tags -->`);
  tags.push(`    <meta name="twitter:card" content="summary_large_image">`);
  tags.push(`    <meta name="twitter:title" content="${config.title}">`);
  tags.push(`    <meta name="twitter:description" content="${config.description}">`);
  tags.push(`    <meta name="twitter:image" content="https://www.starthermatech.com/assets/logo.jpg">`);
  
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
  
  // 检查是否已经注入过
  if (html.includes('<!-- Canonical URL -->')) {
    console.log(`  ✓ ${filename} - SEO 标签已存在，lang="${correctLang}"`);
    // 即使已注入，也要确保 lang 属性正确
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
  console.log(`  ✓ ${filename} - SEO 标签已注入，lang="${correctLang}"`);
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

for (const [filename, config] of Object.entries(pageConfigs)) {
  totalCount++;
  if (injectSeoTags(filename, config)) {
    successCount++;
  }
}

console.log(`\n✅ SEO 标签注入完成! 成功处理 ${successCount}/${totalCount} 个页面`);
console.log('\n========================================');
console.log('总结:');
console.log(`- 修复 lang 属性: ${langFixedCount} 个文件`);
console.log(`- 注入 SEO 标签: ${successCount}/${totalCount} 个主要页面`);
console.log('========================================\n');

if (successCount < totalCount) {
  process.exit(1);
}
