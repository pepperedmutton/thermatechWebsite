import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductsNav.module.css';

export default function ProductsNav({ items }) {
  const location = useLocation();
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
    } else if (items && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [location.hash, items]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const handleIntersect = (entries) => {
      if (isClickScrolling.current) return;
      const intersecting = entries.find(e => e.isIntersecting);
      if (intersecting) setActiveId(intersecting.target.id);
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    });

    const { current: currentObserver } = observer;
    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) currentObserver.observe(el);
    });

    return () => {
      if (currentObserver) currentObserver.disconnect();
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [items]);

  const handleClick = (id, e) => {
    e && e.preventDefault();
    isClickScrolling.current = true;
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }, 900);
  };

  if (!items || items.length === 0) return null;

  return (
    <nav className={styles.navWrapper} aria-label="产品与服务导航">
      <ul className={styles.navList}>
        {items.map(item => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              className={`${styles.link} ${activeId === item.id ? styles.active : ''}`}
              onClick={(e) => handleClick(item.id, e)}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
