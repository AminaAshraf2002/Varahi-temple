// Festivals.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Festivals.css';

// Import images
import templeDeity from '../assets/logo.png';
import festivalCelebration from '../assets/gallery.jpg';
import poojaRitual from '../assets/gallery3.JPG';
import templeInterior from '../assets/gallery4.jpg';
import ceremonyHall from '../assets/above.jpg';
import templeBuilding from '../assets/about.jpg';

const Festivals = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredFestival, setFeaturedFestival] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic',
      delay: 100
    });

    // Auto rotate featured festival
    const timer = setInterval(() => {
      setFeaturedFestival(prev => (prev + 1) % majorFestivals.length);
    }, 6000);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearInterval(timer);
  }, []);

  // Major Festivals Data
  const majorFestivals = [
    {
      id: 1,
      name: "Prathishta Dhinom",
      date: "March 15",
      duration: "1 Day",
      category: "major",
      image: templeDeity,
      description: "The most important festival celebrating the temple foundation and deity installation. Special poojas and community feast.",
      highlights: [
        "Special Abhishekam at dawn",
        "Grand procession",
        "Community Annadhanam",
        "Cultural programs"
      ],
      timings: [
        { time: "5:30 AM", event: "Pratha Kala Pooja" },
        { time: "10:00 AM", event: "Special Abhishekam" },
        { time: "12:00 PM", event: "Annadhanam" },
        { time: "6:00 PM", event: "Evening Arati" }
      ]
    },
    {
      id: 2,
      name: "Varahi Navarathri",
      date: "September 10-18",
      duration: "9 Days",
      category: "major",
      image: festivalCelebration,
      description: "Nine days of devotion to Goddess Varahi with special rituals, classical music, and dance performances.",
      highlights: [
        "Daily special poojas",
        "Classical music concerts",
        "Dance performances",
        "Spiritual discourses"
      ],
      timings: [
        { time: "6:00 AM", event: "Morning Pooja" },
        { time: "11:00 AM", event: "Special Offering" },
        { time: "4:00 PM", event: "Cultural Program" },
        { time: "7:00 PM", event: "Evening Arati" }
      ]
    },
    {
      id: 3,
      name: "Anduvizha",
      date: "June 25-27",
      duration: "3 Days",
      category: "major",
      image: ceremonyHall,
      description: "Annual temple festival with elaborate decorations, special poojas, and community celebrations.",
      highlights: [
        "Temple decorations",
        "Special food offerings",
        "Community gathering",
        "Blessing ceremonies"
      ],
      timings: [
        { time: "5:00 AM", event: "Dawn Prayers" },
        { time: "10:30 AM", event: "Main Ceremony" },
        { time: "2:00 PM", event: "Prasadam Distribution" },
        { time: "6:30 PM", event: "Concluding Arati" }
      ]
    }
  ];

  // Daily Temple Events (June-July 2025)
  const dailyTempleEvents = [
    {
      id: 11,
      name: "Brahmani Prathipada",
      date: "June 26, 2025",
      malayalamDate: "1200 മിഥുനം 12",
      day: "Thursday",
      duration: "1 Day",
      category: "daily",
      deity: "സരസ്വതി (Saraswati)",
      image: poojaRitual,
      description: "Special day for Goddess Saraswati worship focusing on knowledge, intelligence, memory and learning. Special poojas, homas and archanas are performed.",
      highlights: [
        "Saraswati Archana",
        "Knowledge & wisdom blessings",
        "Memory enhancement rituals",
        "Educational prayers"
      ],
      benefits: "വിദ്യ, ബുദ്ധി, ശ്രദ്ധ, ഓർമ്മ വർദ്ധനവ്"
    },
    {
      id: 12,
      name: "Maheswari Dwithiya",
      date: "June 27, 2025",
      malayalamDate: "1200 മിഥുനം 13",
      day: "Friday",
      duration: "1 Day",
      category: "daily",
      deity: "പാർവ്വതി (Parvathi)",
      image: templeInterior,
      description: "Auspicious day dedicated to Goddess Parvathi for marital harmony and unity. Special archanas, abhishekams and decorations.",
      highlights: [
        "Kumkuma Abhishekam",
        "Pushpa Abhishekam",
        "Mangala Sukta Archana",
        "Marital harmony prayers"
      ],
      benefits: "ദാമ്പത്യ സൗഖ്യം, ഐക്യം"
    },
    {
      id: 13,
      name: "Kaumari Thrithiya",
      date: "June 28, 2025",
      malayalamDate: "1200 മിഥുനം 14",
      day: "Saturday",
      duration: "1 Day",
      category: "daily",
      deity: "കുമാരി (Kaumari)",
      image: templeDeity,
      description: "Day of Goddess Kaumari, the divine mother of Kumara. Special for victory in legal matters and disputes.",
      highlights: [
        "Victory prayers",
        "Legal dispute resolution",
        "Special offerings",
        "Warrior goddess worship"
      ],
      benefits: "യുദ്ധവിജയം, തർക്കവിജയം"
    },
    {
      id: 14,
      name: "Mahaপanchami Pooja",
      date: "June 29, 2025",
      malayalamDate: "1200 മിഥുനം 15",
      day: "Sunday",
      duration: "1 Day",
      category: "daily",
      deity: "വൈഷ്ണവി (Vaishnavi)",
      image: festivalCelebration,
      description: "Fourth day of Navarathri with Vaishnavi prominence. Varahi Devi blesses ancestors (Pitrus). Evening Mahapanchami Pooja.",
      highlights: [
        "Gavya Abhishekam",
        "Pushpa offerings",
        "Moksha Sukta Archana",
        "Ellu Unda offering"
      ],
      benefits: "പിതൃകോപ നിവാരണം, ശാപ വിമോചനം"
    },
    {
      id: 15,
      name: "Varahi Panchami",
      date: "June 30, 2025",
      malayalamDate: "1200 മിഥുനം 16",
      day: "Monday",
      duration: "1 Day",
      category: "daily",
      deity: "വാരാഹി (Varahi)",
      image: templeBuilding,
      description: "Main Varahi worship day for fulfillment of all desires and removal of obstacles. Special homas, offerings and Vedic archanas.",
      highlights: [
        "Morning special homas",
        "Vedic archanas",
        "Evening honey abhishekam",
        "Kozhukatta offering"
      ],
      benefits: "സർവ്വാഭിഷ്ട സിദ്ധി, വിഘ്‌ന നിവാരണം"
    },
    {
      id: 16,
      name: "Indrani Shashthi",
      date: "July 1, 2025",
      malayalamDate: "1200 മിഥുനം 17",
      day: "Tuesday",
      duration: "1 Day",
      category: "daily",
      deity: "ഇന്ദ്രാണി (Indrani)",
      image: ceremonyHall,
      description: "Day of Goddess Indrani, consort of Indra. Worship for leadership, supremacy in business, jobs and politics.",
      highlights: [
        "Ashwamedha Sukta Archana",
        "Leadership prayers",
        "Appa offering",
        "Supremacy blessings"
      ],
      benefits: "മേധാവിത്വം, നേതൃത്വം"
    },
    {
      id: 17,
      name: "Chamundi Saptami",
      date: "July 2, 2025",
      malayalamDate: "1200 മിഥുനം 18",
      day: "Wednesday",
      duration: "1 Day",
      category: "daily",
      deity: "ചാമുണ്ഡി (Chamundi)",
      image: poojaRitual,
      description: "Chamundi worship for recovery of lost wealth, property and positions. Special poojas and offerings to retrieve what is rightfully yours.",
      highlights: [
        "Kumkuma Archana",
        "Kaduma Payasam offering",
        "Recovery prayers",
        "Wealth restoration rituals"
      ],
      benefits: "നഷ്ടദ്രവ്യ പ്രാപ്തി, സ്ഥാനമാന വീണ്ടെടുക്കൽ"
    },
    {
      id: 18,
      name: "Ashtalakshmi Ashtami",
      date: "July 3, 2025",
      malayalamDate: "1200 മിഥുനം 19",
      day: "Thursday",
      duration: "1 Day",
      category: "daily",
      deity: "അഷ്ടലക്ഷ്മി (Ashtalakshmi)",
      image: templeInterior,
      description: "Worship of Varahi Devi in Ashtalakshmi form for wealth and prosperity. Sri Sukta Archana and special offerings.",
      highlights: [
        "Sri Sukta Archana",
        "Thrimaduram offering",
        "Pal Payasam",
        "Wealth prayers"
      ],
      benefits: "സമ്പദ് സമൃദ്ധി, ധനലാഭം"
    },
    {
      id: 19,
      name: "Bhadrakali Navami",
      date: "July 4, 2025",
      malayalamDate: "1200 മിഥുനം 20",
      day: "Friday",
      duration: "1 Day",
      category: "daily",
      deity: "ഭദ്രകാളി (Bhadrakali)",
      image: festivalCelebration,
      description: "Final day worship of Varahi Devi as Bhadrakali, the universal mother and Sri Chakra resident. Complete worship with all offerings.",
      highlights: [
        "Varahi Sahasranama Archana",
        "Kumbil Ada offering",
        "Complete ornament decoration",
        "Universal blessings"
      ],
      benefits: "ആരോഗ്യം, വിദ്യ, സമ്പത്ത്, സന്തതി, ഭൂലാഭം, വിജയം"
    }
  ];

  // All Festivals Data
  const allFestivals = [
    ...majorFestivals,
    {
      id: 4,
      name: "Naga Kalam",
      date: "April 20",
      duration: "1 Day",
      category: "special",
      image: poojaRitual,
      description: "Sacred serpent worship festival with special Naga Pooja and traditional rituals.",
      highlights: ["Naga Abhishekam", "Milk offerings", "Special prayers"]
    },
    {
      id: 5,
      name: "Devi Falam",
      date: "May 10",
      duration: "1 Day",
      category: "special",
      image: templeInterior,
      description: "Special day dedicated to Goddess blessings with unique rituals and offerings.",
      highlights: ["Flower decorations", "Special offerings", "Women's prayers"]
    },
    {
      id: 6,
      name: "Nada Thurakkal",
      date: "July 15",
      duration: "1 Day",
      category: "ceremony",
      image: templeBuilding,
      description: "Sacred door opening ceremony marking the beginning of special prayer period.",
      highlights: ["Door blessing ritual", "Sacred chanting", "Community prayers"]
    },
    {
      id: 7,
      name: "Karkidaka Masacharanam",
      date: "August 5-31",
      duration: "1 Month",
      category: "monthly",
      image: poojaRitual,
      description: "Holy month reading of sacred texts with daily spiritual programs.",
      highlights: ["Daily scripture reading", "Spiritual discourses", "Meditation sessions"]
    },
    {
      id: 8,
      name: "Veishu Masacharanam",
      date: "April 14",
      duration: "1 Day",
      category: "special",
      image: festivalCelebration,
      description: "New Year celebration with special prayers and traditional customs.",
      highlights: ["New Year prayers", "Traditional rituals", "Community feast"]
    },
    ...dailyTempleEvents
  ];

  // Festival Categories
  const categories = [
    { id: 'all', name: 'All Events', count: allFestivals.length },
    { id: 'major', name: 'Major Festivals', count: allFestivals.filter(f => f.category === 'major').length },
    { id: 'special', name: 'Special Days', count: allFestivals.filter(f => f.category === 'special').length },
    { id: 'ceremony', name: 'Ceremonies', count: allFestivals.filter(f => f.category === 'ceremony').length },
    { id: 'monthly', name: 'Monthly Events', count: allFestivals.filter(f => f.category === 'monthly').length },
    { id: 'daily', name: 'Daily Temple Events', count: allFestivals.filter(f => f.category === 'daily').length }
  ];

  // Filter festivals based on active category
  const filteredFestivals = activeFilter === 'all' 
    ? allFestivals 
    : allFestivals.filter(festival => festival.category === activeFilter);

  // Get months for festival calendar
  const getUpcomingMonths = () => {
    const months = ['March', 'April', 'May', 'June', 'July', 'August', 'September'];
    return months.map(month => {
      const monthFestivals = allFestivals.filter(festival => 
        festival.date.includes(month)
      );
      return { month, festivals: monthFestivals };
    });
  };

  return (
    <div className="festivals-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="festivals-hero">
        <div className="festivals-hero-bg">
          <img src={festivalCelebration} alt="Temple Festivals" />
          <div className="festivals-hero-overlay"></div>
        </div>
        
        <div className="festivals-hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <div className="section-badges">
                <i className="fas fa-calendar-alt"></i>
                <span>Sacred Celebrations</span>
              </div>
              <h1>Temple Festivals & Events</h1>
              <p>Experience Divine Celebrations Throughout the Year</p>
              <div className="hero-breadcrumb">
                <span>Home</span>
                <i className="fas fa-chevron-right"></i>
                <span>Festivals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Festival */}
      <section className="featured-festival">
        <div className="container">
          <div className="featured-content">
            <div className="featured-text" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-star"></i>
                <span>Featured Festival</span>
              </div>
              <h2>{majorFestivals[featuredFestival].name}</h2>
              <div className="festival-meta">
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>{majorFestivals[featuredFestival].date}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>{majorFestivals[featuredFestival].duration}</span>
                </div>
              </div>
              <p>{majorFestivals[featuredFestival].description}</p>
              
              <div className="festival-highlights">
                <h4>Festival Highlights:</h4>
                <ul>
                  {majorFestivals[featuredFestival].highlights.map((highlight, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              
            </div>

            <div className="featured-image" data-aos="fade-left">
              <img src={majorFestivals[featuredFestival].image} alt={majorFestivals[featuredFestival].name} />
              <div className="featured-indicators">
                {majorFestivals.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === featuredFestival ? 'active' : ''}`}
                    onClick={() => setFeaturedFestival(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Categories Filter */}
      <section className="festival-filters">
        <div className="container">
          <div className="filters-header" data-aos="fade-up">
            <h2>Browse Festivals by Category</h2>
            <p>Discover all our sacred celebrations and special events</p>
          </div>

          <div className="filter-tabs" data-aos="fade-up" data-aos-delay="200">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="festivals-grid-section">
        <div className="container">
          <div className="festivals-grid">
            {filteredFestivals.map((festival, index) => (
              <div 
                key={festival.id} 
                className={`festival-card ${festival.category}`}
                data-aos="fade-up" 
                data-aos-delay={100 + index * 100}
              >
                <div className="festival-image">
                  <img src={festival.image} alt={festival.name} />
                  <div className="festival-category-badge">
                    {festival.category === 'daily' ? 'Daily Event' : festival.category}
                  </div>
                </div>

                <div className="festival-content">
                  <div className="festival-header">
                    <h3>{festival.name}</h3>
                    {festival.deity && (
                      <div className="deity-info">
                        <span className="deity-name">{festival.deity}</span>
                      </div>
                    )}
                  </div>

                  <div className="festival-info">
                    <div className="info-item">
                      <i className="fas fa-calendar"></i>
                      <span>{festival.date}</span>
                    </div>
                    {festival.day && (
                      <div className="info-item">
                        <i className="fas fa-sun"></i>
                        <span>{festival.day}</span>
                      </div>
                    )}
                    <div className="info-item">
                      <i className="fas fa-clock"></i>
                      <span>{festival.duration}</span>
                    </div>
                  </div>

                  {festival.malayalamDate && (
                    <div className="malayalam-date">
                      <span>{festival.malayalamDate}</span>
                    </div>
                  )}

                  <p className="festival-description">{festival.description}</p>

                  {festival.benefits && (
                    <div className="festival-benefits">
                      <strong>Benefits:</strong> {festival.benefits}
                    </div>
                  )}

                  {festival.highlights && (
                    <div className="festival-highlights-mini">
                      {festival.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="festival-actions">
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="festival-calendar">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-calendar-check"></i>
              <span>Festival Calendar</span>
            </div>
            <h2>2025 Festival Calendar</h2>
            <p>Plan your visits around our sacred celebrations</p>
          </div>

          <div className="calendar-grid" data-aos="fade-up" data-aos-delay="300">
            {getUpcomingMonths().map((monthData, index) => (
              <div key={index} className="month-card">
                <div className="month-header">
                  <h3>{monthData.month}</h3>
                  <span className="month-count">
                    {monthData.festivals.length} event{monthData.festivals.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="month-festivals">
                  {monthData.festivals.length > 0 ? (
                    monthData.festivals.map((festival, idx) => (
                      <div key={idx} className="calendar-festival">
                        <div className="calendar-date">
                          {festival.date.includes(',') ? 
                            festival.date.split(',')[0].split(' ').pop() : 
                            festival.date.split(' ')[1]?.replace(',', '') || festival.date.split(' ').pop()
                          }
                        </div>
                        <div className="calendar-info">
                          <h4>{festival.name}</h4>
                          <span className="calendar-duration">{festival.duration}</span>
                          {festival.deity && (
                            <span className="calendar-deity">{festival.deity}</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-festivals">
                      <span>No festivals this month</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Participation */}
      <section className="festival-participation">
        <div className="container">
          <div className="participation-content">
            <div className="participation-text" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-users"></i>
                <span>Join Us</span>
              </div>
              <h2>Participate in Our Festivals</h2>
              <p>
                Experience the divine energy of our temple festivals. Join thousands of 
                devotees in celebrating these sacred occasions with traditional rituals, 
                cultural programs, and community feasts.
              </p>

              <div className="participation-benefits">
                <div className="benefit-item">
                  <i className="fas fa-pray"></i>
                  <div>
                    <h4>Spiritual Blessings</h4>
                    <p>Receive divine blessings and spiritual merit</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-heart"></i>
                  <div>
                    <h4>Community Bonding</h4>
                    <p>Connect with fellow devotees and families</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-music"></i>
                  <div>
                    <h4>Cultural Experience</h4>
                    <p>Enjoy traditional music and dance performances</p>
                  </div>
                </div>
              </div>

              <div className="participation-actions">
                {/* <button className="btn btn-primary">
                  <i className="fas fa-calendar-check"></i>
                  Register for Festivals
                </button> */}
              </div>
            </div>

            <div className="participation-image" data-aos="fade-left">
              <img src={ceremonyHall} alt="Festival Participation" />
              <div className="participation-stats">
                <div className="stat">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Annual Events</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Participants</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Years Tradition</div>
                </div>
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

export default Festivals;