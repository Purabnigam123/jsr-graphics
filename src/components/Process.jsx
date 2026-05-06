import { useReveal } from '../hooks/useAnimations';

const steps = [
  { num: '01', title: 'Discussion', desc: 'We understand your requirements, brand guidelines, and project scope in detail.' },
  { num: '02', title: 'Design & Approval', desc: "Our team creates stunning designs and refines them until you're 100% satisfied." },
  { num: '03', title: 'Printing', desc: 'Production begins with precision machinery ensuring consistent, premium quality.' },
  { num: '04', title: 'Delivery', desc: 'Quality-checked final products delivered safely to your doorstep, on time.' },
];

function ProcessCard({ num, title, desc, delay }) {
  const [ref, isVisible] = useReveal();
  return (
    <div className={`process-card${isVisible ? ' reveal active' : ' reveal'} ${delay || ''}`} ref={ref}>
      <div className="process-number">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function Process() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" id="process" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className={`text-center${isVisible ? ' reveal active' : ' reveal'}`} ref={ref}>
          <div className="section-label">Our Process</div>
          <h2 className="section-title">How We Work</h2>
          <p className="section-subtitle mx-auto">
            A streamlined 4-step process that ensures quality results, every single time.
          </p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <ProcessCard key={s.num} {...s} delay={`delay-${(i + 1) * 100}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
