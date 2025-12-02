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
          
        </div>

        {/* 第 2 列: 产品与服务 */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>
            <Link
              to="/products"
              onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
            >
              产品与服务
            </Link>
          </h4>
          <ul className={styles.linkList}>
            <li><Link to="/products#contact-diagnostics">接触式诊断仪器产品</Link></li>
            <li><Link to="/products#non-contact-diagnostics">非接触式诊断（光学类）系统</Link></li>
            <li><Link to="/products#ion-sources">等离子源</Link></li>
            <li><Link to="/products#thrust-measurement">微推力架</Link></li>
            <li><Link to="/products#services">服务：测试系统/平台能力建设、模型建立与仿真、地面测试/诊断服务</Link></li>
          </ul>
        </div>

        {/* 第 3 列: 联系我们 */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>联系我们</h4>
          <ul className={styles.linkList}>
            <li>地址：北京市海淀区学院路35号世宁大厦14层1408-003</li>
            <li>邮箱：bd@starthermatech.com</li>
            <li>服务热线：18519685090</li>
            <li>邮编：100083</li>
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
          <span>|</span>
          <Link to="/sitemap">网站地图</Link>
        </nav>
        <p className={styles.copyright}>
          Copyright 版权所有 2025 星焓科技 (北京) 有限公司 All rights reserved
        </p>
        <p className={styles.icp}>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">京ICP备2023008410号-3</a>
        </p>
      </div>
    </footer>
  );
}
