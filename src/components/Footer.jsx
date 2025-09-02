// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home', icon: 'fas fa-home' },
    { name: 'About Temple', href: '#about', icon: 'fas fa-gopuram' },
    { name: 'Daily Timings', href: '#timings', icon: 'fas fa-clock' },
    { name: 'Festivals', href: '#festivals', icon: 'fas fa-calendar-alt' },
    { name: 'Photo Gallery', href: '#gallery', icon: 'fas fa-images' },
    { name: 'Contact Us', href: '#contact', icon: 'fas fa-phone' }
  ];

  const services = [
    { name: 'Online Pooja Booking', href: '#booking', icon: 'fas fa-calendar-check' },
    { name: 'Live Darshan', href: '#live', icon: 'fas fa-video' },
    { name: 'Donations', href: '#donations', icon: 'fas fa-heart' },
    { name: 'Prasadam Orders', href: '#prasadam', icon: 'fas fa-gift' },
    { name: 'Temple Stay', href: '#stay', icon: 'fas fa-bed' },
    { name: 'Special Poojas', href: '#special', icon: 'fas fa-star' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'fab fa-facebook' },
    { name: 'YouTube', href: '#', icon: 'fab fa-youtube' },
    { name: 'Instagram', href: '#', icon: 'fab fa-instagram' },
    { name: 'WhatsApp', href: '#', icon: 'fab fa-whatsapp' },
    { name: 'Twitter', href: '#', icon: 'fab fa-twitter' },
    { name: 'Telegram', href: '#', icon: 'fab fa-telegram' }
  ];

  return (
    <footer className="temple-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Temple Info Section */}
            <div className="footer-section temple-info">
              <div className="temple-logo">
                <div className="logo-icon">
                  {/* Replace with your temple logo image */}
                  <img 
                    src="/src/assets/logo.png" 
                    alt="Aalumthazham Sree Varahi Temple Logo" 
                    className="logo-image"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback text logo */}
                  <div className="logo-fallback">
                    <span>A</span>
                  </div>
                </div>
                <div className="logo-text">
                  <h3 className="temple-name">Aalumthazham</h3>
                  <p className="temple-subtitle">Sree Varahi Temple</p>
                </div>
              </div>
              
              <p className="temple-description">
                Experience the divine power of Goddess Varahi at our sacred temple. 
                A place of peace, devotion, and spiritual awakening where ancient 
                traditions meet modern conveniences.
              </p>
              
              <div className="temple-blessing">
                <i className="fas fa-praying-hands"></i>
                <p>May Goddess Varahi's blessings be with you always</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section">
              <h4 className="footer-heading">
                <i className="fas fa-link"></i>
                Quick Links
              </h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <i className={link.icon}></i>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="footer-section">
              <h4 className="footer-heading">
                <i className="fas fa-hands-praying"></i>
                Temple Services
              </h4>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href={service.href} className="footer-link">
                      <i className={service.icon}></i>
                      <span>{service.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-section">
              <h4 className="footer-heading">
                <i className="fas fa-address-book"></i>
                Contact Information
              </h4>
              
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h5>Temple Address</h5>
                    <p>VK Vruthan's Padika<br />Athikkad, Kerala, India</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h5>Phone Numbers</h5>
                    <p>+91 8304091400<br />+91 8593999585</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h5>Temple Timings</h5>
                    <p>Morning: 5:30 AM - 12:00 PM<br />Evening: 4:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Newsletter Section */}
      <div className="footer-social-section">
        <div className="footer-container">
          <div className="social-content">
            
            {/* Social Media Links */}
            <div className="social-media">
              <h4>Connect With Us</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="social-link"
                    title={social.name}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter">
              <h4>Temple Updates</h4>
              <p>Subscribe to receive festival notifications and temple news</p>
              <div className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="email-input"
                  />
                  <button className="subscribe-btn">
                    <i className="fas fa-bell"></i>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="emergency-contact">
              <h4>Temple Helpline</h4>
              <div className="helpline-number">
                <i className="fas fa-phone-volume"></i>
                <span>+91 8304091400</span>
              </div>
              <p>For temple matters and assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            
            {/* Copyright */}
            <div className="copyright">
              <p>© {currentYear} Aalumthazham Sree Varahi Temple. All Rights Reserved.</p>
              <p>Designed with devotion for divine service</p>
            </div>

            {/* Legal Links */}
            <div className="legal-links">
              <a href="#privacy" className="legal-link">Privacy Policy</a>
              <a href="#terms" className="legal-link">Terms of Service</a>
              <a href="#donations" className="legal-link">Donation Policy</a>
            </div>

            {/* Developer Credit */}
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;