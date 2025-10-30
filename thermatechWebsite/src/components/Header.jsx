// src/components/Header.jsx
import React from 'react';
// 1. Make sure you have your logo in this path
import logo from '../assets/images/logo.jpg'; 

export default function Header() {
  return (
    <header>
      <a href="#home" className="logo-container">
        <img src={logo} alt="Star Thermatech Logo" className="logo" />
      </a>
      <nav>
        <ul>
          <li><a href="#home">首页</a></li>
          <li><a href="#about">关于我们</a></li>
          <li><a href="#products">产品中心</a></li>
          <li><a href="#news">新闻资讯</a></li>
          <li><a href="#join">招贤纳士</a></li>
          <li><a href="#contact">联系我们</a></li>
        </ul>
      </nav>
    </header>
  );
}