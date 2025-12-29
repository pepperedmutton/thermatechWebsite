# SEO 实现文档

## 概述
本文档记录了网站 SEO 优化的完整实现方案，包括 Open Graph 标签、Twitter Card、meta 标签优化和图片 alt 属性等。

## 实现的功能

### 1. SEOMeta 组件 (`src/i18n/SEOMeta.tsx`)

创建了一个集中管理 SEO 元标签的 React 组件，包含以下功能：

#### 基础 Meta 标签
- `<title>` - 页面标题
- `<meta name="description">` - 页面描述
- `<meta name="keywords">` - 关键词（可选）

#### 标准链接
- `<link rel="canonical">` - 规范 URL
- `<link rel="alternate" hreflang>` - 多语言支持（zh-CN, en, ja, ru-RU）
- `<link rel="alternate" hreflang="x-default">` - 默认语言

#### Open Graph 标签（社交媒体分享）
- `og:type` - 页面类型（website/article）
- `og:site_name` - 网站名称
- `og:title` - 分享标题
- `og:description` - 分享描述
- `og:url` - 页面 URL
- `og:image` - 分享图片
- `og:image:alt` - 图片替代文本
- `og:locale` - 当前语言
- `og:locale:alternate` - 备选语言（3种）
- `og:article:*` - 文章元信息（仅 article 类型）

#### Twitter Card 标签
- `twitter:card` - 卡片类型（summary_large_image）
- `twitter:title` - Twitter 标题
- `twitter:description` - Twitter 描述
- `twitter:image` - Twitter 图片

### 2. 使用方式

#### 2.1 网站页面（Website）
```jsx
<SEOMeta
  title="首页 | 星焓科技"
  description="星焓科技专注低温等离子体诊断..."
  keywords="等离子体, 诊断, 电推进"
  pathname="/"
  image="https://www.starthermatech.com/og-home.jpg"
  imageAlt="星焓科技 - 低温等离子体诊断与空间电推进技术服务商"
/>
```

#### 2.2 文章页面（Article）
```jsx
<SEOMeta
  title="长征12A火箭成功回收 | 星焓科技新闻"
  description="长征12A火箭完成首次可重复使用试验..."
  pathname="/news/long-march-12a-reusable"
  type="article"
  article={{
    publishedTime: "2025-12-23T00:00:00Z",
    modifiedTime: "2025-12-23T00:00:00Z",
    author: "星焓科技编辑部",
    section: "航天新闻",
    tags: ['长征12A', '可重复使用火箭', '航天技术', '中国航天']
  }}
/>
```

### 3. 已应用的页面

所有主要页面都已集成 SEOMeta 组件：

#### 核心页面
- ✅ [HomePage.jsx](src/pages/Home/HomePage.jsx) - 首页
- ✅ [ProductsPage.jsx](src/pages/Products/ProductsPage.jsx) - 产品页
- ✅ [AboutPage.jsx](src/pages/About/AboutPage.jsx) - 关于页
- ✅ [NewsPage.jsx](src/pages/News/NewsPage.jsx) - 新闻页
- ✅ [ContactPage.jsx](src/pages/Contact/ContactPage.jsx) - 联系页
- ✅ [JoinPage.jsx](src/pages/Join/JoinPage.jsx) - 招聘页

#### 新闻文章
- ✅ [LongMarch12APage.jsx](src/pages/News/pages/LongMarch12APage.jsx) - 长征12A新闻

### 4. 图片 Alt 属性优化

所有图片都已配置合适的 alt 属性：

#### 系统图片
- Logo: `{t('common.brand.short')}` - "星焓科技"
- 二维码: `{t('contact.qr.alt')}` - "星焓科技微信公众号二维码"
- 参数表: `{t('home.parameters.imageAlt')}` - "Thermatech 产品参数表"

#### 产品图片
- 产品轮播图: `${title} ${i + 1}` - 例如 "朗缪尔探针 1"

