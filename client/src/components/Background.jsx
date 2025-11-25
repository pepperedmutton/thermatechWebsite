import React, { useEffect, useState } from 'react';
import bg from '../assets/images/space-nebula.png';

export default function Background() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg;

    const handleDone = () => setIsLoaded(true);

    if (img.complete) {
      handleDone();
      return undefined;
    }

    img.addEventListener('load', handleDone);
    img.addEventListener('error', handleDone); // even on error, remove fade delay

    return () => {
      img.removeEventListener('load', handleDone);
      img.removeEventListener('error', handleDone);
    };
  }, []);

  return (
    <div
      className={`globalBg ${isLoaded ? 'isLoaded' : ''}`}
      aria-hidden="true"
      style={{ backgroundImage: `url(${bg})` }}
    />
  );
}
