import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <h3 className="footer-title">SCP Group of Hospitals</h3>
          <p className="footer-text">Empowering Healthcare with Technology</p>
          <p className="footer-text">📍 Pune, India</p>
          <p className="footer-text">📞 +91 98765 43210</p>
          <p className="footer-text">✉️ support@scphealth.com</p>
        </div>
        <div className="footer-links">
          <a href="/" className="footer-link">Privacy Policy</a>
          <a href="/" className="footer-link">Terms of Service</a>
          <a href="/" className="footer-link">Contact Us</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2025 SCP Group of Hospitals. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;