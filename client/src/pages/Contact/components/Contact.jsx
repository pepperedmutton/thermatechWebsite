import React from 'react';
import styles from './Contact.module.css';
import wechatQR from '../../../assets/images/Wechatcode.jpg';
import { useI18n } from '../../../i18n/i18n';

export default function Contact() {
  const { t } = useI18n();
  const hotlineNumber = t('contact.hotline.number', '18519685090');
  const emailAddress = t('contact.email.address', 'bd@starthermatech.com');

  return (
    <section className={styles.wrap} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <h1 id="contact-title" className={styles.title}>
          {t('contact.title')}
        </h1>

        <div className={styles.grid}>
          {/* 左侧：公司信息 + 快速支持提示条 */}
          <div className={styles.info}>
            <h3 className={styles.company}>{t('contact.company')}</h3>

            <ul className={styles.list}>
              <li>{t('contact.address')}</li>
              <li>
                <strong>{t('contact.hotline.label')}：</strong>
                <a className={styles.tel} href={`tel:${hotlineNumber}`}>{hotlineNumber}</a>
              </li>
              <li>
                <strong>{t('contact.postcode.label')}：</strong>
                {t('contact.postcode.value')}
              </li>
              <li>
                <strong>{t('contact.email.label')}：</strong>
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              </li>
            </ul>

            <div className={styles.quickHelp} role="note">
              {t('contact.quickHelp')}
            </div>
          </div>

          {/* 右侧：公众号二维码 */}
          <div className={styles.qrCode}>
            <h3 className={styles.qrTitle}>{t('contact.qr.title')}</h3>
            <img src={wechatQR} alt={t('contact.qr.alt')} className={styles.qrImage} />
            <p className={styles.qrDesc}>{t('contact.qr.desc')}</p>
          </div>
        </div>
      </div>

      {/*  右下角悬浮直购链接 */}
      <a
        href="/order"
        className={styles.fabOrder}
        aria-label={t('contact.cta.fab.aria')}
      >
        <span className={styles.fabIcon} aria-hidden></span>
        <span className={styles.fabText}>{t('contact.cta.fab')}</span>
      </a>
    </section>
  );
}
