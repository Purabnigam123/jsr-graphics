import { useReveal, useCounter } from '../hooks/useAnimations';

function HeroStat({ target, label }) {
  const [ref, isVisible] = useReveal(0.5);
  const count = useCounter(target, 2000, isVisible);

  return (
    <div className="hero-stat" ref={ref}>
      <div className="number">
        {count.toLocaleString()}<span>+</span>
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [contentRef, contentVisible] = useReveal(0.3);

  return (
    <section className="hero" id="home">
      <div className="hero-video-container">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src="/Industrial_printer_seamless_loop…_202605041649.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        <div 
          className={`hero-content ${contentVisible ? 'active' : ''}`} 
          ref={contentRef}
        >
          <div className="hero-badge reveal delay-100">
            Premium Printing & Packaging Solutions
          </div>
          
          <h1 className="reveal delay-200">
            Your Vision, <span className="text-primary">Perfectly</span> Printed.
          </h1>
          
          <p className="reveal subtext delay-300">
            High-precision printing and custom packaging solutions 
            crafted for brands that value excellence.
          </p>
          
          <div className="hero-buttons reveal delay-400">
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
            <a href="#services" className="btn btn-outline-white">
              View Our Work
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-hint">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll for more</div>
      </div>
    </section>
  );
}


