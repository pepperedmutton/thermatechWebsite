import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. 导入 Link
import styles from './ProductCard.module.css';

/**
 * 等比缩放：若内容超出卡片高度，则 scale 到刚好装下；
 * 同时把 width 设为 100%/scale，保持视觉宽度不变。
 */
function useAutoScale(cardRef, contentRef, title, description) {
  const recalc = useCallback(() => {
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
  }, [cardRef, contentRef]);

  // useLayoutEffect with a literal dependency array referencing recalc
  useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(() => recalc());
    ro.observe(card);
    return () => ro.disconnect();
  }, [cardRef, recalc]);

  // 字体加载完成后再测一次，避免中文字体晚到导致高度变化
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => recalc());
    }
  }, [recalc]);

  // 当标题或描述变化时，重新计算缩放
  useEffect(() => {
    recalc();
  }, [title, description, recalc]);
}

// 2. 将 'to' 添加到 props
export default function ProductCard({ title, description, size = 'large', to }) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useAutoScale(cardRef, contentRef, title, description);

  const cardClasses = `${styles.card} ${size === 'small' ? styles.small : styles.large}`;

  // 3. 将内部内容提取到一个变量中，以便复用
  const cardContent = (
    <div ref={contentRef} className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );

  // 4. 根据 'to' 属性是否存在，条件性地渲染 Link 或 div
  if (to) {
    return (
      <Link ref={cardRef} className={cardClasses} to={to}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div ref={cardRef} className={cardClasses}>
      {cardContent}
    </div>
  );
}