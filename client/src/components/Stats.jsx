import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-container">
        <StatCard
          icon="👥"
          end={5000}
          suffix="+"
          label="Active Learners"
          isVisible={isVisible}
          duration={2000}
        />
        <StatCard
          icon="🎯"
          end={10000}
          suffix="+"
          label="Goals Completed"
          isVisible={isVisible}
          duration={2500}
        />
        <StatCard
          icon="🎓"
          end={95}
          suffix="%"
          label="Success Rate"
          isVisible={isVisible}
          duration={2000}
        />
      </div>
    </section>
  );
};

const StatCard = ({ icon, end, suffix, label, isVisible, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div className="stat-card">
      <div className="stat-icon">
        <span>{icon}</span>
      </div>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default Stats;

