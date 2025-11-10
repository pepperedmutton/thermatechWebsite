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

关键文件示例：
- `src/main.jsx` — 应用入口（BrowserRouter）
- `src/App.jsx` — 路由表与页面注册
- `src/components/Header.jsx` — 顶部导航，含下拉 & 锚点链接示例
- `src/pages/Products/ProductsPage.jsx` — 使用 `useLocation` + scrollIntoView 的 hash 跳转实现

## 项目约定（必须遵守）
- 路由/锚点：Header 下拉使用 `Link to="/products#anchor-id"`，对应页面内 section 通过 `id="anchor-id"` 暴露锚点。
- 页面新增：在 `src/pages/Xxx/` 新建 `XxxPage.jsx`（及 `components/` 子目录），并在 `src/App.jsx` 导入并添加 `<Route path="/xxx" element={<XxxPage/>} />`。
- 样式：优先使用 CSS Modules（`Component.module.css`），避免全局类名。若添加样式文件，按组件同目录放置并用 `import styles from './X.module.css'`。
- 资源：图片放 `src/assets/images/` 并通过相对 import 使用（注意构建时大小写敏感）。

## 示例：添加路由与导航项（最常见任务）
1. 创建 `src/pages/NewPage/NewPage.jsx`（及必要 `components/`）。
2. 在 `src/App.jsx` 导入并注册路由：
   - `<Route path="/newpage" element={<NewPage/>} />`
3. （如需 Header 中展示）在 `src/components/Header.jsx` 添加 `Link`，或在导航下拉添加 `Link to="/newpage"`。

## 注意事项与集成点
- 不要更新 `react-router-dom` 的 major 版本（项目当前为 v7.x，路由 API 在 major 版本间破坏性变化大）。
- ESLint：本仓库使用 `eslint.config.js`（根目录），请在提交前运行 `npm run lint`。
- 构建/预览：`npm run build` 生成静态文件，`npm run preview` 本地预览 build 输出。
- Windows 下开发：本地文件名大小写在 Windows 上不敏感，但部署到 Linux 时会出问题——确保导入路径大小写与磁盘文件名一致。

## 发现问题时的定位点（快速导航）
- 路由与页面渲染问题： `src/App.jsx`, `src/main.jsx`, 对应 `src/pages/*`
- 顶部/导航问题： `src/components/Header.jsx` 和 `Header.module.css`
- 页面内部滚动/锚点： `src/pages/Products/ProductsPage.jsx`（有 hash -> scroll 的实现，可复制）

## 更改合并指引
- 若仓库已有 `.github/copilot-instructions.md`，请保留任何流程/安全/PR 模板条目，将本文件中的“约定/示例”与之合并；不要删除审批或发布相关条目。

---
References: `src/main.jsx`, `src/App.jsx`, `src/components/Header.jsx`, `src/pages/Products/ProductsPage.jsx`, `eslint.config.js`, `package.json`
