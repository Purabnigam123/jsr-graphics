import { useReveal, useCounter } from '../hooks/useAnimations';

const counters = [
  { target: 500, label: 'Happy Clients' },
  { target: 1000, label: 'Projects Completed' },
  { target: 30, label: 'Services Offered' },
  { target: 10, label: 'Years of Trust' },
];

function CounterItem({ target, label }) {
  const [ref, isVisible] = useReveal(0.5);
  const count = useCounter(target, 2000, isVisible);

  return (
    <div className={`counter-item${isVisible ? ' reveal active' : ' reveal'}`} ref={ref}>
      <div className="count">{count.toLocaleString()}+</div>
      <div className="count-label">{label}</div>
    </div>
  );
}

export default function Counters() {
  return (
    <section className="counters">
      <div className="container">
        <div className="counters-grid">
          {counters.map((c) => (
            <CounterItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
