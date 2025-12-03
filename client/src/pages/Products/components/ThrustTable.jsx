import React from 'react';
import { useI18n } from '../../../i18n/i18n';
import styles from './CommonTable.module.css';

export default function ThrustTable() {
  const { t } = useI18n();
  
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('products.table.thrust.header.type')}</th>
            <th>{t('products.table.thrust.header.params')}</th>
            <th>{t('products.table.thrust.header.use')}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.categoryRow}><td colSpan="3">{t('products.table.thrust.category.stand')}</td></tr>
          <tr>
            <td>{t('products.table.thrust.torsion.title')}</td>
            <td>{t('products.table.thrust.torsion.params')}</td>
            <td>{t('products.table.thrust.torsion.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.thrust.em.title')}</td>
            <td>{t('products.table.thrust.em.params')}</td>
            <td>{t('products.table.thrust.em.use')}</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">{t('products.table.thrust.category.support')}</td></tr>
          <tr>
            <td>{t('products.table.thrust.readout.title')}</td>
            <td>{t('products.table.thrust.readout.params')}</td>
            <td>{t('products.table.thrust.readout.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.thrust.software.title')}</td>
            <td>{t('products.table.thrust.software.params')}</td>
            <td>{t('products.table.thrust.software.use')}</td>
          </tr>

          <tr className={styles.categoryRow}><td colSpan="3">{t('products.table.thrust.category.environment')}</td></tr>
          <tr>
            <td>{t('products.table.thrust.vacuum.title')}</td>
            <td>{t('products.table.thrust.vacuum.params')}</td>
            <td>{t('products.table.thrust.vacuum.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.thrust.mounting.title')}</td>
            <td>{t('products.table.thrust.mounting.params')}</td>
            <td>{t('products.table.thrust.mounting.use')}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
