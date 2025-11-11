import React from 'react';
import styles from './IonSourceCard.module.css';

export default function IonSourceCard({ title, description, points }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {/* 仅当 points 数组存在时才渲染列表 */}
      {points && points.length > 0 && (
        <ul className={styles.pointsList}>
          {points.map((point, index) => (
            <li key={index} className={styles.point}>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}