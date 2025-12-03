// src/components/NonContactTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useI18n } from '../../../i18n/i18n';

// 1. 复用 DiagnosticsTable 的 CSS 模块
import styles from './CommonTable.module.css'; 

export default function NonContactTable() {
  const { t } = useI18n();
  
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        {/* 2. 更改为两列表头 */}
        <thead>
          <tr>
            <th>{t('products.table.nonContact.header.type')}</th>
            <th>{t('products.table.nonContact.header.params')}</th>
            <th>{t('products.table.nonContact.header.use')}</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. 光谱诊断 (合并) */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">{t('products.table.nonContact.group.optical')}</td>
          </tr>
          <tr>
            <td>{t('products.table.nonContact.oes')}</td>
            <td>{t('products.table.nonContact.oes.params')}</td>
            <td>{t('products.table.nonContact.oes.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.nonContact.lif')}</td>
            <td>{t('products.table.nonContact.lif.params')}</td>
            <td>{t('products.table.nonContact.lif.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.nonContact.thomson')}</td>
            <td>电子温度 (<InlineMath>T_e</InlineMath>), 电子密度 (<InlineMath>n_e</InlineMath>)</td>
            <td>{t('products.table.nonContact.thomson.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.nonContact.las')}</td>
            <td>{t('products.table.nonContact.las.params')}</td>
            <td>{t('products.table.nonContact.las.use')}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
