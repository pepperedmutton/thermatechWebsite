import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SubNav.module.css';

export default function SubNav({ items }) {
  const location = useLocation();
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  // Initialize activeId from URL hash or default to the first item
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveId(hash);
    } else if (items && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [location.hash, items]);

  // Set up IntersectionObserver to track scroll-based active section
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersect = (entries) => {
      if (isClickScrolling.current) {
        return;
      }
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveId(intersectingEntry.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-40% 0px -60% 0px', // Activates when section is in the upper-middle of the viewport
      threshold: 0,
    });

    const { current: currentObserver } = observer;

    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [items]);

  const handleLinkClick = (id) => {
    isClickScrolling.current = true;
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Re-enable scroll observation after a short delay to allow smooth scrolling to finish
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
      // Update URL hash without causing a page jump, which scrollIntoView already handled
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }, 1000); // Adjust timeout as needed for your scroll behavior
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.navWrapper} role="navigation" aria-label="Probe types">
      <ul className={styles.navList}>
        {items.map(item => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              className={`${styles.link} ${activeId === item.id ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
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
