import React from "react";
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Skillup Tracker</h3>
          <p>
            Track your learning progress and compete with others
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 arpitgupta@gmail.com</p>
          <p>📱 +91 12545 67890</p>
          <p>🌍 Galgotias College of Engineering and Technology, Delhi</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Skillup Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
