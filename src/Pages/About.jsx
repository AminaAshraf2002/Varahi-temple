// About.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './About.css';

// Import images
import templeDeity from '../assets/logoo.jpg';
import templeBuilding from '../assets/about.jpg';
import templeExterior from '../assets/gallery1.JPG';
import templeInterior from '../assets/gallery4.jpg';
import ceremonyHall from '../assets/about.jpg';
import festivalImage from '../assets/gallery.jpg';
import poojaRitual from '../assets/gallery3.JPG';

const About = () => {
  const navigate = useNavigate();
  const [activeHistoryTab, setActiveHistoryTab] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic',
      delay: 100
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Navigation handlers
  const handleGetDirections = () => {
    navigate('/contact');
  };

  const handleBookPooja = () => {
    navigate('/book-pooja');
  };

  // Temple History Timeline
  const historyTimeline = [
    {
      year: "Ancient Era",
      title: "Divine Origins",
      description: "The sacred land where Goddess Varahi chose to manifest her divine presence, blessed by ancient sages and spiritual masters.",
      icon: "fas fa-star",
      image: templeDeity
    },
    {
      year: "15th Century",
      title: "Temple Foundation",
      description: "The first temple structure was established by devoted families, creating a permanent abode for Goddess Varahi's worship.",
      icon: "fas fa-gopuram",
      image: templeBuilding
    },
    {
      year: "18th Century", 
      title: "Architectural Enhancement",
      description: "Traditional Kerala architecture was incorporated, with intricate woodwork and classical design elements that stand today.",
      icon: "fas fa-hammer",
      image: templeExterior
    },
    {
      year: "Modern Era",
      title: "Spiritual Renaissance",
      description: "Continuous renovations and spiritual programs have made the temple a beacon of divine energy and community service.",
      icon: "fas fa-heart",
      image: templeInterior
    }
  ];

  // Temple Specialties
  const templeSpecialties = [
    {
      title: "Goddess Varahi",
      description: "The fierce and protective form of the Divine Mother, one of the seven Matrikas (mother goddesses) in Hindu tradition.",
      icon: "fas fa-female",
      details: [
        "Third among the seven Matrikas",
        "Protector from negative energies",
        "Grants courage and spiritual strength",
        "Removes obstacles and fears"
      ]
    },
    {
      title: "Sacred Rituals",
      description: "Ancient Vedic rituals performed with traditional methods passed down through generations of priests.",
      icon: "fas fa-fire",
      details: [
        "Daily Prathishta ceremonies",
        "Monthly special poojas",
        "Annual festival celebrations",
        "Personal blessing rituals"
      ]
    },
    {
      title: "Spiritual Power",
      description: "The temple is renowned for its powerful spiritual energy and miraculous blessings experienced by devotees.",
      icon: "fas fa-bolt",
      details: [
        "Protection from evil forces",
        "Healing of ailments",
        "Success in endeavors",
        "Peace and prosperity"
      ]
    },
    {
      title: "Traditional Architecture",
      description: "Authentic Kerala temple architecture with intricate carvings and traditional construction methods.",
      icon: "fas fa-building",
      details: [
        "Traditional wooden structures",
        "Sacred geometry design",
        "Hand-carved sculptures",
        "Eco-friendly materials"
      ]
    }
  ];

  // Temple Administration
  const administrationTeam = [
    {
      name: "Temple Committee",
      role: "Overall Management",
      description: "Dedicated committee members ensuring smooth temple operations and spiritual activities.",
      icon: "fas fa-users-cog",
      responsibilities: ["Daily operations", "Festival planning", "Maintenance", "Community service"]
    },
    {
      name: "Head Priest",
      role: "Spiritual Leadership", 
      description: "Experienced priest conducting all rituals according to ancient Vedic traditions.",
      icon: "fas fa-user-tie",
      responsibilities: ["Daily poojas", "Special ceremonies", "Spiritual guidance", "Ritual supervision"]
    },
    {
      name: "Cultural Committee",
      role: "Events & Programs",
      description: "Organizing cultural events, festivals, and community programs throughout the year.",
      icon: "fas fa-calendar-alt",
      responsibilities: ["Festival coordination", "Cultural programs", "Educational activities", "Community outreach"]
    },
    {
      name: "Maintenance Team",
      role: "Temple Upkeep",
      description: "Ensuring the temple premises are clean, well-maintained, and welcoming for all devotees.",
      icon: "fas fa-tools",
      responsibilities: ["Cleaning", "Repairs", "Landscaping", "Security"]
    }
  ];

  // Temple Statistics
  const templeStats = [
    { number: "500+", label: "Years of Heritage", icon: "fas fa-history" },
    { number: "1000+", label: "Daily Devotees", icon: "fas fa-users" },
    { number: "12", label: "Annual Festivals", icon: "fas fa-calendar-star" },
    { number: "4", label: "Daily Poojas", icon: "fas fa-pray" },
    { number: "365", label: "Days Open", icon: "fas fa-door-open" },
    { number: "50+", label: "Special Rituals", icon: "fas fa-star-of-david" }
  ];

  return (
    <div className="about-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src={templeBuilding} alt="Temple" />
          <div className="about-hero-overlay"></div>
        </div>
        
        <div className="about-hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <div className="section-badges">
                <i className="fas fa-om"></i>
                <span>About Our Temple</span>
              </div>
              <h1>Aalumthazham Sree Varahi Temple</h1>
              <p>A Sacred Journey Through Centuries of Divine Blessings</p>
              <div className="hero-breadcrumb">
                <span>Home</span>
                <i className="fas fa-chevron-right"></i>
                <span>About Temple</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Introduction */}
      <section className="temple-introduction">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-temple-hindu"></i>
                <span>Divine Heritage</span>
              </div>
              <h2>Welcome to Our Sacred Sanctuary</h2>
              <p className="intro-description">
                Aalumthazham Sree Varahi Temple stands as a testament to centuries of unwavering faith 
                and divine grace. Nestled in the serene surroundings of VK Vruthan's Padika, Athikkad, 
                this sacred temple has been a beacon of spiritual light for devotees seeking the 
                powerful blessings of Goddess Varahi.
              </p>
              <p>
                Our temple is not just a place of worship, but a living embodiment of ancient wisdom, 
                traditional architecture, and community service. Every stone, every carving, and every 
                ritual performed here carries the essence of divine energy that has been cultivating 
                for generations.
              </p>
              
              <div className="intro-highlights">
                <div className="highlight" data-aos="zoom-in" data-aos-delay="200">
                  <i className="fas fa-leaf"></i>
                  <span>Spiritual Sanctuary</span>
                </div>
                <div className="highlight" data-aos="zoom-in" data-aos-delay="300">
                  <i className="fas fa-hands-praying"></i>
                  <span>Ancient Traditions</span>
                </div>
                <div className="highlight" data-aos="zoom-in" data-aos-delay="400">
                  <i className="fas fa-heart"></i>
                  <span>Community Service</span>
                </div>
              </div>
            </div>

            <div className="intro-image" data-aos="fade-left">
              <div className="image-stack">
                <img src={templeDeity} alt="Goddess Varahi" className="stack-img-1" />
                <img src={ceremonyHall} alt="Temple Interior" className="stack-img-2" />
                <div className="image-decoration">
                  <div className="decoration-element elem-1"></div>
                  <div className="decoration-element elem-2"></div>
                  <div className="decoration-element elem-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Statistics */}
      <section className="temple-stats">
        <div className="container">
          <div className="stats-grid">
            {templeStats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card" 
                data-aos="flip-up" 
                data-aos-delay={index * 100}
              >
                <div className="stat-icon">
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temple History */}
      <section className="temple-history">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-scroll"></i>
              <span>Sacred Timeline</span>
            </div>
            <h2>Temple History & Heritage</h2>
            <p>Journey through the centuries of divine presence and spiritual evolution</p>
          </div>

          <div className="history-content">
            <div className="history-timeline" data-aos="fade-right">
              {historyTimeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`timeline-item ${activeHistoryTab === index ? 'active' : ''}`}
                  onClick={() => setActiveHistoryTab(index)}
                >
                  <div className="timeline-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="history-showcase" data-aos="fade-left">
              <div className="showcase-image">
                <img src={historyTimeline[activeHistoryTab].image} alt={historyTimeline[activeHistoryTab].title} />
                <div className="showcase-overlay">
                  <h3>{historyTimeline[activeHistoryTab].title}</h3>
                  <p>{historyTimeline[activeHistoryTab].year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Specialties */}
      <section className="temple-specialties">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-star"></i>
              <span>Temple Specialties</span>
            </div>
            <h2>What Makes Our Temple Special</h2>
            <p>Discover the unique aspects that make Aalumthazham Sree Varahi Temple extraordinary</p>
          </div>

          <div className="specialties-grid">
            {templeSpecialties.map((specialty, index) => (
              <div 
                key={index} 
                className="specialty-card" 
                data-aos="fade-up" 
                data-aos-delay={index * 150}
              >
                <div className="specialty-header">
                  <div className="specialty-icon">
                    <i className={specialty.icon}></i>
                  </div>
                  <h3>{specialty.title}</h3>
                </div>
                <p className="specialty-description">{specialty.description}</p>
                <div className="specialty-details">
                  {specialty.details.map((detail, idx) => (
                    <div key={idx} className="detail-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temple Administration */}
      <section className="temple-administration">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-users-cog"></i>
              <span>Temple Management</span>
            </div>
            <h2>Temple Administration</h2>
            <p>Meet the dedicated team ensuring smooth temple operations and spiritual services</p>
          </div>

          <div className="administration-grid">
            {administrationTeam.map((member, index) => (
              <div 
                key={index} 
                className="admin-card" 
                data-aos="slide-up" 
                data-aos-delay={index * 100}
              >
                <div className="admin-icon">
                  <i className={member.icon}></i>
                </div>
                <div className="admin-content">
                  <h3>{member.name}</h3>
                  <div className="admin-role">{member.role}</div>
                  <p>{member.description}</p>
                  <div className="admin-responsibilities">
                    <h5>Key Responsibilities:</h5>
                    <ul>
                      {member.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="about-gallery">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-images"></i>
              <span>Sacred Glimpses</span>
            </div>
            <h2>Temple Gallery</h2>
            <p>Visual journey through our sacred spaces and divine celebrations</p>
          </div>

          <div className="gallery-grid" data-aos="fade-up" data-aos-delay="300">
            <div className="gallery-item large">
              <img src={templeBuilding} alt="Temple Main View" />
              <div className="gallery-overlay">
                <h4>Main Temple Structure</h4>
                <p>Traditional Kerala Architecture</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={templeInterior} alt="Temple Interior" />
              <div className="gallery-overlay">
                <h4>Sacred Interior</h4>
                <p>Divine Sanctum</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={festivalImage} alt="Festival Celebration" />
              <div className="gallery-overlay">
                <h4>Festival Celebrations</h4>
                <p>Divine Festivities</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={poojaRitual} alt="Pooja Ritual" />
              <div className="gallery-overlay">
                <h4>Sacred Rituals</h4>
                <p>Daily Worship</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src={ceremonyHall} alt="Ceremony Hall" />
              <div className="gallery-overlay">
                <h4>Ceremony Hall</h4>
                <p>Community Gatherings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="visit-info">
        <div className="container">
          <div className="visit-content">
            <div className="visit-text" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-map-marker-alt"></i>
                <span>Plan Your Visit</span>
              </div>
              <h2>Experience Divine Blessings</h2>
              <p>
                We welcome all devotees to experience the divine presence of Goddess Varahi 
                and participate in our sacred traditions. Plan your visit to our temple 
                and immerse yourself in spiritual tranquility.
              </p>
              
              <div className="visit-highlights">
                <div className="visit-highlight">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h4>Temple Timings</h4>
                    <p>Open daily from 5:30 AM to 8:00 PM</p>
                  </div>
                </div>
                <div className="visit-highlight">
                  <i className="fas fa-calendar-alt"></i>
                  <div>
                    <h4>Special Days</h4>
                    <p>Fridays and festival days have extended hours</p>
                  </div>
                </div>
                <div className="visit-highlight">
                  <i className="fas fa-heart"></i>
                  <div>
                    <h4>All Welcome</h4>
                    <p>Open to all devotees regardless of background</p>
                  </div>
                </div>
              </div>

              <div className="visit-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleGetDirections}
                >
                  <i className="fas fa-directions"></i>
                  Get Directions
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleBookPooja}
                >
                  <i className="fas fa-calendar-check"></i>
                  Book Pooja
                </button>
              </div>
            </div>

            <div className="visit-image" data-aos="fade-left">
              <img src={templeExterior} alt="Temple Entrance" />
              <div className="visit-card">
                <h4>Visit Guidelines</h4>
                <ul>
                  <li>Dress modestly and respectfully</li>
                  <li>Remove footwear before entering</li>
                  <li>Maintain silence in prayer areas</li>
                  <li>Photography rules apply</li>
                  <li>Follow priest instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;