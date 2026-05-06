import { useState } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { Search, ChevronDown, MapPin, Phone, Mail, Clock, Check, MoveRight } from 'lucide-react';

const services = [
  "Label Printing",
  "Packaging Boxes",
  "Brochure Printing",
  "Catalog Printing",
  "Business Cards",
  "Flyer / Pamphlet",
  "Poster Printing",
  "Calendar / Diary",
  "Stationery",
  "Other"
];

function SearchableSelect({ options, placeholder, value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`searchable-select ${isOpen ? 'active' : ''}`}>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{value || placeholder}</span>
        <ChevronDown size={18} />
      </div>
      
      {isOpen && (
        <div className="select-dropdown">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="options-list">
            {filtered.map(opt => (
              <div 
                key={opt} 
                className={`option ${value === opt ? 'selected' : ''}`}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {opt}
              </div>
            ))}
            {filtered.length === 0 && <div className="no-options">No matches found</div>}
          </div>
        </div>
      )}
      {isOpen && <div className="select-backdrop" onClick={() => setIsOpen(false)} />}
    </div>
  );
}

export default function Contact() {
  const [headerRef, headerVisible] = useReveal();
  const [formRef, formVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedService('');
      e.target.reset();
    }, 3000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className={`text-center${headerVisible ? ' reveal active' : ' reveal'}`} ref={headerRef}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Request a Quote</h2>
          <p className="section-subtitle mx-auto">
            Tell us about your printing needs and we'll get back to you within 24 hours.
          </p>
        </div>
        <div className="contact-wrapper">
          <form
            className={`contact-form${formVisible ? ' reveal active' : ' reveal'}`}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="you@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="+91 98XXX XXXXX" required />
            </div>
            <div className="form-group">
              <label>Service Required</label>
              <SearchableSelect 
                options={services} 
                placeholder="Select a service" 
                value={selectedService}
                onSelect={setSelectedService}
              />
              <input type="hidden" name="service" value={selectedService} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Describe your project requirements..." rows="4"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {submitted ? (
                <><Check size={18} style={{ marginRight: '8px' }} /> Quote Requested!</>
              ) : (
                <><span style={{ marginRight: '8px' }}>Request a Quote</span> <MoveRight size={18} /></>
              )}
            </button>
          </form>

          <div className={`contact-info${infoVisible ? ' reveal active' : ' reveal'}`} ref={infoRef}>
            <div className="contact-info-card">
              <div className="contact-info-icon"><MapPin size={20} color="var(--primary)" /></div>
              <div>
                <h4>Our Office</h4>
                <p>C-126, 1st Floor, Phase-1,<br />Naraina Industrial Area,<br />New Delhi — 110028</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Phone size={20} color="var(--primary)" /></div>
              <div>
                <h4>Phone</h4>
                <p>011-41743267<br />+91 9873858572</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Mail size={20} color="var(--primary)" /></div>
              <div>
                <h4>Email</h4>
                <p>jsrgraphicsinfo@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Clock size={20} color="var(--primary)" /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
