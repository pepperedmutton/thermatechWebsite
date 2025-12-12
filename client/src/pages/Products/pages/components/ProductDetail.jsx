import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';

import styles from '../ProductDetailPage.module.css';
import { useI18n } from '../../../../i18n/i18n';
import { renderTextWithMath } from '../../../../utils/mathRenderer';

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
  galleryImages = [],
}) {
  const { t } = useI18n();
  // internal index for cloned-carousel technique: start at 1 (first real slide)
  const [idx, setIdx] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  // --- Magnifier State ---
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState('');
  const [bgPos, setBgPos] = useState('0% 0%');
  const ZOOM_LEVEL = 4.5; // 放大倍数（原 3 的基础上再放大 1.5x）

  // build slides with clones: [last, ...originals, first]
  const slides = useMemo(() => (
    (galleryImages && galleryImages.length > 0)
      ? [galleryImages[galleryImages.length - 1], ...galleryImages, galleryImages[0]]
      : []
  ), [galleryImages]);

  // whenever gallery changes, reset to show the first real slide (which is at idx=1)
  useEffect(() => {
    if (slides.length > 0) {
      setIdx(1);
      setIsTransitioning(false);
      setTransitionEnabled(true);
    } else {
      setIdx(0);
      setIsTransitioning(false);
      setTransitionEnabled(true);
    }
  }, [galleryImages, slides.length]);

  useEffect(() => {
    // translate track to show current slide (idx corresponds to slides array)
    const track = trackRef.current;
    if (!track) return;
    const children = track.querySelectorAll('img');
    if (!children || children.length === 0) return;
    const img = children[0];
    const gap = 8; // should match CSS gap
    const w = img.clientWidth + gap;
    // control transition based on transitionEnabled state
    track.style.transition = transitionEnabled ? 'transform 300ms ease' : 'none';
    track.style.transform = `translateX(-${idx * w}px)`;
  }, [idx, slides.length, transitionEnabled]);

  function onPrev() {
    if (slides.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setIdx((i) => i - 1);
  }
  function onNext() {
    if (slides.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setIdx((i) => i + 1);
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  }
  function onTouchMove(e) {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  }
  function onTouchEnd() {
    if (Math.abs(touchDelta.current) > 40) {
      if (touchDelta.current > 0) onPrev(); else onNext();
    }
    touchDelta.current = 0;
  }

  // Handle circular looping: when reaching cloned slides, schedule a jump back to real slides
  useEffect(() => {
    if (!slides || slides.length <= 2 || !isTransitioning) return;

    // Check if we've reached a cloned slide
    const isAtClonedFirst = idx === slides.length - 1; // cloned first at end
    const isAtClonedLast = idx === 0; // cloned last at start

    if (isAtClonedFirst || isAtClonedLast) {
      // Wait for CSS transition to complete (300ms), then jump to real slide
      const timer = setTimeout(() => {
        setTransitionEnabled(false); // disable transition for instant jump
        
        if (isAtClonedFirst) {
          setIdx(1); // jump to real first slide
        } else if (isAtClonedLast) {
          setIdx(slides.length - 2); // jump to real last slide
        }
      }, 300); // match CSS transition duration

      return () => clearTimeout(timer);
    } else {
      // Normal slide, release transition lock after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [idx, slides, isTransitioning]);

  // Re-enable transitions after jumping to real slides
  useEffect(() => {
    if (!transitionEnabled && !isTransitioning) {
      // Small delay to ensure DOM update completes before re-enabling transition
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
        setIsTransitioning(false);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [transitionEnabled, isTransitioning]);

  // --- Magnifier Event Handlers ---
  function handleMouseEnter(e, src) {
    setZoomImage(src);
    setZoomActive(true);
  }

  function handleMouseLeave() {
    setZoomActive(false);
  }

  function handleMouseMove(e) {
    if (!zoomActive) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 计算背景图位置（按百分比定位）
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBgPos(`${bgX}% ${bgY}%`);

  // 放大镜尺寸（与 CSS 保持一致）
  const MAG_W = 450;
  const MAG_H = 450;
  const MARGIN = 24;
  const OFFSET_EXTRA = 260; // 额外向左偏移，按需微调（增大以更靠左显示）

  // 首选放在源图左侧：计算左侧候选位置（增加额外左移）
  let leftCandidate = Math.round(rect.left - MARGIN - MAG_W - OFFSET_EXTRA);

    // 如果左侧空间不足（会超出视口左边界），则放到图片右侧
    if (leftCandidate < 8) {
      leftCandidate = Math.round(rect.right + MARGIN);
    }

    // 确保不会超出右侧视口边界
    const maxLeft = Math.max(8, window.innerWidth - MAG_W - 8);
    if (leftCandidate > maxLeft) leftCandidate = maxLeft;

    // 如果放在当前候选位置仍与原图重叠（保险判断），切换到另一侧
    const overlaps = !(leftCandidate + MAG_W <= rect.left || leftCandidate >= rect.right);
    if (overlaps) {
      // 切换：如果原来在左侧则尝试右侧，否则尝试左侧
      const altLeft = rect.right + MARGIN;
      if (altLeft + MAG_W <= window.innerWidth - 8) {
        leftCandidate = Math.round(altLeft);
      } else {
        // 最后保底：强制放置在视口内合适位置
        leftCandidate = Math.round(Math.min(maxLeft, Math.max(8, rect.left - MAG_W - MARGIN)));
      }
    }

    // 垂直方向：始终居中显示在视口高度中间
    const top = Math.round((window.innerHeight - MAG_H) / 2);

    setZoomPosition({ x: leftCandidate, y: top });
  }

  const renderContent = (content) => {
    if (typeof content === 'string') return renderTextWithMath(content);
    return content;
  };

  return (
    <section id={id} className={styles.detailSection}>
      {/* --- Magnifier Zoom Window --- */}
      {zoomActive && (
        <div
          className={styles.magnifierZoom}
          style={{
            left: `${zoomPosition.x}px`,
            top: `${zoomPosition.y}px`,
            backgroundImage: `url(${zoomImage})`,
            backgroundPosition: bgPos,
            backgroundSize: `${100 * ZOOM_LEVEL}%`,
          }}
        />
      )}

      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>{title}</h2>
        {tagline && <p className={styles.detailTagline}>{renderContent(tagline)}</p>}
      </div>

      <p className={styles.detailOverview}>{renderContent(overview)}</p>

      <div className={styles.detailGrid}>
        <div className={styles.detailFeatures}>
          <h3 className={styles.subTitle}>{t('common.product.common.featuresTitle')}</h3>
          <ul className={styles.bullets}>
            {features.map((f, i) => (
              <li key={i}>{renderContent(f)}</li>
            ))}
          </ul>
        </div>

        {/* 可选：图片轮播（现在是网格的第二列） */}
        {slides && slides.length > 0 && (
          <div className={styles.detailGallery}>
            <div className={styles.galleryWrap}>
              <button className={styles.galleryNav} onClick={onPrev} aria-label="上一张">‹</button>
              <div
                className={styles.carousel}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className={styles.carouselTrack} ref={trackRef}>
                  {slides.map((src, i) => (
                    <div
                      key={i}
                      className={styles.carouselImageWrapper}
                      onMouseEnter={(e) => handleMouseEnter(e, src)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    >
                      <img src={src} alt={`${title} ${i + 1}`} className={styles.carouselImage} />
                    </div>
                  ))}
                </div>
              </div>
              <button className={styles.galleryNav} onClick={onNext} aria-label="下一张">›</button>
            </div>
          </div>
        )}
      </div>

      {/* 规格表格现在位于网格布局下方 */}
      <div className={styles.detailSpecs}>
        <h3 className={styles.subTitle}>{t('common.product.common.specsTitle')}</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('common.product.common.specs.field')}</th>
                <th>{t('common.product.common.specs.value')}</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row, i) => {
                const [k, v] = row;
                return (
                  <tr key={i}>
                    <td>{renderContent(k)}</td>
                    <td>{renderContent(v)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Link className={styles.ctaBtn} to={ctaPrimaryHref}>{/* use Link so HashRouter handles routing */}{t('common.product.common.ctaPrimary')}</Link>
        <Link className={styles.linkBtn} to={ctaSecondaryHref}>{t('common.product.common.ctaSecondary')}</Link>
      </div>
    </section>
  );
}
