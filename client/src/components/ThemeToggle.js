// src/components/ThemeToggle.js
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      className={`theme-toggle-switch ${theme}`} // Pass theme as a class
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-thumb">
        {theme === 'light' ? (
          <FaMoon className="icon" />
        ) : (
          <FaSun className="icon" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;