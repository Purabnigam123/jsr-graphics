import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Facebook = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#" className="nav-logo">
              <img src="/logo.png" alt="JSR Graphics" className="logo-img" />
            </a>
            <p style={{ marginTop: 12 }}>
              Premium printing solutions trusted by 500+ businesses across India. Quality, speed, and reliability — since 2015.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#process">Our Process</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <h4>Our Services</h4>
            <div className="footer-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <a href="#services">Packaging Boxes</a>
              <a href="#services">Label Printing</a>
              <a href="#services">Brochures</a>
              <a href="#services">Business Cards</a>
              <a href="#services">Catalogs</a>
              <a href="#services">Flyers</a>
              <a href="#services">Posters</a>
              <a href="#services">Calendars</a>
              <a href="#services">Notebooks</a>
              <a href="#services">Envelopes</a>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--primary)" /> <span>Naraina, Delhi</span>
              </a>
              <a href="tel:01141743267" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--primary)" /> <span>011-41743267</span>
              </a>
              <a href="mailto:jsrgraphicsinfo@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--primary)" /> <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 JSR Graphics. All Rights Reserved.</span>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://api.whatsapp.com/send?phone=919213858574" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
