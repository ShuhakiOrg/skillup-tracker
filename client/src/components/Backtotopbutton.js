import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./Backtotopbutton.css";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 150);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  // Keyboard handler: Enter or Space triggers scroll
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`back-to-top-wrapper ${isVisible ? "show" : "hide"}`}>
      <button
        onClick={scrollToTop}
        onKeyDown={handleKeyPress}
        className="back-to-top"
        tabIndex={0}
        aria-label="Scroll back to top"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FaArrowUp size={28} />
        {showTooltip && <span className="tooltip">Back to Top</span>}
      </button>
    </div>
  );
};

export default BackToTopButton;