#### 新闻图片
- 新闻配图: 使用 i18n 翻译的 alt 属性
- 列表缩略图: 文章标题

### 5. Meta Description 优化

所有页面都已配置详细的 meta description，存放在对应的翻译文件中：

#### 示例（中文）
```json
{
  "meta.description": "星焓科技（北京）有限公司专注低温等离子体诊断与空间电推进测试，提供朗缪尔探针、法拉第探针、RPA 等完整测量系统及等离子源、微推力架等交钥匙方案，面向高校、科研院所和企业提供定制化产品与技术服务。"
}
```

#### 支持语言
- ✅ 中文 (zh-CN)
- ✅ 英文 (en)
- ✅ 日文 (ja)
- ✅ 俄文 (ru-RU)

## 技术细节

### TypeScript 类型定义
```typescript
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
```

### 依赖项
- `react-helmet-async` - 异步管理 head 标签
- `../../i18n/i18n` - 国际化支持
- `../../i18n/seo` - SEO 工具函数

### 关键函数
- `buildCanonicalUrl(locale, pathname)` - 构建规范 URL
- `buildHreflangLinks(pathname)` - 生成 hreflang 链接
- `getOgLocale(locale)` - 转换为 OG 格式的语言代码
- `getOgLocaleAlternates(locale)` - 获取备选语言列表

## 验证和测试

### 1. Open Graph 调试工具
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. SEO 检查工具
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

### 3. 本地测试
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 检查生成的 HTML 文件
# 查看 dist/index.html, dist/products.html 等
```

## 最佳实践

### Open Graph 图片规格
- **尺寸**: 1200×630 像素（推荐）
- **比例**: 1.91:1
- **格式**: JPG 或 PNG
- **大小**: < 8 MB
- **最小**: 600×315 像素

### Meta Description 长度
- **理想长度**: 150-160 字符
- **移动端**: 120 字符以内更优
- **避免**: 重复关键词堆砌

### Alt 属性编写
- **描述性**: 准确描述图片内容
- **简洁**: 125 字符以内
- **关键词**: 自然包含相关关键词
- **避免**: "图片"、"照片"等冗余词

## 待完成任务

### 1. 创建 OG 图片
需要为每个主要页面创建 Open Graph 图片（1200×630px）：

- [ ] `/public/og-home.jpg` - 首页
- [ ] `/public/og-products.jpg` - 产品页
- [ ] `/public/og-about.jpg` - 关于页
- [ ] `/public/og-news.jpg` - 新闻页
- [ ] `/public/og-contact.jpg` - 联系页
- [ ] `/public/og-join.jpg` - 招聘页

### 2. 产品详情页 SEO
将 SEOMeta 组件应用到所有产品详情页：

- [ ] LangmuirPage.jsx
- [ ] FaradayPage.jsx
- [ ] ExBPage.jsx
- [ ] RPAPage.jsx
- [ ] KaufmanPage.jsx
- [ ] HallSourcePage.jsx
- [ ] 等...

### 3. 其他新闻文章
- [ ] ElectricPropulsionPage.jsx
- [ ] RashidLangmuirPage.jsx

## 维护说明

### 添加新页面时
1. 在翻译文件中添加 `meta.title` 和 `meta.description`
2. 导入 SEOMeta 组件：`import SEOMeta from '../../i18n/SEOMeta';`
3. 在页面组件中使用 SEOMeta
4. 创建对应的 OG 图片（可选）

### 修改现有页面
1. 更新翻译文件中的 meta 信息
2. 如需修改 OG 图片，替换 `/public/og-*.jpg` 文件
3. 重新构建并测试

## 参考资源

### 官方文档
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)

### SEO 指南
- [Google Search Central](https://developers.google.com/search/docs)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Ahrefs SEO Guide](https://ahrefs.com/seo)

---

**最后更新**: 2025-12-26
**维护者**: 星焓科技技术团队
