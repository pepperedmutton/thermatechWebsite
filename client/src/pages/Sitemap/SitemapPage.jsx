import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './SitemapPage.module.css';

export default function SitemapPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>网站地图 | Starthermatech</title>
        <meta name="description" content="星焓科技（北京）有限公司网站地图，包含所有产品与服务页面链接" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className={styles.title}>网站地图</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>主要页面</h2>
        <ul className={styles.linkList}>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/about">关于我们</Link></li>
          <li><Link to="/products">产品与服务</Link></li>
          <li><Link to="/news">新闻动态</Link></li>
          <li><Link to="/join">加入我们</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>接触式诊断仪器产品</h2>
        <ul className={styles.linkList}>
          <li>
            <Link to="/products/langmuir">XHINS-LP系列朗缪尔探针 (Langmuir Probes)</Link>
            <p className={styles.linkDesc}>单探针、双探针、三探针及发射探针，测量电子密度、电子温度等</p>
          </li>
          <li>
            <Link to="/products/faraday">XHINS-FP系列法拉第探针 (Faraday Probes)</Link>
            <p className={styles.linkDesc}>测量离子流密度、离子束电流密度分布等</p>
          </li>
          <li>
            <Link to="/products/exb">XHINS-ExB系列E×B探针 (E×B Probes)</Link>
            <p className={styles.linkDesc}>测量离子能量分布、离子速度分布等</p>
          </li>
          <li>
            <Link to="/products/rpa">XHINS-RPA系列延迟势分析仪 (Retarding Potential Analyzer)</Link>
            <p className={styles.linkDesc}>测量离子能量分布、离子束发散角等</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>非接触式诊断（光学类）系统</h2>
        <ul className={styles.linkList}>
          <li>
            <Link to="/products/oes">XHINS-OES系列发射光谱诊断系统 (Optical Emission Spectroscopy)</Link>
            <p className={styles.linkDesc}>测量等离子体发射光谱、粒子密度、激发温度等</p>
          </li>
          <li>
            <Link to="/products/lif">XHINS-LIF系列激光诱导荧光诊断系统 (Laser-Induced Fluorescence)</Link>
            <p className={styles.linkDesc}>测量离子/中性粒子速度分布、温度分布等</p>
          </li>
          <li>
            <Link to="/products/thomson">XHINS-TS系列汤姆逊散射诊断系统 (Thomson Scattering)</Link>
            <p className={styles.linkDesc}>高精度测量电子密度、电子温度分布等</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>等离子源</h2>
        <ul className={styles.linkList}>
          <li>
            <Link to="/products/kaufman">XHINS-KIS系列考夫曼离子源 (Kaufman Ion Source)</Link>
            <p className={styles.linkDesc}>直流栅极型离子源，适用于刻蚀、镀膜等工艺</p>
          </li>
          <li>
            <Link to="/products/hall-source">XHINS-HT系列霍尔推力器 (Hall Thruster)</Link>
            <p className={styles.linkDesc}>电推进系统核心部件，高比冲、长寿命</p>
          </li>
          <li>
            <Link to="/products/rfis">XHINS-RFIS系列射频等离子源 (RF Ion Source)</Link>
            <p className={styles.linkDesc}>射频耦合等离子体源，适用于材料表面处理</p>
          </li>
          <li>
            <Link to="/products/cathode-arc">XHINS-CA系列阴极弧等离子源 (Cathode Arc Source)</Link>
            <p className={styles.linkDesc}>高电离率、高能量粒子束，适用于硬质薄膜沉积</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>微推力架产品</h2>
        <ul className={styles.linkList}>
          <li>
            <Link to="/products/torsion-balance">XHINS-TB系列扭摆式微推力架 (Torsion Balance Thrust Stand)</Link>
            <p className={styles.linkDesc}>高精度微推力测量，适用于电推进器性能测试</p>
          </li>
          <li>
            <Link to="/products/em-balance">XHINS-EMB系列电磁平衡微推力架 (Electromagnetic Balance Thrust Stand)</Link>
            <p className={styles.linkDesc}>实时推力测量，响应速度快</p>
          </li>
          <li>
            <Link to="/products/calibration-service">标定服务 (Calibration Service)</Link>
            <p className={styles.linkDesc}>推力架标定、探针校准等专业服务</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>新闻动态</h2>
        <ul className={styles.linkList}>
          <li>
            <Link to="/news/electric-propulsion">电推进技术的最新发展</Link>
          </li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>最后更新时间: 2024年12月2日</p>
      </footer>
    </div>
  );
}
