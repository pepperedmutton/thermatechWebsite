// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // 导入专属 CSS 模块
import logo from '../assets/images/logo.jpg'; // 导入您的 logo

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* 第 1 列: Logo 和 公司信息 */}
        <div className={styles.footerColumn}>
          <img src={logo} alt="星焓科技 Logo" className={styles.logo} />
          <h3 className={styles.companyName}>星焓科技 (北京) 有限公司</h3>
          <p className={styles.companySlogan}>STARENTHALPY TECHNOLOGY (BEIJING) CO., LTD</p>
          <p className={styles.ctaText}>想要了解更多，欢迎您留言咨询</p>
          <Link to="/contact" className={styles.ctaButton}>
            了解更多
          </Link>
        </div>

        {/* 第 2 列: 产品中心 */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>产品中心</h4>
          <ul className={styles.linkList}>
            <li><Link to="/products">等离子体源</Link></li>
            <li><Link to="/products">等离子体诊断仪器产品</Link></li>
            <li><Link to="/products">微推力测量装置</Link></li>
            <li><Link to="/products">测试服务</Link></li>
          </ul>
        </div>

        {/* 第 3 列: 联系我们 */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>联系我们</h4>
          <ul className={styles.linkList}>
            <li>地址：北京市海淀区学院路35号世宁大厦14层1408-003</li>
            <li>服务热线：18519685090</li>
            <li>邮编：100083</li>
            <li>邮箱：bd@starthermatech.com</li>
          </ul>
        </div>

      </div>

      {/* 底部导航栏 */}
      <div className={styles.footerBottomBar}>
        <nav className={styles.bottomLinks}>
          <Link to="/">首页</Link>
          <span>|</span>
          <Link to="/about">关于我们</Link>
          <span>|</span>
          <Link to="/products">产品中心</Link>
          <span>|</span>
          <Link to="/news">新闻资讯</Link>
          <span>|</span>
          <Link to="/join">招贤纳士</Link>
          <span>|</span>
          <Link to="/contact">联系我们</Link>
        </nav>
        <p className={styles.copyright}>
          Copyright 版权所有 2024 星焓科技 (北京) 有限公司 All rights reserved
        </p>
      </div>
    </footer>
  );
}
