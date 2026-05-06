import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, MoveRight } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.style.backdropFilter = 'blur(12px) saturate(150%)';
      navbar.style.webkitBackdropFilter = 'blur(12px) saturate(150%)';
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#" className="nav-logo">
            <img src="/logo.png" alt="JSR Graphics" className="logo-img" />
          </a>
          <div className="nav-links">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={
                  activeSection === href.slice(1) || 
                  (href === '#services' && activeSection === 'featured') 
                  ? 'active' : ''
                }
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <div 
              className={`theme-toggle-switch ${theme}`} 
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <Sun size={16} className="toggle-icon" />
              <Moon size={16} className="toggle-icon" />
              <div className="toggle-thumb"></div>
            </div>
            <a href="#contact" className="btn btn-primary btn-sm" id="navCta">
              Get Quote <MoveRight size={16} style={{ marginLeft: 8 }} />
            </a>
            <div
              className={`mobile-toggle${mobileOpen ? ' active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div 
          className="scroll-progress" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' active' : ''}`}>
        <div className="mobile-menu-inner">
          {navItems.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMobile}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={closeMobile}
            style={{ marginTop: 16, justifyContent: 'center' }}
          >
            Get Quote <MoveRight size={18} style={{ marginLeft: 8 }} />
          </a>
        </div>
      </div>
    </>
  );
}


