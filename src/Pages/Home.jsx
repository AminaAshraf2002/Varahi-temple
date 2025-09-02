// Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

// Import images and video
import templeDeity from '../assets/logo.png';
import templeBuilding from '../assets/about.jpg';
import festivalCelebration from '../assets/gallery.jpg';
import poojaRitual from '../assets/gallery3.JPG';
import templeInterior from '../assets/gallery4.jpg';
import templeExterior from '../assets/gallery1.JPG';
import devotees from '../assets/about.jpg';
import ceremonyHall from '../assets/above.jpg';
// Import your hero video
import heroVideo from '../assets/new.MP4'; // Add your video file to assets

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    // Initialize AOS with better settings
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic',
      delay: 100
    });

    // Auto slide for gallery
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % galleryImages.length);
    }, 5000);

    // Scroll handler for video control
    const handleScroll = () => {
      if (heroSectionRef.current && videoRef.current) {
        const heroSection = heroSectionRef.current;
        const rect = heroSection.getBoundingClientRect();
        
        // If hero section is out of view (scrolled past 50% of its height)
        if (rect.bottom < window.innerHeight * 0.5) {
          // Pause video and mute
          videoRef.current.pause();
          videoRef.current.muted = true;
          setIsVideoMuted(true);
        } else {
          // Play video and unmute when back in view
          videoRef.current.play();
          videoRef.current.muted = false;
          setIsVideoMuted(false);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(slideTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation handlers
  const handleBookPooja = () => {
    navigate('/book-pooja');
  };

  const handleViewFestivals = () => {
    navigate('/festivals');
  };

  const handleViewOfferings = () => {
    navigate('/offerings');
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  const handleViewGallery = () => {
    navigate('/gallery');
  };

  const handleBookNow = (serviceType) => {
    // You can pass different service types to the booking page
    navigate('/book-pooja', { state: { serviceType } });
  };

  const handleLearnMore = (festivalName) => {
    navigate('/festivals', { state: { selectedFestival: festivalName } });
  };

  // Toggle mute function
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  // From your handwritten notes - Festivals
  const festivals = [
    { name: "Prathishta Dhinom", date: "March 15, 2025", icon: "fas fa-star", desc: "Temple Foundation Day", color: "primary" },
    { name: "Naga Kalam", date: "April 20, 2025", icon: "fas fa-dragon", desc: "Serpent Worship Festival", color: "secondary" },
    { name: "Devi Falam", date: "May 10, 2025", icon: "fas fa-lotus", desc: "Goddess Special Day", color: "success" },
    { name: "Anduvizha", date: "June 25, 2025", icon: "fas fa-fire", desc: "Annual Temple Festival", color: "info" },
    { name: "Nada Thurakkal", date: "July 15, 2025", icon: "fas fa-door-open", desc: "Door Opening Ceremony", color: "warning" },
    { name: "Varahi Navarathri", date: "September 10, 2025", icon: "fas fa-calendar-week", desc: "Nine Days Festival", color: "danger" },
    { name: "Karkidaka Masacharanam", date: "August 5, 2025", icon: "fas fa-book-open", desc: "Holy Month Reading", color: "dark" },
    { name: "Veisshu Masacharanam", date: "April 14, 2025", icon: "fas fa-sunrise", desc: "New Year Reading", color: "light" }
  ];

  // From your notes - Pooja Timings
  const poojaTimings = [
    { name: "Prathishta", time: "05:30 AM", desc: "Main Morning Ritual", icon: "fas fa-sun" },
    { name: "Upa Prathishta", time: "06:00 AM", desc: "Secondary Morning Ritual", icon: "fas fa-temple" },
    { name: "Daily Routine", time: "12:00 PM", desc: "Afternoon Worship", icon: "fas fa-pray" },
    { name: "Evening Pooja", time: "06:30 PM", desc: "Evening Divine Service", icon: "fas fa-moon" }
  ];

  // From your notes - Navigation sections
  const navigationSections = [
    { name: "History", href: "#history", icon: "fas fa-scroll", desc: "Temple's Rich Heritage" },
    { name: "About Temple", href: "#about", icon: "fas fa-gopuram", desc: "Sacred Information" },
    { name: "Festivals", href: "#festivals", icon: "fas fa-calendar-alt", desc: "Divine Celebrations" },
    { name: "Offerings", href: "#offerings", icon: "fas fa-hands-praying", desc: "Spiritual Services" },
    { name: "Panchami Pooja", href: "#panchami", icon: "fas fa-star-of-david", desc: "Special Rituals" },
    { name: "Administration", href: "#admin", icon: "fas fa-users-cog", desc: "Temple Management" }
  ];

  // From your notes - Donation categories
  const donationCategories = [
    { name: "Land", icon: "fas fa-map", desc: "Temple Land Development", amount: "Contribute", color: "success" },
    { name: "Construction", icon: "fas fa-hammer", desc: "Building & Infrastructure", amount: "Support", color: "info" },
    { name: "Maintenance", icon: "fas fa-tools", desc: "Daily Upkeep", amount: "Help", color: "warning" },
    { name: "Annadhanam", icon: "fas fa-utensils", desc: "Free Food Service", amount: "Feed", color: "danger" },
    { name: "Cow Care", icon: "fas fa-cow", desc: "Goshala Support", amount: "Care", color: "primary" }
  ];

  const galleryImages = [
    { src: templeDeity, alt: "Divine Goddess Varahi" },
    { src: templeBuilding, alt: "Sacred Temple Architecture" },
    { src: festivalCelebration, alt: "Festival Celebrations" },
    { src: poojaRitual, alt: "Sacred Rituals" },
    { src: templeInterior, alt: "Temple Interior" },
    { src: ceremonyHall, alt: "Ceremony Hall" }
  ];

  // From your notes - Additional services
  const additionalServices = [
    { name: "News & Events", icon: "fas fa-newspaper", desc: "Latest Temple Updates" },
    { name: "Photo Gallery", icon: "fas fa-images", desc: "Sacred Moments Captured" },
    { name: "Travel Desk", icon: "fas fa-route", desc: "Pilgrimage Assistance" },
    { name: "Online TV", icon: "fas fa-tv", desc: "Live Temple Streaming" }
  ];

  return (
    <div className="home-page">
      {/* Header Component */}
      <Header />

      {/* Hero Section with Video Background */}
      <section id="home" className="hero-section" ref={heroSectionRef}>
        <div className="hero-video-container">
          <video 
            ref={videoRef}
            autoPlay 
            muted={false} // Initially unmuted to have sound
            loop 
            playsInline
            className="hero-video"
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
            preload="metadata"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {/* Sound Control Button */}
          <button 
            className="sound-control-btn" 
            onClick={toggleMute}
            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          >
            <i className={`fas ${isVideoMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
          </button>
          
          <div className={`hero-fallback-bg ${!isVideoLoaded ? 'active' : ''}`}></div>
          <div className="hero-overlay"></div>
          
          {/* Floating background elements */}
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
            <div className="floating-circle circle-4"></div>
          </div>
        </div>

        <div className="hero-content">
          {/* Centered Temple Logo - Simple version */}
          <div className="hero-logo-center" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="300">
            <div className="logo-container">
              <img src={templeDeity} alt="Aalumthazham Sree Varahi Temple" className="temple-logo-main" />
            </div>
          </div>

          {/* Main Content */}
          <div className="hero-main-content">
            <div className="hero-text" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="800">
                Aalumthazham Sree Varahi Temple
              </h1>
              <p className="hero-location" data-aos="fade-up" data-aos-delay="1000">
                VK Vruthan's Padika, Athikkad
              </p>
              <p className="hero-description" data-aos="fade-up" data-aos-delay="1200">
                Experience the divine power of Goddess Varahi and receive sacred blessings for protection, prosperity, and spiritual peace
              </p>
            </div>

            <div className="hero-actions" data-aos="fade-up" data-aos-duration="800" data-aos-delay="1400">
              <button 
                className="btn btn-primary" 
                onClick={handleBookPooja}
                data-aos="slide-right" 
                data-aos-delay="1600"
              >
                <i className="fas fa-calendar-check"></i>
                Book Online Pooja
              </button>
            </div>
          </div>

          {/* <div className="scroll-indicator" data-aos="bounce-in" data-aos-delay="2000">
            <span>Scroll to explore</span>
            <i className="fas fa-chevron-down"></i>
          </div> */}
        </div>
      </section>

      {/* Enhanced About Section with Background Animations */}
      <section id="about" className="about-section">
        {/* Animated Background */}
        <div className="about-bg-animation">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
          <div className="bg-pattern"></div>
        </div>

        <div className="container">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right" data-aos-duration="1000">
              <div className="section-badge" data-aos="fade-up" data-aos-delay="200">
                <i className="fas fa-om"></i>
                <span>Sacred Heritage</span>
              </div>
              <h2 data-aos="fade-up" data-aos-delay="400">About Our Sacred Temple</h2>
              <h3 data-aos="fade-up" data-aos-delay="600">Aalumthazham Sree Varahi Temple</h3>
              <p data-aos="fade-up" data-aos-delay="800">
                Aalumthazham Sree Varahi Temple is a revered sanctuary dedicated to Goddess Varahi, 
                one of the seven mother goddesses in Hindu tradition. Known for her fierce protective 
                nature and divine power, Goddess Varahi blesses devotees with courage, prosperity, 
                and spiritual strength.
              </p>
              <p data-aos="fade-up" data-aos-delay="1000">
                This sacred temple has been a beacon of divine energy for generations, attracting 
                devotees from across the region who seek her powerful blessings, protection from 
                negative influences, and guidance in their spiritual journey.
              </p>
              
              <div className="temple-highlights" data-aos="fade-up" data-aos-delay="1200">
                <div className="highlight-item" data-aos="zoom-in" data-aos-delay="1300">
                  <i className="fas fa-gopuram"></i>
                  <span>Traditional Kerala Architecture</span>
                </div>
                <div className="highlight-item" data-aos="zoom-in" data-aos-delay="1400">
                  <i className="fas fa-praying-hands"></i>
                  <span>Ancient Vedic Rituals</span>
                </div>
                <div className="highlight-item" data-aos="zoom-in" data-aos-delay="1500">
                  <i className="fas fa-leaf"></i>
                  <span>Peaceful Spiritual Environment</span>
                </div>
                <div className="highlight-item" data-aos="zoom-in" data-aos-delay="1600">
                  <i className="fas fa-sparkles"></i>
                  <span>Divine Blessings & Miracles</span>
                </div>
              </div>

              <Link 
                to="/about" 
                className="btn-learn-more" 
                data-aos="fade-up" 
                data-aos-delay="1700"
              >
                <span>Discover More</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="about-image" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
              <div className="image-wrapper">
                <img src={templeBuilding} alt="Temple Architecture" />
                <div className="image-overlay" onClick={handleViewGallery}>
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                  <span>Virtual Temple Tour</span>
                </div>
                
                {/* Floating stats */}
                <div className="floating-stat stat-1" data-aos="fade-up" data-aos-delay="1800">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Years of Heritage</div>
                </div>
                <div className="floating-stat stat-2" data-aos="fade-up" data-aos-delay="2000">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Daily Devotees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timings Section */}
      <section id="timings" className="timings-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-clock"></i>
              <span>Daily Schedule</span>
            </div>
            <h2>Temple Timings & Rituals</h2>
            <p>Join us for daily prayers and sacred ceremonies</p>
          </div>

          <div className="timings-grid">
            {poojaTimings.map((timing, index) => (
              <div 
                key={index} 
                className="timing-card" 
                data-aos="flip-up" 
                data-aos-duration="800" 
                data-aos-delay={200 + index * 150}
              >
                <div className="timing-icon">
                  <i className={timing.icon}></i>
                </div>
                <div className="timing-time">{timing.time}</div>
                <h4>{timing.name}</h4>
                <p>{timing.desc}</p>
                <div className="timing-status">
                  <span className="status-dot"></span>
                  <span>Open</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Festivals Section */}
      <section id="festivals" className="festivals-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-calendar-alt"></i>
              <span>Sacred Celebrations</span>
            </div>
            <h2>Upcoming Festivals & Events</h2>
            <p>Experience divine celebrations throughout the year</p>
          </div>

          <div className="festivals-grid">
            {festivals.map((festival, index) => (
              <div 
                key={index} 
                className={`festival-card card-${festival.color}`}
                data-aos="fade-up" 
                data-aos-duration="800" 
                data-aos-delay={100 + index * 100}
              >
                <div className="festival-header">
                  <div className="festival-icon">
                    <i className={festival.icon}></i>
                  </div>
                  <div className="festival-date">
                    <span className="date-day">{festival.date.split(' ')[1].replace(',', '')}</span>
                    <span className="date-month">{festival.date.split(' ')[0]}</span>
                  </div>
                </div>
                <div className="festival-content">
                  <h4>{festival.name}</h4>
                  <p>{festival.desc}</p>
                  <button 
                    className="festival-btn"
                    onClick={() => handleLearnMore(festival.name)}
                  >
                    <span>Learn More</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="offerings" className="services-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-hands-praying"></i>
              <span>Temple Services</span>
            </div>
            <h2>Spiritual Offerings & Services</h2>
            <p>Connect with the divine through our sacred services</p>
          </div>

          <div className="services-wrapper">
            {/* Main Services */}
            <div className="main-services">
              <div className="service-card primary" data-aos="zoom-in" data-aos-delay="200">
                <div className="service-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h4>Panchami Pooja Booking</h4>
                <p>Schedule your special Panchami rituals and ceremonies</p>
                <div className="service-features">
                  <div className="feature">
                    <i className="fas fa-calendar"></i>
                    <span>Date Selection</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-check-circle"></i>
                    <span>Open/Closed Status</span>
                  </div>
                </div>
                <button 
                  className="service-btn"
                  onClick={() => handleBookNow('panchami-pooja')}
                >
                  Book Now
                </button>
              </div>

              <div className="service-card secondary" data-aos="zoom-in" data-aos-delay="400">
                <div className="service-icon">
                  <i className="fas fa-video"></i>
                </div>
                <h4>Online TV & Live Darshan</h4>
                <p>Join virtual prayers and witness live temple ceremonies</p>
                <div className="service-features">
                  <div className="feature">
                    <i className="fas fa-broadcast-tower"></i>
                    <span>Live Streaming</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Mobile Friendly</span>
                  </div>
                </div>
                <button 
                  className="service-btn"
                  onClick={() => navigate('/live-tv')}
                >
                  Watch Live
                </button>
              </div>
            </div>

            {/* Additional Services Grid */}
            <div className="additional-services">
              {additionalServices.map((service, index) => (
                <div 
                  key={index} 
                  className="additional-service" 
                  data-aos="slide-up" 
                  data-aos-delay={600 + index * 100}
                  onClick={() => {
                    switch(service.name) {
                      case "News & Events":
                        navigate('/news');
                        break;
                      case "Photo Gallery":
                        navigate('/gallery');
                        break;
                      case "Travel Desk":
                        navigate('/travel');
                        break;
                      case "Online TV":
                        navigate('/live-tv');
                        break;
                      default:
                        break;
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={service.icon}></i>
                  <div>
                    <h5>{service.name}</h5>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Donation Section */}
      <section className="donation-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-donate"></i>
              <span>Support Temple</span>
            </div>
            <h2>Donation & Contributions</h2>
            <p>Support temple development and maintenance</p>
          </div>

          <div className="donation-grid">
            {donationCategories.map((category, index) => (
              <div 
                key={index} 
                className={`donation-card card-${category.color}`}
                data-aos="flip-left" 
                data-aos-delay={200 + index * 150}
              >
                <div className="donation-icon">
                  <i className={category.icon}></i>
                </div>
                <h4>{category.name}</h4>
                <p>{category.desc}</p>
                <button 
                  className="donation-btn"
                >
                  {category.amount}
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-images"></i>
              <span>Sacred Gallery</span>
            </div>
            <h2>Divine Moments & Temple Beauty</h2>
            <p>Glimpses of our sacred temple and divine celebrations</p>
          </div>

          <div className="enhanced-gallery" data-aos="fade-up" data-aos-delay="300">
            <div className="gallery-main">
              <div className="main-image" onClick={handleViewGallery}>
                <img src={galleryImages[currentSlide].src} alt={galleryImages[currentSlide].alt} />
                <div className="image-info">
                  <h4>{galleryImages[currentSlide].alt}</h4>
                  <button className="expand-btn">
                    <i className="fas fa-expand-alt"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="gallery-thumbnails">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img src={image.src} alt={image.alt} />
                  <div className="thumbnail-overlay">
                    <i className="fas fa-eye"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-map-marker-alt"></i>
                <span>Visit Us</span>
              </div>
              <h2>Visit Our Sacred Temple</h2>
              <p>We welcome you to experience the divine presence of Goddess Varahi</p>
              
              <div className="contact-details">
                <div className="contact-item" data-aos="fade-up" data-aos-delay="200">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Temple Address</h4>
                    <p>VK Vruthan's Padika<br />Athikkad, Kerala, India</p>
                  </div>
                </div>
                
                <div className="contact-item" data-aos="fade-up" data-aos-delay="400">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Contact Numbers</h4>
                    <p>+91 8304091400, +91 8593999585<br />+91 9656712021, +91 8943403800</p>
                  </div>
                </div>
                
                <div className="contact-item" data-aos="fade-up" data-aos-delay="600">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Temple Timings</h4>
                    <p>Morning: 5:30 AM - 12:00 PM<br />Evening: 4:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-map" data-aos="fade-left">
              <div className="map-container">
                <div className="map-header">
                  <i className="fas fa-map-marked-alt"></i>
                  <h4>Temple Location</h4>
                </div>
                <div className="map-content">
                  <p>Get directions to our sacred temple</p>
                  <div className="map-actions">
                    <button 
                      className="map-btn primary"
                      onClick={() => navigate('/contact')}
                    >
                      <i className="fas fa-directions"></i>
                      Get Directions
                    </button>
                    <button 
                      className="map-btn secondary"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Aalumthazham Sree Varahi Temple',
                            text: 'Visit our sacred temple',
                            url: window.location.origin
                          });
                        }
                      }}
                    >
                      <i className="fas fa-share-alt"></i>
                      Share Location
                    </button>
                  </div>
                </div>
                <div className="map-decoration">
                  <div className="decoration-circle circle-1"></div>
                  <div className="decoration-circle circle-2"></div>
                  <div className="decoration-circle circle-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;