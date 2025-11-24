import React from 'react';
import styles from './Parameters.module.css';
import parametersImg from '../../../assets/images/Parameters.png';

export default function Parameters() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.simpleTitle}>关键性能参数一览</h2>
        <div className={styles.imageBox}>
          <img src={parametersImg} alt="Thermatech 产品参数表" />
        </div>
      </div>
    </div>
  );
}
