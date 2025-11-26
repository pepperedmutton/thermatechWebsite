# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact form storage (important)

- The contact form API (`POST /api/contact`) saves messages to two places:
  - Local: `server/data/messages.json`
  - External, cross-deployment storage: `../message.json` relative to the repo (i.e., sibling to `thermatechWebsite`; on Windows this is `C:\Users\...\Desktop\message.json` if the repo lives at `C:\Users\...\Desktop\thermatechWebsite`)
- The external file is append-only so we never lose past submissions across deployments. Do not replace or truncate it; writes must append new entries.
- If a messages file is missing, the backend initializes it as an empty array and then appends.
- If a messages file exists but is not valid JSON array, the backend will reinitialize it to an empty array (`[]`) before appending new entries.
- If you change the storage path, update operations scripts (e.g. `sync_msg.ps1`) accordingly and ensure the process still has write permission to the target directory.
