// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. 导入 HashRouter (用于单文件 HTML 支持)
import { HashRouter } from 'react-router-dom'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 用 HashRouter 包裹 App (支持 file:// 协议) */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)