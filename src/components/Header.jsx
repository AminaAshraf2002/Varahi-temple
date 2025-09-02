// Header.jsx - Updated with Pooja Booking Route
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleNavigation = (item) => {
    if (item.route) {
      // Navigate to different page
      navigate(item.route);
    } else if (item.href) {
      // Scroll to section on current page or navigate to home and scroll
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If on home page, just scroll to section
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    closeMobileMenu();
  };

  const navItems = [
    { name: 'Home', href: '#home', route: '/', icon: 'fas fa-home' },
    { name: 'About Temple', route: '/about', icon: 'fas fa-gopuram' },
    { name: 'Festivals', route: '/festivals', icon: 'fas fa-calendar-alt' },
    { name: 'Offerings', route: '/offerings', icon: 'fas fa-hands-praying' },
    // { name: 'Book Pooja', route: '/pooja-booking', icon: 'fas fa-calendar-check' }, // Added booking route
    { name: 'Gallery', route: '/gallery', icon: 'fas fa-images' },
    { name: 'Contact', route: '/contact', icon: 'fas fa-phone' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              {/* Replace with your temple logo image */}
              <img 
                src="/src/assets/logo1.jpg" 
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
              <div className="temple-name">Aalumthazham</div>
              <div className="temple-subtitle">Sree Varahi Temple</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.route ? (
                    <Link 
                      to={item.route} 
                      className={`nav-link ${location.pathname === item.route ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleNavigation(item)}
                      className="nav-link nav-button"
                    >
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons - Updated to link to booking page */}
          <div className="nav-cta">
            <Link 
              to="/pooja-booking"
              className="cta-button primary"
              onClick={closeMobileMenu}
            >
              <i className="fas fa-calendar-check"></i>
              Book Pooja
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-links">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  {item.route ? (
                    <Link 
                      to={item.route} 
                      className={`mobile-nav-link ${location.pathname === item.route ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleNavigation(item)}
                      className="mobile-nav-link mobile-nav-button"
                    >
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Mobile CTA - Updated with booking links */}
            <div className="mobile-cta">
              <Link 
                to="/pooja-booking"
                className="mobile-cta-button" 
                onClick={closeMobileMenu}
              >
                <i className="fas fa-calendar-check"></i>
                Book Pooja Online
              </Link>
              {/* <Link 
                to="/receipt"
                className="mobile-cta-button secondary" 
                onClick={closeMobileMenu}
              >
                <i className="fas fa-receipt"></i>
                View Receipt
              </Link> */}
            </div>

            {/* Temple Info in Mobile */}
            <div className="mobile-temple-info">
              <div className="temple-contact">
                <i className="fas fa-phone"></i>
                <span>+91 8304091400</span>
              </div>
              <div className="temple-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>VK Vruthan's Padika, Athikkad</span>
              </div>
              <div className="temple-timing">
                <i className="fas fa-clock"></i>
                <span>Open: 5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={closeMobileMenu}
          ></div>
        )}
      </nav>
    </header>
  );
};

export default Header;