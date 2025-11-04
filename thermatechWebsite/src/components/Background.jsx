import React from 'react';
import bg from '../assets/images/space-nebula.png';

export default function Background() {
  return (
    <div
      className="globalBg"
      aria-hidden="true"
      style={{ backgroundImage: `url(${bg})` }}
    />
  );
}
