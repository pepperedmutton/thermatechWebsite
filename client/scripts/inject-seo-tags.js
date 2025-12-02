#!/usr/bin/env node

/**
 * inject-seo-tags.js
 * 在 vite-react-ssg 构建后注入 SEO 标签到 products.html
 * 因为 react-helmet-async 在 vite-react-ssg 环境中不生效
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const productsHtml = path.join(distDir, 'products.html');

// SEO 标签定义
const seoTags = `
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.starthermatech.com/products">
    
    <!-- Open Graph Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.starthermatech.com/products">
    <meta property="og:title" content="产品与服务 - 等离子体诊断与电推进解决方案 | 星焓科技">
    <meta property="og:description" content="星焓科技提供接触式/非接触式等离子体诊断仪器、等离子源、微推力架等产品，涵盖朗缪尔探针、法拉第探针、E×B探针、RPA、OES、LIF、Kaufman离子源、霍尔推力器等全系列解决方案。">
    <meta property="og:image" content="https://www.starthermatech.com/assets/logo.jpg">
    <meta property="og:site_name" content="星焓科技">
    <meta property="og:locale" content="zh_CN">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="产品与服务 - 等离子体诊断与电推进解决方案 | 星焓科技">
    <meta name="twitter:description" content="星焓科技提供接触式/非接触式等离子体诊断仪器、等离子源、微推力架等产品，涵盖朗缪尔探针、法拉第探针、E×B探针、RPA、OES、LIF、Kaufman离子源、霍尔推力器等全系列解决方案。">
    <meta name="twitter:image" content="https://www.starthermatech.com/assets/logo.jpg">
    
    <!-- JSON-LD 结构化数据 -->
    <script type="application/ld+json">
{
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
      "name": "激光吸收光谱 (LAS)",
      "description": "窄线宽激光扫频获取吸收谱线，实时量化特定粒子绝对密度。",
      "url": "https://www.starthermatech.com/products/las",
      "category": "非接触式诊断"
    },
    {
      "@type": "Product",
      "position": 9,
      "name": "Kaufman等离子源系统",
      "description": "电离腔与多孔阳极，配套中和器并支持能量宽调，适合推进器地面系统与实验室束流研究。",
      "url": "https://www.starthermatech.com/products/kaufman",
      "category": "等离子源"
    },
    {
      "@type": "Product",
      "position": 10,
      "name": "霍尔离子源系统 (Hall Source)",
      "description": "E×B 漂移放电、结构紧凑，支持电推进地面寿命试验及实验室推进原型研究。",
      "url": "https://www.starthermatech.com/products/hall-source",
      "category": "等离子源"
    },
    {
      "@type": "Product",
      "position": 11,
      "name": "阴极弧等离子源系统",
      "description": "阴极蒸发并电离，输出高电流金属离子束，覆盖材料实验与表面工程验证。",
      "url": "https://www.starthermatech.com/products/cathode-arc",
      "category": "等离子源"
    },
    {
      "@type": "Product",
      "position": 12,
      "name": "射频等离子源系统 (RF/ICP)",
      "description": "射频耦合、无直流电极，洁净低损伤，专用于刻蚀/清洗等工艺线及基础研究。",
      "url": "https://www.starthermatech.com/products/rfis",
      "category": "等离子源"
    },
    {
      "@type": "Product",
      "position": 13,
      "name": "扭摆式推力架 (Torsional Thrust Stand)",
      "description": "高灵敏度扭摆结构，适合稳态与缓变推力测量。",
      "url": "https://www.starthermatech.com/products/torsion-balance",
      "category": "微推力架"
    },
    {
      "@type": "Product",
      "position": 14,
      "name": "电磁平衡式推力架 (Electromagnetic Thrust Stand)",
      "description": "电磁/静电平衡架构，支持闭环控制与快速标定，覆盖 mN 级长时推力。",
      "url": "https://www.starthermatech.com/products/em-balance",
      "category": "微推力架"
    }
  ]
}
    </script>`;

// 读取 products.html
if (!fs.existsSync(productsHtml)) {
  console.error(`❌ 文件不存在: ${productsHtml}`);
  process.exit(1);
}

let html = fs.readFileSync(productsHtml, 'utf-8');

// 检查是否已经注入过
if (html.includes('<!-- Canonical URL -->')) {
  console.log('✅ SEO 标签已存在，跳过注入');
  process.exit(0);
}

// 在 </head> 标签前注入
if (!html.includes('</head>')) {
  console.error('❌ 未找到 </head> 标签');
  process.exit(1);
}

html = html.replace('</head>', `${seoTags}\n  </head>`);

// 写回文件
fs.writeFileSync(productsHtml, html, 'utf-8');
console.log('✅ SEO 标签已成功注入到 dist/products.html');
