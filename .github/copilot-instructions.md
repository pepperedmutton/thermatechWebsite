## 目的
为进入此仓库的 AI 编码代理提供一个短小、可执行的参考：快速启动命令、架构要点、项目约定与最常见改动示例（如新增产品详情页）。

## 快速命令
- 本地开发（带 HMR）：npm run dev
- 生产打包：npm run build
- 预览 build：npm run preview
- 代码风格检查（ESLint）：npm run lint

（主要技术：React + Vite；router 版本为 v7.x，请勿随意升级 major 版本）

## 一句架构概览
单页静态站点（React + Vite）。入口 `src/main.jsx`（BrowserRouter），路由集中在 `src/App.jsx`，页面按 `src/pages/*` 目录组织，复用组件在 `src/components/`，样式优先使用 CSS Modules（`*.module.css`）。

## 项目关键约定（必须遵守）
- 产品详情页统一使用 `src/pages/Products/pages/components/ProductDetail.jsx` 和样式 `ProductDetailPage.module.css`。
- 路由/锚点：Header/Footer 中使用 `Link to="/products#anchor-id"`，页面内部暴露 `id="anchor-id"`。
- 资源（图片）放在 `src/assets/images/`，导入路径大小写必须与磁盘一致（Windows 开发注意部署到 Linux 的大小写问题）。
- 样式：优选 CSS Modules（例如 `ProductCard.module.css`），避免新增全局样式类。

## 最常见任务：新增产品详情页（直接可用的步骤）
1. 在 `src/pages/Products/pages/` 新建 `NewProductPage.jsx`。
2. 使用共享模板：
   import ProductDetail from './components/ProductDetail';
   import styles from './ProductDetailPage.module.css';
   然后在页面中渲染 <ProductDetail id="new" title="..." overview={...} features={[...]} specs={[...]} galleryImages={[...]} />
3. 在 `src/App.jsx` 导入并注册路由：
   import NewProductPage from './pages/Products/pages/NewProductPage';
   <Route path="/products/new-product" element={<NewProductPage />} />
4. 在 `src/pages/Products/ProductsPage.jsx` 为对应的 `ProductCard` 添加 `to="/products/new-product"`。

## 常见定位点（调试/修改常用文件）
- 入口与路由：`src/main.jsx`, `src/App.jsx`
- 全局组件：`src/components/Header.jsx`, `src/components/Footer.jsx`
- 产品总览与卡片：`src/pages/Products/ProductsPage.jsx`, `src/pages/Products/components/ProductCard.jsx`
- 产品详情模板：`src/pages/Products/pages/components/ProductDetail.jsx`, `src/pages/Products/pages/ProductDetailPage.module.css`
- 新闻列表：`src/pages/News/components/NewsList.jsx`

## 额外注意事项
- 保持 `react-router-dom` major 版本不变（项目依赖 v7.x）。
- 在提交前运行 `npm run lint`（项目根含 `eslint.config.js`）。
- 若修改或添加图片，放入 `src/assets/images/<folder>` 并使用相对 import（部署环境对大小写敏感）。

## 快速示例：ProductDetail props 约定（可直接复制）
- overview: ReactNode（简介段落）
- features: string[]（要点列表）
- specs: Array<[string, string, string?]>（行式规格）
- galleryImages: string[]（已导入的图片路径数组）

---
如果你希望我把这个精简版合并后再补充示例代码片段（例如完整的 NewProductPage.jsx 模板或快速单元测试），回复告诉我想要哪一项，我会继续补齐。 
