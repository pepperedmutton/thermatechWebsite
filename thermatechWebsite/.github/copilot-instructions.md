## 目的
为 AI 编码代理提供一个短小、可执行的项目上下文：快速启动命令、架构要点、约定与常见改动示例，便于安全且高效地做小改动或添加页面。

## 快速命令（复制粘贴可用）
- 本地开发（启用 HMR）： `npm run dev`
- 生产打包： `npm run build`
- 预览构建： `npm run preview`
- 代码风格检查（ESLint）： `npm run lint` （项目根使用 `eslint.config.js`）

（本项目依赖摘录：React ^19.1.1、`react-router-dom` ^7.9.5、Vite。不要随意升级 router major 版本。）

## 大局架构 — 一句话说明
React + Vite 的单页静态站点。路由集中在 `src/App.jsx`，入口 `src/main.jsx` 用 BrowserRouter 包裹。页面按目录组织在 `src/pages/*`，共享 UI 放在 `src/components/`，样式使用 CSS Modules（`*.module.css`）。

**产品详情页**：所有产品详情页（如 `LangmuirPage.jsx`）都复用 `src/pages/Products/pages/components/ProductDetail.jsx` 组件来渲染，并共享 `src/pages/Products/pages/ProductDetailPage.module.css` 样式。

关键文件示例：
- `src/main.jsx` — 应用入口（BrowserRouter）
- `src/App.jsx` — 路由表与页面注册，包含路由切换时滚动到顶部的全局逻辑。
- `src/components/Header.jsx` — 顶部导航，含下拉 & 锚点链接示例。
- `src/pages/Products/ProductsPage.jsx` — 产品总览页，包含 `ProductCard` 列表与多个诊断表格。
- `src/pages/Products/pages/components/ProductDetail.jsx` — **所有产品详情页的共享布局模板**。
- `src/pages/News/components/NewsList.jsx` — 新闻列表页，含文章卡片布局。

## 项目约定（必须遵守）
- 路由/锚点：Header/Footer 使用 `Link to="/products#anchor-id"`，对应页面内 section 通过 `id="anchor-id"` 暴露锚点。
- **新增产品详情页**：
  1. 在 `src/pages/Products/pages/` 下创建 `NewProductPage.jsx`。
  2. 页面组件必须使用 `ProductDetail`，并传入 `overview`, `features`, `specs` (三元组数组成员) 和 `galleryImages` 等 props。
  3. 在 `src/App.jsx` 中导入新页面并添加路由，如 `<Route path="/products/new-product" ... />`。
  4. 在 `src/pages/Products/ProductsPage.jsx` 中找到对应的 `ProductCard`，为其添加 `to="/products/new-product"` 链接。
- 样式：优先使用 CSS Modules（`Component.module.css`），避免全局类名。产品详情页统一使用 `ProductDetailPage.module.css`。
- 资源：图片放 `src/assets/images/` 并通过相对 import 使用（注意构建时大小写敏感）。

## 示例：添加产品详情页（最常见任务）
1.  在 `src/pages/Products/pages/` 目录下创建 `NewProductPage.jsx`。
2.  在 `NewProductPage.jsx` 中，导入并使用 `ProductDetail` 组件，填充其 props：
    ```jsx
    import ProductDetail from './components/ProductDetail';
    import styles from './ProductDetailPage.module.css'; // 复用样式
    
    export default function NewProductPage() {
      return (
        <div className={styles.pageWrapper}>
          {/* ...页面标题与简介... */}
          <ProductDetail
            id="new-product"
            title="新产品标题"
            overview={<>产品概述...</>}
            features={['特性1', '特性2']}
            specs={[['规格名', '规格值', '备注']]}
            galleryImages={[] /* 导入图片数组 */}
          />
        </div>
      );
    }
    ```
3.  在 `src/App.jsx` 导入并注册路由：
    - `import NewProductPage from './pages/Products/pages/NewProductPage';`
    - `<Route path="/products/new-product" element={<NewProductPage />} />`
4.  在 `src/pages/Products/ProductsPage.jsx` 中为对应的 `ProductCard` 添加 `to` 属性：
    - `<ProductCard to="/products/new-product" ... />`

## 注意事项与集成点
- 不要更新 `react-router-dom` 的 major 版本（项目当前为 v7.x，路由 API 在 major 版本间破坏性变化大）。
- ESLint：本仓库使用 `eslint.config.js`（根目录），请在提交前运行 `npm run lint`。
- 构建/预览：`npm run build` 生成静态文件，`npm run preview` 本地预览 build 输出。
- Windows 下开发：本地文件名大小写在 Windows 上不敏感，但部署到 Linux 时会出问题——确保导入路径大小写与磁盘文件名一致。

## 发现问题时的定位点（快速导航）
- 路由与页面渲染问题： `src/App.jsx`, `src/main.jsx`, 对应 `src/pages/*`
- 顶部/导航/页脚问题： `src/components/Header.jsx`, `src/components/Footer.jsx`
- 产品总览页问题： `src/pages/Products/ProductsPage.jsx`
- **产品详情页样式/布局问题**：`src/pages/Products/pages/components/ProductDetail.jsx`, `src/pages/Products/pages/ProductDetailPage.module.css`
- 新闻页问题：`src/pages/News/NewsPage.jsx`, `src/pages/News/components/NewsList.jsx`

## 更改合并指引
- 若仓库已有 `.github/copilot-instructions.md`，请保留任何流程/安全/PR 模板条目，将本文件中的“约定/示例”与之合并；不要删除审批或发布相关条目。

---
References: `src/main.jsx`, `src/App.jsx`, `src/components/Header.jsx`, `src/pages/Products/ProductsPage.jsx`, `eslint.config.js`, `package.json`
