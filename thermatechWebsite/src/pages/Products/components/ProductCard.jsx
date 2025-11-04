// src/components/ProductCard.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import styles from './ProductCard.module.css';

/**
 * 等比缩放：若内容超出卡片高度，则 scale 到刚好装下；
 * 同时把 width 设为 100%/scale，保持视觉宽度不变。
 */
function useAutoScale(cardRef, contentRef, deps = []) {
  const recalc = () => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    // 还原
    content.style.transform = 'scale(1)';
    content.style.width = '100%';

    const hCard = card.clientHeight;
    const hContent = content.scrollHeight;
    if (hCard <= 0 || hContent <= 0) return;

    if (hContent > hCard) {
      const ratio = Math.max(0.6, Math.min(1, hCard / hContent));
      content.style.transform = `scale(${ratio})`;
      content.style.width = `${(100 / ratio).toFixed(3)}%`;
    }
  };

  useLayoutEffect(recalc, deps);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(() => recalc());
    ro.observe(card);
    return () => ro.disconnect();
  }, [cardRef]);

  // 字体加载完成后再测一次，避免中文字体晚到导致高度变化
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => recalc());
    }
  }, deps);
}

export default function ProductCard({ title, description, parameterList, size = 'large' }) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const deps = useMemo(
    () => [title, description, Array.isArray(parameterList) ? parameterList.length : String(parameterList)],
    [title, description, parameterList]
  );
  useAutoScale(cardRef, contentRef, deps);

  const cardClasses = `${styles.card} ${size === 'small' ? styles.small : styles.large}`;

  return (
    <div ref={cardRef} className={cardClasses}>
      <div ref={contentRef} className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.parameterList}>
          {parameterList /* 仍然直接渲染 <li> 数组 */}
        </ul>
      </div>
    </div>
  );
}
