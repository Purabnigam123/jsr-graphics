import { useReveal } from '../hooks/useAnimations';
import { Palette, Cpu, Zap, IndianRupee, Target, Headphones } from 'lucide-react';

const reasons = [
  { icon: Palette, title: 'Premium Quality', desc: 'Vivid colors, sharp details, flawless finish on every print' },
  { icon: Cpu, title: 'Advanced Machinery', desc: 'Latest offset & digital presses for superior output' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Quick production without compromising quality' },
  { icon: IndianRupee, title: 'Affordable Pricing', desc: 'Competitive rates for all project sizes' },
  { icon: Target, title: 'Custom Solutions', desc: 'Tailored designs to match your unique brand vision' },
  { icon: Headphones, title: 'Expert Support', desc: 'Personalized guidance from concept to final delivery' },
];

function WhyCard({ icon: Icon, title, desc, delay }) {
  const [ref, isVisible] = useReveal();
  return (
    <div className={`why-card${isVisible ? ' reveal active' : ' reveal'} ${delay || ''}`} ref={ref}>
      <div className="why-icon">
        <Icon size={24} color="var(--primary)" />
      </div>
      <div className="why-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section">
      <div className="container">
        <div className={`text-center${isVisible ? ' reveal active' : ' reveal'}`} ref={ref}>
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">The JSR Graphics Advantage</h2>
          <p className="section-subtitle mx-auto">
            We combine quality, speed, and affordability to deliver exceptional printing experiences.
          </p>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <WhyCard key={r.title} {...r} delay={`delay-${(i % 3 + 1) * 100}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
