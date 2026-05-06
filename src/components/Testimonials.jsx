import { useState, useEffect, useCallback, useMemo } from 'react';
import { useReveal } from '../hooks/useAnimations';
import initialTestimonials from '../data/testimonials';
import { Star, X, MessageSquarePlus, ListFilter, TrendingUp, ChevronDown } from 'lucide-react';

const StarRating = ({ rating, interactive = false, onRate, size = 16 }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= rating ? "var(--gold)" : "none"}
          color={s <= rating ? "var(--gold)" : "var(--text-muted)"}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          onClick={() => interactive && onRate && onRate(s)}
        />
      ))}
    </div>
  );
};

function AddReviewModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ 
    author: '', 
    role: '', 
    quote: '', 
    rating: 5,
    categories: { Quality: 5, Service: 5, Pricing: 5, Delivery: 5 }
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    setFormData({ 
      author: '', role: '', quote: '', rating: 5,
      categories: { Quality: 5, Service: 5, Pricing: 5, Delivery: 5 }
    });
    onClose();
  };

  const isPositive = formData.rating >= 3;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container active review-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <div className="modal-content">
          <h2 className="modal-title">{isPositive ? "What did you like the most?" : "What did you hate the most?"}</h2>
          
          <form onSubmit={handleSubmit} className="review-form">
            <div className="rating-selector-large">
              <StarRating rating={formData.rating} interactive size={40} onRate={(r) => setFormData({...formData, rating: r})} />
            </div>

            <div className="category-select-grid">
              {['Quality', 'Service', 'Pricing', 'Delivery'].map(cat => (
                <div key={cat} className="form-group-inline">
                  <label>{cat}</label>
                  <StarRating 
                    rating={formData.categories[cat]} 
                    interactive 
                    size={20} 
                    onRate={(r) => setFormData({
                      ...formData, 
                      categories: { ...formData.categories, [cat]: r }
                    })} 
                  />
                </div>
              ))}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rahul Sharma"
                  value={formData.author}
                  onChange={e => setFormData({...formData, author: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Company/Role</label>
                <input 
                  type="text" 
                  placeholder="e.g. Marketing Head, Delhi"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
              <div className="form-group full">
                <label>Detailed Review</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Tell us more about your experience..."
                  value={formData.quote}
                  onChange={e => setFormData({...formData, quote: e.target.value})}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary full">Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AllReviewsModal({ isOpen, onClose, reviews = [], stats }) {
  const [sortBy, setSortBy] = useState('newest');

  const sortedReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    const list = [...reviews];
    if (sortBy === 'highest') return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === 'lowest') return list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    return list;
  }, [reviews, sortBy]);

  if (!isOpen) return null;

  // Safety fallback for distribution
  const safeDist = stats?.distribution || [0, 0, 0, 0, 0];
  const totalCount = stats?.count || reviews.length || 0;
  const avgRating = stats?.avg || "0.0";

  const categoryStats = [
    { label: 'Quality', score: 5.0 },
    { label: 'Service', score: 4.8 },
    { label: 'Pricing', score: 4.5 },
    { label: 'Delivery', score: 4.9 }
  ];

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container active all-reviews-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-minimal" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="modal-content-ios">
          <h2 className="ios-modal-title">Ratings & Reviews</h2>
          
          <div className="ios-summary-section">
            <div className="ios-summary-left">
              <div className="ios-large-score">{avgRating}</div>
              <div className="ios-out-of">out of 5</div>
            </div>
            
            <div className="ios-summary-right">
              <div className="ios-bars-container">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = safeDist[5 - star] || 0;
                  const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                  return (
                    <div key={star} className="ios-bar-row">
                      <div className="ios-star-mini">
                        {[...Array(star)].map((_, i) => <Star key={i} size={6} fill="var(--text-muted)" color="var(--text-muted)" />)}
                      </div>
                      <div className="ios-bar-bg">
                        <div className="ios-bar-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="ios-total-count">{totalCount.toLocaleString()} Ratings</div>
            </div>
          </div>

          <div className="ios-action-row">
            <button className="ios-action-link" onClick={() => { onClose(); /* Trigger Add Review */ }}>
              Write a Review
            </button>
          </div>

          <div className="ios-reviews-header">
            <div className="ios-sort-label">Most Helpful</div>
            <ChevronDown size={14} color="var(--primary)" />
          </div>

          <div className="ios-reviews-list">
            {sortedReviews.map((r, i) => (
              <div key={i} className="ios-review-card">
                <div className="ios-card-header">
                  <div className="ios-card-top-row">
                    <h4 className="ios-review-headline">{r.categories ? Object.keys(r.categories)[0] : "Great Service"}</h4>
                    <span className="ios-review-date">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="ios-card-meta-row">
                    <StarRating rating={r.rating || 0} size={10} />
                    <span className="ios-review-author">{r.author || 'Anonymous'}</span>
                  </div>
                </div>
                <p className="ios-review-body">{r.quote || 'No comment provided.'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('jsr_reviews');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });
  
  const [current, setCurrent] = useState(0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  
  const [headerRef, headerVisible] = useReveal();
  const [carouselRef, carouselVisible] = useReveal();

  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, count: 0, distribution: [0,0,0,0,0] };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach(r => {
      const star = Math.round(r.rating);
      if (star >= 1 && star <= 5) dist[5 - star]++;
    });
    return {
      avg: (sum / reviews.length).toFixed(1),
      count: reviews.length,
      distribution: dist
    };
  }, [reviews]);

  const landingReviews = useMemo(() => reviews.filter(r => r.rating === 5), [reviews]);
  const total = landingReviews.length;

  useEffect(() => {
    localStorage.setItem('jsr_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const goTo = useCallback((n) => {
    if (total === 0) return;
    setCurrent(((n % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(interval);
  }, [current, goTo, total]);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className={`text-center${headerVisible ? ' reveal active' : ' reveal'}`} ref={headerRef}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What Our Clients Say</h2>
          
          <div className="main-overall-rating">
            <TrendingUp size={20} className="stats-icon" />
            <span className="avg-num">{stats.avg}</span>
            <StarRating rating={Math.round(stats.avg)} size={16} />
            <span className="total-text">based on {stats.count} reviews</span>
          </div>

          <p className="section-subtitle mx-auto">
            Real feedback from businesses we've helped succeed. Only 5-star experiences shown here.
          </p>
        </div>

        {total > 0 ? (
          <div className={`testimonial-carousel${carouselVisible ? ' reveal active' : ' reveal'}`} ref={carouselRef}>
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {landingReviews.map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <div className="testimonial-inner">
                    <StarRating rating={t.rating} />
                    <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                    <div className="testimonial-author">{t.author}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {total > 1 && (
              <div className="carousel-dots">
                {landingReviews.map((_, i) => (
                  <div
                    key={i}
                    className={`carousel-dot${i === current ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Be the first to leave a 5-star review!</p>
          </div>
        )}

        <div className="text-center" style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
            <MessageSquarePlus size={20} /> Add Review
          </button>
          <button className="btn btn-outline" onClick={() => setIsAllOpen(true)}>
            <ListFilter size={20} /> Show All Reviews
          </button>
        </div>
      </div>

      <AddReviewModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addReview} />
      <AllReviewsModal isOpen={isAllOpen} onClose={() => setIsAllOpen(false)} reviews={reviews} stats={stats} />
    </section>
  );
}
