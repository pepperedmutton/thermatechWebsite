import React from 'react';
import { useI18n } from '../../../i18n/i18n';
import styles from './CommonTable.module.css'; // 导入统一样式

export default function IonSourceTable() {
  const { t } = useI18n();
  
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('products.table.ion.header.type')}</th>
            <th>{t('products.table.ion.header.principle')}</th>
            <th>{t('products.table.ion.header.energy')}</th>
            <th>{t('products.table.ion.header.gas')}</th>
            <th>{t('products.table.ion.header.neutralizer')}</th>
            <th>{t('products.table.ion.header.application')}</th>
            <th>{t('products.table.ion.header.use')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t('products.table.ion.kaufman.title')}</strong></td>
            <td>{t('products.table.ion.kaufman.principle')}</td>
            <td>{t('products.table.ion.kaufman.energy')}</td>
            <td>{t('products.table.ion.kaufman.gas')}</td>
            <td>{t('products.table.ion.kaufman.neutralizer')}</td>
            <td>{t('products.table.ion.kaufman.application')}</td>
            <td>{t('products.table.ion.kaufman.use')}</td>
          </tr>
          <tr>
            <td><strong>{t('products.table.ion.hall.title')}</strong></td>
            <td>{t('products.table.ion.hall.principle')}</td>
            <td>{t('products.table.ion.hall.energy')}</td>
            <td>{t('products.table.ion.hall.gas')}</td>
            <td>{t('products.table.ion.hall.neutralizer')}</td>
            <td>{t('products.table.ion.hall.application')}</td>
            <td>{t('products.table.ion.hall.use')}</td>
          </tr>
          <tr>
            <td><strong>{t('products.table.ion.cathode.title')}</strong></td>
            <td>{t('products.table.ion.cathode.principle')}</td>
            <td>{t('products.table.ion.cathode.energy')}</td>
            <td>{t('products.table.ion.cathode.gas')}</td>
            <td>{t('products.table.ion.cathode.neutralizer')}</td>
            <td>{t('products.table.ion.cathode.application')}</td>
            <td>{t('products.table.ion.cathode.use')}</td>
          </tr>
          <tr>
            <td><strong>{t('products.table.ion.rf.title')}</strong></td>
            <td>{t('products.table.ion.rf.principle')}</td>
            <td>{t('products.table.ion.rf.energy')}</td>
            <td>{t('products.table.ion.rf.gas')}</td>
            <td>{t('products.table.ion.rf.neutralizer')}</td>
            <td>{t('products.table.ion.rf.application')}</td>
            <td>{t('products.table.ion.rf.use')}</td>
          </tr>
          {/* --- ECR 已移动到最后 --- */}
          <tr>
            <td><strong>{t('products.table.ion.ecr.title')}</strong></td>
            <td>{t('products.table.ion.ecr.principle')}</td>
            <td>{t('products.table.ion.ecr.energy')}</td>
            <td>{t('products.table.ion.ecr.gas')}</td>
            <td>{t('products.table.ion.ecr.neutralizer')}</td>
            <td>{t('products.table.ion.ecr.application')}</td>
            <td>{t('products.table.ion.ecr.use')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
