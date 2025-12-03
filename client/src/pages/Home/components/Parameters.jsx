import React from 'react';
import styles from './Parameters.module.css';
import parametersImg from '../../../assets/images/Parameters.png';
import { useI18n } from '../../../i18n/i18n';

export default function Parameters() {
  const { t } = useI18n();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.simpleTitle}>{t('home.parameters.title')}</h2>
        <div className={styles.imageBox}>
          <img src={parametersImg} alt={t('home.parameters.imageAlt')} />
        </div>
      </div>
    </div>
  );
}
