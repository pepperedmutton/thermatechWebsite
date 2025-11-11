// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. 导入 BrowserRouter
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 用 BrowserRouter 包裹 App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)