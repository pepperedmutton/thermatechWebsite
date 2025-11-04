import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import styles from '../LangmuirPage.module.css';

/**
 * 通用产品详情组件
 * props:
 *  - id: string (锚点)
 *  - title: string | JSX
 *  - tagline: string | JSX（简短副标题/一句话定位）
 *  - overview: string | JSX（段落介绍）
 *  - features: JSX[] | string[]（要点列表）
 *  - specs: Array<[string, string, string?]>（[项目, 参数, 说明]）
 *  - ctaPrimaryHref / ctaSecondaryHref: string（按钮链接）
 */
export default function ProductDetail({
  id,
  title,
  tagline,
  overview,
  features = [],
  specs = [],
  ctaPrimaryHref = '/contact',
  ctaSecondaryHref = '/products',
}) {
  return (
    <section id={id} className={styles.detailSection}>
      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>{title}</h2>
        {tagline && <p className={styles.detailTagline}>{tagline}</p>}
      </div>

      <p className={styles.detailOverview}>{overview}</p>

      <div className={styles.detailGrid}>
        <div className={styles.detailFeatures}>
          <h3 className={styles.subTitle}>核心特性</h3>
          <ul className={styles.bullets}>
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailSpecs}>
          <h3 className={styles.subTitle}>关键规格</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>参数</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((row, i) => {
                  const [k, v, note] = row;
                  return (
                    <tr key={i}>
                      <td>{k}</td>
                      <td>{v}</td>
                      <td>{note || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <a className={styles.ctaBtn} href={ctaPrimaryHref}>获取方案与报价</a>
        <a className={styles.linkBtn} href={ctaSecondaryHref}>返回产品列表</a>
      </div>
    </section>
  );
}
