import React, { useState, useRef, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import styles from '../ProductDetailPage.module.css';

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
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  // --- Magnifier State ---
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState('');
  const [bgPos, setBgPos] = useState('0% 0%');
  const ZOOM_LEVEL = 4.5; // 放大倍数（原 3 的基础上再放大 1.5x）

  useEffect(() => {
    // clamp idx
    if (idx < 0) setIdx(0);
    if (idx >= (galleryImages?.length || 0)) setIdx(Math.max(0, (galleryImages?.length || 1) - 1));
  }, [idx, galleryImages]);

  useEffect(() => {
    // translate track to show current image centered in the carousel window
    const track = trackRef.current;
    if (!track) return;
    const children = track.querySelectorAll('img');
    if (!children || children.length === 0) return;
    const img = children[0];
    const gap = 8; // should match CSS gap
    const w = img.clientWidth + gap;
    track.style.transition = 'transform 300ms ease';
    track.style.transform = `translateX(-${idx * w}px)`;
  }, [idx]);

  function onPrev() {
    setIdx((i) => Math.max(0, i - 1));
  }
  function onNext() {
    setIdx((i) => Math.min((galleryImages?.length || 1) - 1, i + 1));
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

        {/* 可选：图片轮播（现在是网格的第二列） */}
        {galleryImages && galleryImages.length > 0 && (
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
                  {galleryImages.map((src, i) => (
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

      <div className={styles.ctaRow}>
        <a className={styles.ctaBtn} href={ctaPrimaryHref}>获取方案与报价</a>
        <a className={styles.linkBtn} href={ctaSecondaryHref}>返回产品列表</a>
      </div>
    </section>
  );
}
