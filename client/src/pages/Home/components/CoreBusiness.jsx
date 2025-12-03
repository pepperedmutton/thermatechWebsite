// src/components/CoreBusiness.jsx
import React from 'react';
import styles from './CoreBusiness.module.css';
import coreBg from '../../../assets/images/core-business-bg.png';
import { useI18n } from '../../../i18n/i18n';

export default function CoreBusiness() {
  const { t } = useI18n();

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${coreBg})` }}
    >
      {/* 左侧：业务总述 */}
      <div className={styles.textContainer}>
        <div aria-hidden className={styles.headerRow}>
          <h2>{t('home.core.heading')}</h2>
        </div>

        <ul className={styles.bulletList}>
          <li>{t('home.core.bullet_1')}</li>
          <li>{t('home.core.bullet_2')}</li>
          <li>{t('home.core.bullet_3')}</li>
          <li>{t('home.core.bullet_4')}</li>
        </ul>
      </div>

      {/* 右侧：四大业务核心 */}
      <div className={styles.pointsGrid}>
        <div className={styles.pointItem}>
          <h3><i className="fas fa-cubes" aria-hidden="true"></i> {t('home.core.card_1.title')}</h3>
          <p>{t('home.core.card_1.body')}</p>
        </div>

        <div className={styles.pointItem}>
          <h3><i className="fas fa-microscope" aria-hidden="true"></i> {t('home.core.card_2.title')}</h3>
          <p>{t('home.core.card_2.body')}</p>
        </div>

        <div className={styles.pointItem}>
          <h3><i className="fas fa-tools" aria-hidden="true"></i> {t('home.core.card_3.title')}</h3>
          <p>{t('home.core.card_3.body')}</p>
        </div>

        <div className={styles.pointItem}>
          <h3><i className="fas fa-headset" aria-hidden="true"></i> {t('home.core.card_4.title')}</h3>
          <p>{t('home.core.card_4.body')}</p>
        </div>
      </div>
    </div>
  );
}
