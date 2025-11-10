// src/pages/NewsPage.jsx
import React from 'react';
import News from './components/NewsList';

export default function NewsPage() {
  return (
    <section id="news" style={{ paddingTop: '80px' }}>
      <News />
    </section>
  );
}