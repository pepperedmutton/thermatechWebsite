// src/components/DiagnosticsTable.jsx
import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useI18n } from '../../../i18n/i18n';
import { renderTextWithMath } from '../../../utils/mathRenderer';
import styles from './CommonTable.module.css'; // 使用统一表格样式

export default function DiagnosticsTable() {
  const { t } = useI18n();
  
  return (
    <div className={styles.tableWrapper}>
  <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('products.table.diagnostics.header.type')}</th>
            <th>{t('products.table.diagnostics.header.params')}</th>
            <th>{t('products.table.diagnostics.header.use')}</th>
          </tr>
        </thead>
        <tbody>
          {/* 1. 朗缪尔探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">{t('products.table.diagnostics.langmuir.group')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.langmuir.single')}</td>
            <td>
              {renderTextWithMath(t('products.table.diagnostics.langmuir.single.params'))}
            </td>
            <td>{t('products.table.diagnostics.langmuir.single.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.langmuir.double')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.langmuir.double.params'))}</td>
            <td>{t('products.table.diagnostics.langmuir.double.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.langmuir.triple')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.langmuir.triple.params'))}</td>
            <td>{t('products.table.diagnostics.langmuir.triple.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.langmuir.emissive')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.langmuir.emissive.params'))}</td>
            <td>{t('products.table.diagnostics.langmuir.emissive.use')}</td>
          </tr>

          {/* 2. 其他探针组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">{t('products.table.diagnostics.other.group')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.magnetic')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.magnetic.params'))}</td>
            <td>{t('products.table.diagnostics.magnetic.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.faraday')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.faraday.params'))}</td>
            <td>{t('products.table.diagnostics.faraday.use')}</td>
          </tr>
          
          {/* 3. 分析仪组 */}
          <tr className={styles.categoryRow}>
            <td colSpan="3">{t('products.table.diagnostics.analyzer.group')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.exb')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.exb.params'))}</td>
            <td>{t('products.table.diagnostics.exb.use')}</td>
          </tr>
          <tr>
            <td>{t('products.table.diagnostics.rpa')}</td>
            <td>{renderTextWithMath(t('products.table.diagnostics.rpa.params'))}</td>
            <td>{t('products.table.diagnostics.rpa.use')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
