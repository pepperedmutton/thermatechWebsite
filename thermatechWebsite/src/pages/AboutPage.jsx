// src/pages/AboutPage.jsx
import React from 'react';
import About from '../components/About';

export default function AboutPage() {
  return (
    // 添加内边距，使其不会被页眉遮挡
    <section id="about" style={{ paddingTop: '80px' }}>
      <About />
    </section>
  );
}