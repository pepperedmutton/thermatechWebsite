import React from 'react';
import styles from './Contact.module.css';
import wechatQR from '../../../assets/images/Wechatcode.jpg';

export default function Contact() {
  return (
    <section className={styles.wrap} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <h1 id="contact-title" className={styles.title}>
          联系我们
        </h1>

        <div className={styles.grid}>
          {/* 左侧：公司信息 + 快速支持提示条 */}
          <div className={styles.info}>
            <h3 className={styles.company}>星焓科技（北京）有限公司</h3>

            <ul className={styles.list}>
              <li><strong>地址：</strong>北京市海淀区学院路35号世宁大厦14层</li>
              <li><strong>服务热线：</strong><a className={styles.tel} href="tel:18519685090">18519685090</a></li>
              <li><strong>邮编：</strong>100083</li>
              <li><strong>邮箱：</strong><a href="mailto:bd@starthermatech.com">bd@starthermatech.com</a></li>
            </ul>

            <div className={styles.quickHelp} role="note">
              如果您希望快速获得产品或技术支持，请直接拨打
              <a className={styles.telStrong} href="tel:18519685090">服务热线</a>
              与工作人员联系。
            </div>
          </div>

          {/* 右侧：公众号二维码 */}
          <div className={styles.qrCode}>
            <h3 className={styles.qrTitle}>关注我们的公众号</h3>
            <img src={wechatQR} alt="微信公众号二维码" className={styles.qrImage} />
            <p className={styles.qrDesc}>扫码关注获取最新动态</p>
          </div>
        </div>
      </div>

      {/*  右下角悬浮直购链接 */}
      <a
        href="/order"
        className={styles.fabOrder}
        aria-label="如果您已经使用过我们的产品，可以输入产品编号直接订购"
      >
        <span className={styles.fabIcon} aria-hidden></span>
        <span className={styles.fabText}>已用过产品？输入编号直接订购</span>
      </a>
    </section>
  );
}
