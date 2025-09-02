// Contact.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Contact.css';

// Import images
import templeBuilding from '../assets/about.jpg';
import templeExterior from '../assets/gallery1.JPG';
import ceremonyHall from '../assets/above.jpg';
import templeInterior from '../assets/gallery4.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setShowSuccessMessage(true);

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  // Contact information data
  const contactInfo = [
    {
      id: 1,
      icon: 'fas fa-phone',
      title: 'Phone Numbers',
      details: [
        '+91 8304091400',
        '+91 8593999585',
        '+91 9656712021',
        '+91 8943403800'
      ],
      description: 'Call us for immediate assistance'
    },
    {
      id: 2,
      icon: 'fas fa-map-marker-alt',
      title: 'Temple Address',
      details: [
        'VK Vruthan\'s Padika',
        'Athikkad, Kerala',
        'India'
      ],
      description: 'Visit us for divine blessings'
    },
    {
      id: 3,
      icon: 'fas fa-clock',
      title: 'Temple Timings',
      details: [
        'Morning: 5:30 AM - 12:00 PM',
        'Evening: 4:00 PM - 8:00 PM',
        'Office Hours: 9:00 AM - 7:00 PM'
      ],
      description: 'Daily temple and office hours'
    },
    {
      id: 4,
      icon: 'fas fa-envelope',
      title: 'Email Address',
      details: [
        'info@aalumthazhamtemple.org',
        'bookings@aalumthazhamtemple.org',
        'donations@aalumthazhamtemple.org'
      ],
      description: 'Send us your inquiries'
    }
  ];

  // Temple staff and departments
  const departments = [
    {
      id: 1,
      name: 'Temple Administration',
      head: 'Temple Committee',
      phone: '+91 8304091400',
      email: 'admin@aalumthazhamtemple.org',
      description: 'General temple administration and management',
      icon: 'fas fa-users-cog',
      image: templeBuilding
    },
    {
      id: 2,
      name: 'Pooja Services',
      head: 'Head Priest',
      phone: '+91 8593999585',
      email: 'pooja@aalumthazhamtemple.org',
      description: 'Pooja bookings and ritual services',
      icon: 'fas fa-pray',
      image: ceremonyHall
    },
    {
      id: 3,
      name: 'Festival Committee',
      head: 'Cultural Team',
      phone: '+91 9656712021',
      email: 'festivals@aalumthazhamtemple.org',
      description: 'Festival planning and cultural events',
      icon: 'fas fa-calendar-alt',
      image: templeInterior
    },
    {
      id: 4,
      name: 'Donations & Sponsorship',
      head: 'Finance Committee',
      phone: '+91 8943403800',
      email: 'donations@aalumthazhamtemple.org',
      description: 'Donations, sponsorships, and financial matters',
      icon: 'fas fa-donate',
      image: templeExterior
    }
  ];

  // Inquiry types for the form
  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'pooja', label: 'Pooja Booking' },
    { value: 'donation', label: 'Donations' },
    { value: 'event', label: 'Event Booking' },
    { value: 'volunteer', label: 'Volunteer Opportunity' },
    { value: 'complaint', label: 'Complaint/Feedback' }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'What are the temple visiting hours?',
      answer: 'The temple is open from 5:30 AM to 12:00 PM in the morning and 4:00 PM to 8:00 PM in the evening. The temple office operates from 9:00 AM to 7:00 PM daily.'
    },
    {
      id: 2,
      question: 'How can I book a pooja?',
      answer: 'You can book poojas by calling our pooja services department at +91 8593999585 or visiting the temple office during office hours. Online booking will be available soon.'
    },
    {
      id: 3,
      question: 'Is there any dress code for visiting the temple?',
      answer: 'We request all devotees to dress modestly and respectfully. Traditional Indian attire is preferred, but decent casual wear is also acceptable.'
    },
    {
      id: 4,
      question: 'Can I make donations online?',
      answer: 'Currently, donations can be made in person at the temple or through bank transfer. Online donation facility is being developed and will be available soon.'
    },
    {
      id: 5,
      question: 'Are there facilities for special events?',
      answer: 'Yes, we have a spacious ceremony hall available for weddings, naming ceremonies, and other special events. Please contact our administration for booking and pricing.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src={templeBuilding} alt="Contact Temple" />
          <div className="contact-hero-overlay"></div>
        </div>

        <div className="contact-hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <div className="section-badges">
                <i className="fas fa-phone"></i>
                <span>Get In Touch</span>
              </div>
              <h1>Contact Us</h1>
              <p>We're Here to Help You Connect with the Divine</p>
              <div className="hero-breadcrumb">
                <span>Home</span>
                <i className="fas fa-chevron-right"></i>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      {/* <section className="quick-contact">
        <div className="container">
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div 
                key={info.id} 
                className="contact-card"
                data-aos="fade-up" 
                data-aos-delay={100 + index * 150}
              >
                <div className="contact-icon">
                  <i className={info.icon}></i>
                </div>
                <div className="contact-content">
                  <h3>{info.title}</h3>
                  <div className="contact-details">
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                  <span className="contact-description">{info.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Contact Section */}
      <section className="main-contact">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section" data-aos="fade-right">
              <div className="section-badge">
                <i className="fas fa-envelope"></i>
                <span>Send Message</span>
              </div>
              <h2>Get in Touch</h2>
              <p>Have questions or need assistance? Send us a message and we'll get back to you as soon as possible.</p>

              {showSuccessMessage && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter the subject of your inquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section" data-aos="fade-left">
              <div className="section-badge">
                <i className="fas fa-info-circle"></i>
                <span>Contact Information</span>
              </div>
              <h2>Visit Our Temple</h2>
              <p>Experience the divine presence of Goddess Varahi and receive her blessings.</p>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Temple Location</h4>
                    <p>Valloor Alumthazham Sree Mahavarahi Devi Kshethram
                      P.O. Puthenpeedika, Anthikad,
                      Thrissur Dist,   680642
                    </p>
                    <button className="direction-btn">
                      <i className="fas fa-directions"></i>
                      Get Directions
                    </button>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>8304091400 (Office)<br />8593999585 (Praveen) <br />9656712021 (Sinish) <br /> 8943403800 (Subin)</p>
                    <button className="call-btn">
                      <i className="fas fa-phone"></i>
                      Call Now
                    </button>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-content">
                    <h4>Temple Hours</h4>
                    <p>Morning: 5:30 AM - 12:00 PM<br />Evening: 4:00 PM - 8:00 PM</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p>alumthazham@gmail.com</p>
                    <button className="email-btn">
                      <i className="fas fa-envelope"></i>
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-building"></i>
              <span>Temple Departments</span>
            </div>
            <h2>Connect with Specific Departments</h2>
            <p>Reach out to the right department for your specific needs</p>
          </div>

          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div
                key={dept.id}
                className="department-card"
                data-aos="fade-up"
                data-aos-delay={100 + index * 150}
              >
                <div className="dept-image">
                  <img src={dept.image} alt={dept.name} />
                  <div className="dept-overlay">
                    <div className="dept-icon">
                      <i className={dept.icon}></i>
                    </div>
                  </div>
                </div>
                <div className="dept-content">
                  <h3>{dept.name}</h3>
                  <div className="dept-head">
                    <i className="fas fa-user"></i>
                    <span>{dept.head}</span>
                  </div>
                  <p className="dept-description">{dept.description}</p>

                  <div className="dept-contacts">
                    <div className="dept-contact">
                      <i className="fas fa-phone"></i>
                      <span>{dept.phone}</span>
                    </div>
                    <div className="dept-contact">
                      <i className="fas fa-envelope"></i>
                      <span>{dept.email}</span>
                    </div>
                  </div>

                  <div className="dept-actions">
                    <button className="btn btn-primary">
                      <i className="fas fa-phone"></i>
                      Call
                    </button>
                    <button className="btn btn-outline">
                      <i className="fas fa-envelope"></i>
                      Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-question-circle"></i>
              <span>Frequently Asked</span>
            </div>
            <h2>Common Questions</h2>
            <p>Find answers to frequently asked questions about our temple</p>
          </div>

          <div className="faq-content">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="faq-item"
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  <div className="faq-question">
                    <h4>{faq.question}</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-contact" data-aos="fade-left">
              <div className="faq-contact-content">
                <h3>Still Have Questions?</h3>
                <p>If you couldn't find the answer you're looking for, feel free to contact us directly.</p>
                <div className="faq-contact-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-phone"></i>
                    Call Us
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-envelope"></i>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      {/* <section className="emergency-contact">
        <div className="container">
          <div className="emergency-content" data-aos="fade-up">
            <div className="emergency-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="emergency-text">
              <h2>Emergency Contact</h2>
              <p>For urgent temple-related matters or emergencies, please contact us immediately.</p>
            </div>
            <div className="emergency-actions">
              <button className="btn btn-emergency">
                <i className="fas fa-phone"></i>
                Emergency: +91 8304091400
              </button>
              <span className="emergency-note">Available 24/7</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;