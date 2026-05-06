import { useReveal } from '../hooks/useAnimations';


const featured = [
  { image: '/packages.png', title: 'Packaging Boxes', desc: 'Custom packaging for garments, electronics, medicine & more' },
  { image: '/lables.png', title: 'Label Printing', desc: 'Medical, pesticide, tea & product labels' },
  { image: '/brochers.png', title: 'Brochures & Catalogs', desc: 'High-quality marketing materials for your brand' },
  { image: '/businesscard.png', title: 'Business Cards', desc: 'Premium cards that make lasting impressions' },
];

function FeaturedCard({ image, title, desc }) {
  const [ref, isVisible] = useReveal();
  return (
    <div className={`featured-card${isVisible ? ' reveal active' : ' reveal'}`} ref={ref}>
      <img src={image} alt={title} className="featured-card-img" />
      <div className="featured-overlay">
        <h3>{title}</h3>
        <p>{desc}</p>
        <a href="#contact" className="btn btn-orange btn-sm">
          Get Quote
        </a>
      </div>
    </div>
  );
}

export default function Featured() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section className="section" id="featured">
      <div className="container">
        <div className={`text-center${headerVisible ? ' reveal active' : ' reveal'}`} ref={headerRef}>
          <div className="section-label">Featured</div>
          <h2 className="section-title">Our Signature Services</h2>
          <p className="section-subtitle mx-auto">
            Discover our most popular printing solutions trusted by hundreds of businesses.
          </p>
        </div>
        <div className={`featured-grid${gridVisible ? ' reveal active' : ' reveal'}`} ref={gridRef}>
          {featured.map((item) => (
            <FeaturedCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
