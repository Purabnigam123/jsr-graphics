import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Random time between 1000 and 000 ms
    const time = Math.floor(Math.random() * 3000) + 1000;
    
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Match CSS transition time
    }, time);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-spinner-wrap">
          <div className="loader-spinner"></div>
          <div className="loader-text">Loading Excellence...</div>
        </div>
      </div>
    </div>
  );
}
