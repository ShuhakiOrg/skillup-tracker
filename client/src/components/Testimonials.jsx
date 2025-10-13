import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      image: "👩‍💻",
      rating: 5,
      text: "SkillUp Tracker has completely transformed how I approach learning. The XP system keeps me motivated, and tracking my progress has never been easier!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      image: "👨‍💼",
      rating: 5,
      text: "The goal-setting feature is phenomenal! I've completed 15 courses in 3 months. The leaderboard adds a fun competitive element to my learning journey."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "👩‍🎨",
      rating: 5,
      text: "I love how organized my learning resources are now. The daily progress logging helps me stay accountable and consistent with my goals."
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-content">
        <h2 className="testimonials-title">What Our Learners Say</h2>
        <p className="testimonials-subtitle">
          Join thousands of motivated learners achieving their goals
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <span className="avatar-emoji">{testimonial.image}</span>
        </div>
        <div className="testimonial-info">
          <h3 className="testimonial-name">{testimonial.name}</h3>
          <p className="testimonial-role">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="testimonial-rating">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="star">⭐</span>
        ))}
      </div>
      
      <p className="testimonial-text">{testimonial.text}</p>
      
      <div className="testimonial-quote">"</div>
    </div>
  );
};

export default Testimonials;