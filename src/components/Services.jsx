import { useState, useMemo, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useAnimations';
import servicesData from '../data/services';
import * as LucideIcons from 'lucide-react';

const filters = [
  { key: 'all', label: 'All Services' },
  { key: 'labels', label: 'Labels' },
  { key: 'packaging', label: 'Packaging' },
  { key: 'printing', label: 'Printing' },
  { key: 'stationery', label: 'Stationery' },
  { key: 'calendars', label: 'Calendars & Diaries' },
];

function ServiceModal({ service, onClose }) {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!service) return null;
  const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container active" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <LucideIcons.X size={24} />
        </button>
        
        <div className="modal-content">
          <div className="modal-header-section">
            <div className="modal-img-wrap">
              {service.image ? (
                <img src={service.image} alt={service.name} className="modal-img" />
              ) : (
                <div className="modal-img-placeholder">
                  <Icon size={80} strokeWidth={1} color="var(--primary)" />
                </div>
              )}
            </div>
            
            <div className="modal-details">
              <div className="modal-badge">{service.cat}</div>
              <h2 className="modal-title">{service.name}</h2>
              <div className="modal-meta">
                <span className="meta-item">
                  <strong>Available Printing:</strong> Offset, Digital, Screen
                </span>
                <span className="meta-item">
                  <strong>Standard Sizes:</strong> Custom as per requirement
                </span>
              </div>
              <p className="modal-desc">{service.desc} We provide high-quality, durable solutions tailored to your brand's specific needs. Our expert team ensures precise detailing and vibrant color reproduction for every project.</p>
              
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={scrollToForm}>
                  <LucideIcons.Phone size={18} /> Request to Call
                </button>
                <button className="btn btn-outline" onClick={scrollToForm}>
                  <LucideIcons.Mail size={18} /> Send Enquiry
                </button>
              </div>
            </div>
          </div>

          <div className="modal-form-section" ref={formRef}>
            <h3>Looking for "{service.name}"?</h3>
            <p>Fill out the form below and our team will get back to you with a custom quote.</p>
            
            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="phone-input">
                    <span className="country-code">+91</span>
                    <input type="tel" placeholder="10-digit mobile number" required />
                  </div>
                </div>
                <div className="form-group full">
                  <label>Requirement Details</label>
                  <textarea placeholder="Tell us more about your printing requirements (quantity, size, etc.)..." rows="3"></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary full">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ name, icon, desc, image, onClick }) {
  const Icon = LucideIcons[icon] || LucideIcons.HelpCircle;
  const [ref, isVisible] = useReveal();
  
  return (
    <div 
      className={`service-card reveal${isVisible ? ' active' : ''}`} 
      ref={ref}
      onClick={onClick} 
      style={{ cursor: 'pointer' }}
    >
      <div className="service-card-img">
        {image ? (
          <img src={image} alt={name} className="service-img" />
        ) : (
          <Icon size={48} strokeWidth={1.2} color="var(--primary)" />
        )}
      </div>
      <div className="service-card-body">
        <h3>{name}</h3>
        <p>{desc}</p>
        <button className="btn btn-outline btn-sm">
          View Details
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  const [headerRef, headerVisible] = useReveal();
  const [searchRef, searchVisible] = useReveal();
  const [filterRef, filterVisible] = useReveal();

  const filtered = useMemo(() => {
    return servicesData.filter((s) => {
      const matchFilter = activeFilter === 'all' || s.cat === activeFilter;
      const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchTerm]);

  const displayedServices = showAll ? filtered : filtered.slice(0, 6);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService]);

  return (
    <section className="section" id="services" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className={`text-center${headerVisible ? ' reveal active' : ' reveal'}`} ref={headerRef}>
          <div className="section-label">Our Services</div>
          <h2 className="section-title">Complete Printing Solutions</h2>
          <p className="section-subtitle mx-auto">
            From labels to packaging, brochures to business stationery — we cover every printing need your business demands.
          </p>
        </div>

        <div className={`service-search${searchVisible ? ' reveal active' : ' reveal'}`} ref={searchRef}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={`services-filter${filterVisible ? ' reveal active' : ' reveal'}`} ref={filterRef}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => {
                setActiveFilter(f.key);
                setShowAll(false); // Reset when filter changes
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="services-grid">
          {displayedServices.length > 0 ? (
            displayedServices.map((s) => (
              <ServiceCard 
                key={s.name} 
                {...s} 
                onClick={() => setSelectedService(s)} 
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px 0', color: 'var(--text-muted)' }}>
              No services found. Try a different search term.
            </p>
          )}
        </div>

        {filtered.length > 6 && (
          <div className="text-center" style={{ marginTop: '48px' }}>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowAll(!showAll)}
              style={{ padding: '12px 32px', fontSize: '1rem' }}
            >
              {showAll ? (
                <>Show Less <LucideIcons.ChevronUp size={18} style={{ marginLeft: '8px' }} /></>
              ) : (
                <>Explore All Services <LucideIcons.ChevronDown size={18} style={{ marginLeft: '8px' }} /></>
              )}
            </button>
          </div>
        )}
      </div>

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
}
