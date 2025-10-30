// src/components/Home.jsx
import React from 'react';
import heroBanner from '../assets/images/hero-banner.jpg';

export default function Home() {
  return (
    <div className="hero-container" style={{ backgroundImage: `url(${heroBanner})` }}>
      <div className="hero-content">
        <h1>星焓科技</h1>
        <p>低温等离子体技术研发、生产、销售、服务</p>
      </div>
    </div>
  );
}