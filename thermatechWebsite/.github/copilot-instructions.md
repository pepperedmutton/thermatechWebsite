## 目的
为 AI 编码代理提供本仓库的可执行上下文：项目结构、常用命令、代码习惯与常见变更点示例，便于快速、安全地贡献代码。

## 快速启动（开发者命令）
- 本地开发（启动 Vite 开发服务器，启用 HMR）：
  - `npm run dev` （等同于 `vite`）
- 生产打包：
  - `npm run build` （等同于 `vite build`）
- 本地预览构建：
  - `npm run preview` （等同于 `vite preview`）
- 代码风格检查：
  - `npm run lint`（使用项目根目录的 `eslint.config.js`）

## 项目概览（大局）
- 前端：React + Vite（见 `package.json` & `vite.config.js`）。无后端服务，输出为静态资产。
- 路由：使用 `react-router-dom`，入口在 `src/main.jsx`（BrowserRouter 包裹），路由定义在 `src/App.jsx`。
- 页面目录：所有页面在 `src/pages/*`，每个页面通常有 `Page.jsx` 与一个 `components/` 子目录（例如 `src/pages/Products/`）。
- 共享组件：`src/components/` 下放置站点级 UI（例如 `Header.jsx`、`Footer.jsx`、`Background.jsx`）。
- 静态资源：图片在 `src/assets/images/`，通过 import（例如 `import logo from '../assets/images/logo.jpg'`）直接使用。
- 样式：采用 CSS Modules（文件名形如 `*.module.css`），以及少量全局样式在 `src/App.css`。
- 数学渲染：使用 `katex` + `react-katex`（例如在 `src/pages/Products/ProductsPage.jsx` 中的 `InlineMath`）。

## 项目约定与可见模式（重要）
- 路由与锚点：导航下拉使用 `Link to="/products#contact-diagnostics"`，对应页面在 `ProductsPage.jsx` 中用 `id="contact-diagnostics"`。如果新增锚点，请在页面中添加对应 `id` 并保持 Header 的下拉项同步。
- 新页面：在 `src/pages/` 新建子目录 -> 添加 `XxxPage.jsx` 并在 `src/App.jsx` 导入并注册路由（例如新增 `/products/langmuir` 要同时在 `App.jsx` 中添加 Route 并在 `pages/Products/pages/` 添加详情组件）。
- 组件放置：通用/可复用组件放 `src/components/`；页面特定组件放在对应页面的 `components/` 子目录。
- CSS：优先用 CSS Modules（`Header.module.css` 示例），避免全局类冲突。若改动样式，修改对应模块文件并更新组件导入。
- 资源导入：使用相对导入，确保路径正确（Windows 环境下注意大小写在构建时仍可影响跨平台部署）。

## 常见变更示例（示范性步骤）
- 添加路由页面：
  1. 在 `src/pages/YourPage/` 添加 `YourPage.jsx`（并放入 `components/` 如需子组件）。
  2. 在 `src/App.jsx` 导入并增加 <Route path="/yourpage" element={<YourPage/>} />。
  3. 若需要导航项，修改 `src/components/Header.jsx`，保持下拉菜单与 CSS 类一致（参考已有的 dropdownMenu 实现）。
- 添加页面锚点（Header 下拉直接跳转到页面内节）：
  1. 在页面 section 添加 `id="your-anchor"`。
  2. 在 `Header.jsx` 中添加 `Link to="/products#your-anchor"`。
  3. 若需要平滑滚动或 hash 跳转，参考 `ProductsPage.jsx` 中的 useLocation + scrollIntoView 实现。

## 集成点与依赖注意事项
- 主要依赖在 `package.json`：React、react-router-dom(v7)、katex、react-katex、Vite。避免随意升级 major 版本，特别是 `react-router-dom`（路由语法在 v6/v7 间有差异）。
- ESLint：配置文件为 `eslint.config.js`，请在改动 JS/JSX 前运行 `npm run lint` 进行快速检查。

## 调试提示
- 使用 `npm run dev` + 浏览器打开 localhost（默认端口 5173）以利用 HMR 与快速反馈。
- 常见定位点：
  - 路由问题：`src/App.jsx`、`src/main.jsx`（是否以 BrowserRouter 包裹）。
  - 样式冲突：检查是否使用了 `.module.css` 并确认组件是否以 `import styles from './X.module.css'` 使用。
  - 图片/资源丢失：确认相对路径与文件名拼写，构建时注意大小写问题。

## 合并指引（如果已有 .github/copilot-instructions.md）
- 若仓库已有文件，保留任何关于流程或安全的重要内容（例如提交/PR 模板、批准流程），并把本文件中的“项目约定”与“示例”合并进原文件。

## 联系与迭代
- 本文件基于代码库可发现内容自动生成。若有未覆盖的约定（例如私有构建脚本、外部 API 密钥使用、发布流程），请补充说明；我可以根据补充内容迭代此文件。

---
References: `src/main.jsx`, `src/App.jsx`, `src/components/Header.jsx`, `src/pages/Products/ProductsPage.jsx`, `eslint.config.js`, `vite.config.js`, `package.json`
