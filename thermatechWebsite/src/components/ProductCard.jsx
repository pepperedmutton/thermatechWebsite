// src/components/ProductCard.jsx
import React from 'react';

// This component takes 'props' (image, title, description)
export default function ProductCard({ image, title, description }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}