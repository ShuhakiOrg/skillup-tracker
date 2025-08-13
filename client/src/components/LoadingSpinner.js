// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

/**
 * A reusable loading spinner component with modern gradient effect.
 *
 * @param {object} props
 * @param {number} [props.size=50] - Diameter of the spinner in pixels
 */
export default function LoadingSpinner({ size = 50 }) {
  return (
    <div
      className="spinner-container"
      aria-busy="true"
      role="status"
    >
      <div className="spinner" style={{ width: size, height: size }} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
