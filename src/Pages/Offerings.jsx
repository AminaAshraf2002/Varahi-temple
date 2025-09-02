// Offerings.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Offerings.css';

// Import images
import templeDeity from '../assets/logo.png';
import poojaRitual from '../assets/gallery3.JPG';
import templeInterior from '../assets/gallery4.jpg';
import ceremonyHall from '../assets/above.jpg';
import templeBuilding from '../assets/about.jpg';
import festivalCelebration from '../assets/gallery.jpg';

const Offerings = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

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

  // Daily Pooja Timings
  const dailyPoojas = [
    {
      id: 1,
      name: "Prathishta",
      time: "05:30 AM",
      duration: "30 minutes",
      description: "Main morning ritual with special abhishekam and offerings to the deity",
      price: "₹51",
      category: "daily",
      benefits: ["Divine blessings", "Spiritual purification", "Peace of mind"],
      includes: ["Abhishekam", "Archana", "Nivedhyam", "Prasadam"],
      image: poojaRitual
    },
    {
      id: 2,
      name: "Upa Prathishta",
      time: "06:00 AM",
      duration: "20 minutes",
      description: "Secondary morning ritual with flower decorations and prayers",
      price: "₹31",
      category: "daily",
      benefits: ["Morning blessings", "Positive energy", "Success in endeavors"],
      includes: ["Flower offering", "Archana", "Prasadam"],
      image: templeInterior
    },
    {
      id: 3,
      name: "Daily Routine",
      time: "12:00 PM",
      duration: "25 minutes",
      description: "Afternoon worship with special nivedhyam and aarti",
      price: "₹41",
      category: "daily",
      benefits: ["Midday blessings", "Prosperity", "Health"],
      includes: ["Nivedhyam", "Aarti", "Prasadam"],
      image: ceremonyHall
    },
    {
      id: 4,
      name: "Evening Pooja",
      time: "06:30 PM",
      duration: "35 minutes",
      description: "Evening divine service with lamps and devotional songs",
      price: "₹61",
      category: "daily",
      benefits: ["Evening peace", "Family harmony", "Protection"],
      includes: ["Deepa Aarti", "Bhajans", "Prasadam"],
      image: templeDeity
    }
  ];

  // Special Poojas and Services
  const specialOfferings = [
    {
      id: 5,
      name: "Panchami Pooja",
      duration: "1 hour",
      description: "Special ritual performed on Panchami days for Goddess Varahi's blessings",
      price: "₹501",
      category: "special",
      benefits: ["Powerful protection", "Obstacle removal", "Spiritual growth"],
      includes: ["108 Archana", "Special Abhishekam", "Homam", "Feast"],
      image: poojaRitual,
      availability: "Every Panchami",
      bookingRequired: true
    },
    {
      id: 6,
      name: "Sahasranama Archana",
      duration: "2 hours",
      description: "Chanting of 1000 names of Goddess Varahi with offerings",
      price: "₹1001",
      category: "special",
      benefits: ["Divine grace", "Wish fulfillment", "Spiritual merit"],
      includes: ["1000 Names chanting", "Flower archana", "Special prasadam"],
      image: templeInterior,
      availability: "By appointment",
      bookingRequired: true
    },
    {
      id: 7,
      name: "Abhishekam",
      duration: "45 minutes",
      description: "Sacred bathing of the deity with milk, honey, and holy water",
      price: "₹251",
      category: "ritual",
      benefits: ["Purification", "Health", "Prosperity"],
      includes: ["Milk abhishekam", "Honey offering", "Sacred bath", "Prasadam"],
      image: ceremonyHall,
      availability: "Daily",
      bookingRequired: false
    },
    {
      id: 8,
      name: "Homam (Fire Ritual)",
      duration: "2-3 hours",
      description: "Sacred fire ceremony for specific purposes and blessings",
      price: "₹2001",
      category: "ritual",
      benefits: ["Powerful blessings", "Problem solving", "Spiritual upliftment"],
      includes: ["Sacred fire", "Mantras", "Offerings", "Prasadam"],
      image: festivalCelebration,
      availability: "By appointment",
      bookingRequired: true
    }
  ];

  // Temple Services
  const templeServices = [
    {
      id: 9,
      name: "Annadhanam",
      description: "Free food service for devotees and needy people",
      price: "Donation based",
      category: "service",
      benefits: ["Merit earning", "Community service", "Blessings"],
      includes: ["Meal preparation", "Distribution", "Service opportunity"],
      image: ceremonyHall,
      availability: "Daily",
      canSponsor: true
    },
    {
      id: 10,
      name: "Marriage Ceremonies",
      description: "Traditional wedding ceremonies conducted at the temple",
      price: "₹5001",
      category: "ceremony",
      benefits: ["Divine blessings", "Auspicious start", "Sacred union"],
      includes: ["Priest service", "Decorations", "Prasadam", "Certificate"],
      image: templeBuilding,
      availability: "By booking",
      bookingRequired: true
    },
    {
      id: 11,
      name: "Naming Ceremony",
      description: "Sacred naming ceremony for newborn children",
      price: "₹501",
      category: "ceremony",
      benefits: ["Auspicious name", "Divine protection", "Blessings"],
      includes: ["Name selection", "Ceremony", "Prasadam", "Certificate"],
      image: templeInterior,
      availability: "By appointment",
      bookingRequired: true
    },
    {
      id: 12,
      name: "Goshala Support",
      description: "Support for cow care and maintenance at temple goshala",
      price: "₹501/month",
      category: "service",
      benefits: ["Go seva merit", "Karmic benefits", "Spiritual growth"],
      includes: ["Cow care", "Feed", "Medical care", "Shelter"],
      image: templeBuilding,
      availability: "Ongoing",
      canSponsor: true
    }
  ];

  // All offerings combined
  const allOfferings = [...dailyPoojas, ...specialOfferings, ...templeServices];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Offerings', count: allOfferings.length },
    { id: 'daily', name: 'Daily Poojas', count: dailyPoojas.length },
    { id: 'special', name: 'Special Poojas', count: specialOfferings.filter(o => o.category === 'special').length },
    { id: 'ritual', name: 'Rituals', count: allOfferings.filter(o => o.category === 'ritual').length },
    { id: 'ceremony', name: 'Ceremonies', count: allOfferings.filter(o => o.category === 'ceremony').length },
    { id: 'service', name: 'Services', count: allOfferings.filter(o => o.category === 'service').length }
  ];

  // Filter offerings based on active category
  const filteredOfferings = activeCategory === 'all' 
    ? allOfferings 
    : allOfferings.filter(offering => offering.category === activeCategory);

  // Handle booking
  const handleBooking = (offering) => {
    setSelectedOffering(offering);
    setShowBookingModal(true);
  };

  return (
    <div className="offerings-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="offerings-hero">
        <div className="offerings-hero-bg">
          <img src={poojaRitual} alt="Temple Offerings" />
          <div className="offerings-hero-overlay"></div>
        </div>
        
        <div className="offerings-hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <div className="section-badges">
                <i className="fas fa-hands-praying"></i>
                <span>Sacred Services</span>
              </div>
              <h1>Temple Offerings & Services</h1>
              <p>Connect with the Divine Through Sacred Rituals and Ceremonies</p>
              <div className="hero-breadcrumb">
                <span>Home</span>
                <i className="fas fa-chevron-right"></i>
                <span>Offerings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Pooja Schedule */}
      <section className="daily-schedule">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-clock"></i>
              <span>Daily Schedule</span>
            </div>
            <h2>Daily Pooja Timings</h2>
            <p>Join us for daily prayers and receive divine blessings</p>
          </div>

          <div className="schedule-grid">
            {dailyPoojas.map((pooja, index) => (
              <div 
                key={pooja.id} 
                className="schedule-card"
                data-aos="fade-up" 
                data-aos-delay={100 + index * 150}
              >
                <div className="schedule-time">
                  <div className="time-display">{pooja.time}</div>
                  <div className="duration">{pooja.duration}</div>
                </div>
                <div className="schedule-content">
                  <h3>{pooja.name}</h3>
                  <p>{pooja.description}</p>
                  <div className="schedule-price">
                    <span className="price">{pooja.price}</span>
                    <span className="price-label">Offering</span>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBooking(pooja)}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Categories Filter */}
      <section className="offerings-filters">
        <div className="container">
          <div className="filters-header" data-aos="fade-up">
            <h2>Browse Our Sacred Offerings</h2>
            <p>Discover various poojas, rituals, and services for your spiritual needs</p>
          </div>

          <div className="filter-tabs" data-aos="fade-up" data-aos-delay="200">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="offerings-grid-section">
        <div className="container">
          <div className="offerings-grid">
            {filteredOfferings.map((offering, index) => (
              <div 
                key={offering.id} 
                className={`offering-card ${offering.category}`}
                data-aos="fade-up" 
                data-aos-delay={100 + index * 100}
              >
                <div className="offering-image">
                  <img src={offering.image} alt={offering.name} />
                  <div className="offering-category-badge">
                    {offering.category}
                  </div>
                  {offering.bookingRequired && (
                    <div className="booking-required-badge">
                      <i className="fas fa-calendar"></i>
                      Booking Required
                    </div>
                  )}
                </div>

                <div className="offering-content">
                  <div className="offering-header">
                    <h3>{offering.name}</h3>
                    <div className="offering-price">
                      <span className="price">{offering.price}</span>
                    </div>
                  </div>

                  {offering.time && (
                    <div className="offering-timing">
                      <i className="fas fa-clock"></i>
                      <span>{offering.time}</span>
                      {offering.duration && <span> • {offering.duration}</span>}
                    </div>
                  )}

                  {offering.availability && (
                    <div className="offering-availability">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{offering.availability}</span>
                    </div>
                  )}

                  <p className="offering-description">{offering.description}</p>

                  <div className="offering-benefits">
                    <h5>Benefits:</h5>
                    <div className="benefits-list">
                      {offering.benefits.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="benefit-tag">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="offering-includes">
                    <h5>Includes:</h5>
                    <ul>
                      {offering.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="offering-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleBooking(offering)}
                    >
                      <i className="fas fa-calendar-check"></i>
                      {offering.canSponsor ? 'Sponsor' : offering.bookingRequired ? 'Book Now' : 'Participate'}
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Services */}
      <section className="online-services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-laptop"></i>
              <span>Digital Services</span>
            </div>
            <h2>Online Temple Services</h2>
            <p>Experience divine blessings from anywhere in the world</p>
          </div>

          <div className="online-services-grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="service-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3>Live Darshan</h3>
              <p>Watch live temple ceremonies and daily poojas from your home</p>
              <ul>
                <li>HD live streaming</li>
                <li>Multiple camera angles</li>
                <li>Daily schedule</li>
                <li>Festival broadcasts</li>
              </ul>
              <button className="btn btn-primary">
                <i className="fas fa-play"></i>
                Watch Live
              </button>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="400">
              <div className="service-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Online Booking</h3>
              <p>Book poojas and ceremonies online with easy payment options</p>
              <ul>
                <li>Easy booking system</li>
                <li>Multiple payment options</li>
                <li>Booking confirmations</li>
                <li>Reminder notifications</li>
              </ul>
              <button className="btn btn-primary">
                <i className="fas fa-mouse-pointer"></i>
                Book Online
              </button>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="600">
              <div className="service-icon">
                <i className="fas fa-gift"></i>
              </div>
              <h3>Virtual Offerings</h3>
              <p>Make offerings and donations online with digital receipts</p>
              <ul>
                <li>Secure payment gateway</li>
                <li>Digital receipts</li>
                <li>Tax exemption certificates</li>
                <li>Regular updates</li>
              </ul>
              <button className="btn btn-primary">
                <i className="fas fa-donate"></i>
                Donate Online
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="donation-categories">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-heart"></i>
              <span>Support Temple</span>
            </div>
            <h2>Ways to Contribute</h2>
            <p>Support temple development and spiritual activities</p>
          </div>

          <div className="donation-grid">
            <div className="donation-card" data-aos="fade-up" data-aos-delay="200">
              <div className="donation-icon">
                <i className="fas fa-hammer"></i>
              </div>
              <h3>Construction</h3>
              <p>Support temple construction and infrastructure development</p>
              <div className="donation-amount">From ₹1001</div>
              <button className="btn btn-primary">Contribute</button>
            </div>

            <div className="donation-card" data-aos="fade-up" data-aos-delay="400">
              <div className="donation-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h3>Maintenance</h3>
              <p>Help maintain temple premises and daily operations</p>
              <div className="donation-amount">From ₹501</div>
              <button className="btn btn-primary">Support</button>
            </div>

            <div className="donation-card" data-aos="fade-up" data-aos-delay="600">
              <div className="donation-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>Annadhanam</h3>
              <p>Sponsor free meals for devotees and needy people</p>
              <div className="donation-amount">₹51/meal</div>
              <button className="btn btn-primary">Feed</button>
            </div>

            <div className="donation-card" data-aos="fade-up" data-aos-delay="800">
              <div className="donation-icon">
                <i className="fas fa-cow"></i>
              </div>
              <h3>Goshala</h3>
              <p>Support cow care and goshala maintenance</p>
              <div className="donation-amount">₹501/month</div>
              <button className="btn btn-primary">Care</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Bookings */}
      {/* <section className="booking-contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-text" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-phone"></i>
                <span>Book Your Service</span>
              </div>
              <h2>Need Help with Booking?</h2>
              <p>
                Our temple staff is here to help you with bookings, special requests, 
                and any questions about our offerings and services.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-info">
                    <h4>Phone Booking</h4>
                    <p>+91 8304091400, +91 8593999585</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-info">
                    <h4>Booking Hours</h4>
                    <p>9:00 AM - 7:00 PM (Daily)</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-info">
                    <h4>Visit Temple Office</h4>
                    <p>VK Vruthan's Padika, Athikkad</p>
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-phone"></i>
                  Call Now
                </button>
                <button className="btn btn-secondary">
                  <i className="fas fa-envelope"></i>
                  Send Message
                </button>
              </div>
            </div>

            <div className="contact-image" data-aos="fade-left">
              <img src={templeBuilding} alt="Temple Contact" />
              <div className="contact-overlay">
                <div className="overlay-content">
                  <h3>Temple Office Hours</h3>
                  <div className="office-hours">
                    <div className="hour-item">
                      <span>Morning:</span>
                      <span>9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Evening:</span>
                      <span>4:00 PM - 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Booking Modal */}
      {showBookingModal && selectedOffering && (
        <div className="booking-modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book {selectedOffering.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <p>To book this service, please contact our temple office:</p>
              <div className="booking-info">
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 8304091400</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-rupee-sign"></i>
                  <span>{selectedOffering.price}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-phone"></i>
                  Call Now
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowBookingModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Offerings;