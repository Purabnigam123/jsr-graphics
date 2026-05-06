import { useReveal } from '../hooks/useAnimations';
import { Trophy, Sparkles, Truck, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Trophy, title: '10+ Years Experience', desc: 'A decade of expertise in delivering world-class printing solutions for diverse industries.' },
  { icon: Sparkles, title: 'Premium Quality', desc: 'State-of-the-art offset, digital & screen printing with rigorous quality control standards.' },
  { icon: Truck, title: 'Nationwide Delivery', desc: 'Reliable and timely delivery across all major cities and towns in India.' },
  { icon: CheckCircle2, title: '100% Satisfaction', desc: 'Dedicated to exceeding client expectations with customized solutions and responsive support.' },
];

function AboutCard({ icon: Icon, title, desc, delay }) {
  const [ref, isVisible] = useReveal();
  return (
    <div className={`about-card${isVisible ? ' reveal active' : ' reveal'} ${delay || ''}`} ref={ref}>
      <div className="about-icon">
        <Icon size={24} color="var(--primary)" />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function About() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" id="about">
      <div className="container">
        <div className={`text-center${isVisible ? ' reveal active' : ' reveal'}`} ref={ref}>
          <div className="section-label">About Us</div>
          <h2 className="section-title">
            Crafting Print Excellence <br />
            Since 2015
          </h2>
          <p className="section-subtitle mx-auto">
            Founded by Mr. Joginder Kumar, JSR Graphics has been delivering premium printing solutions from Naraina, Delhi — serving clients nationwide with unmatched quality.
          </p>
        </div>
        <div className="about-grid">
          {features.map((card, index) => (
            <AboutCard key={card.title} {...card} delay={`delay-${(index + 1) * 100}`} />
          ))}
        </div>

        <div className="company-info-wrap reveal active">
          <div className="info-header">Company Profile</div>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Year of Establishment</span>
              <span className="info-value">2015</span>
            </div>
            <div className="info-item">
              <span className="info-label">Market Covered</span>
              <span className="info-value">All Over India</span>
            </div>
            <div className="info-item">
              <span className="info-label">Company Founder</span>
              <span className="info-value">Mr. Joginder Kumar</span>
            </div>
            <div className="info-item">
              <span className="info-label">GST No</span>
              <span className="info-value">07AWGPK6452L1Z5</span>
            </div>
            <div className="info-item">
              <span className="info-label">Annual Turnover</span>
              <span className="info-value">Rs. 1 Crore Approx.</span>
            </div>
            <div className="info-item">
              <span className="info-label">Legal Status</span>
              <span className="info-value">Individual (Sole proprietorship)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
