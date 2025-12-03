// src/components/ApplicationScenarios.jsx
import React from 'react';
import styles from './ApplicationScenarios.module.css';
import { useI18n } from '../../../i18n/i18n';

export default function ApplicationScenarios() {
  const { t } = useI18n();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        <h2 className={styles.title}>{t('home.scenarios.title')}</h2>
        
        {/* --- 应用场景部分 (保持不变) --- */}
        <div className={styles.scenariosGrid}>
          {/* 场景 1: 电推力器 */}
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                {/* 卫星主体 */}
                <circle cx="47" cy="47" r="18" fill="#1E3A8A" />
                {/* 太阳能板 */}
                <rect x="10" y="40" width="20" height="12" fill="#1E3A8A" />
                <rect x="64" y="40" width="20" height="12" fill="#1E3A8A" />
                {/* 天线 */}
                <path d="M47 30v-8M44 22l3 3M50 22l-3 3" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.scenarioContent}>
              <h3>{t('home.scenarios.item_1')}</h3>
            </div>
          </div>
          
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-microchip"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>{t('home.scenarios.item_2')}</h3>
            </div>
          </div>
          
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-layer-group"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>{t('home.scenarios.item_3')}</h3>
            </div>
          </div>
          
          <div className={styles.scenarioItem}>
            <div className={styles.scenarioCard}>
              <i className="fas fa-atom"></i>
            </div>
            <div className={styles.scenarioContent}>
              <h3>{t('home.scenarios.item_4')}</h3>
            </div>
          </div>
        </div>
        {/* --- 应用场景结束 --- */}


        {/* --- 2. 新增：分隔线 --- */}
        <hr className={styles.separator} />


        {/* 合作伙伴部分已移除（保持页面风格稳定） */}

      </div>
    </div>
  );
}
