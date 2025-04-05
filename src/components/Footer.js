// MONEY_TRACK - Footer Component
// This component renders the application footer

import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="brand-icon">💰</span>
          <span className="brand-name">MONEY_TRACK</span>
        </div>
        
        <div className="footer-info">
          <p className="copyright">
            &copy; {currentYear} MONEY_TRACK. All rights reserved.
          </p>
          <p className="disclaimer">
            For financial tracking and analysis purposes only.
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;