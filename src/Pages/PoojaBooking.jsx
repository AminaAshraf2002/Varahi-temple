// PoojaBooking.jsx - Enhanced with Real Razorpay Integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { poojaService } from '../services/poojaService';
import './PoojaBooking.css';

const PoojaBooking = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPoojas, setFilteredPoojas] = useState([]);
  const [allPoojas, setAllPoojas] = useState([]);
  const [stars, setStars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  
  const [formData, setFormData] = useState({
    devoteName: '',
    star: '',
    paymentMethod: '',
    poojaDate: ''
  });

  // Razorpay configuration - DUMMY KEYS (Replace with your actual keys)
  const RAZORPAY_CONFIG = {
    key_id: "rzp_test_1234567890", // Replace with your actual Razorpay Key ID
    key_secret: "razorpay_secret_test_key", // This should be in your backend only
    currency: "INR",
    name: "Aalumthazham Sree Varahi Temple",
    description: "Pooja Booking Payment",
    image: "/temple-logo.png", // Add your temple logo
    theme: {
      color: "#8B0000"
    }
  };

  // Payment methods - Real Razorpay options
  const paymentMethods = [
    'UPI Payment',
    'Credit Card',
    'Debit Card', 
    'Net Banking',
    'Google Pay',
    'PhonePe',
    'Paytm',
    'BHIM UPI'
  ];

  const poojaPerPage = 12;
  const months = [
    { value: 'all', label: 'All Months' },
    { value: '01', label: 'January 2025' },
    { value: '02', label: 'February 2025' },
    { value: '03', label: 'March 2025' },
    { value: '04', label: 'April 2025' },
    { value: '05', label: 'May 2025' },
    { value: '06', label: 'June 2025' },
    { value: '07', label: 'July 2025' },
    { value: '08', label: 'August 2025' },
    { value: '09', label: 'September 2025' },
    { value: '10', label: 'October 2025' },
    { value: '11', label: 'November 2025' }
  ];

  const categories = [
    { value: 'all', label: 'All Poojas' },
    { value: 'regular', label: 'Regular Poojas' },
    { value: 'special', label: 'Special Poojas' },
    { value: 'festival', label: 'Festival Poojas' }
  ];

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setConnectionError(false);
    
    try {
      await poojaService.testConnection();
      
      const [poojaData, starData] = await Promise.all([
        poojaService.getAllPoojas(),
        poojaService.getAllStars()
      ]);
      
      setAllPoojas(poojaData);
      setFilteredPoojas(poojaData);
      setStars(starData);
      
      console.log(`Loaded ${poojaData.length} poojas and ${starData.length} stars`);
    } catch (error) {
      console.error('Error loading data:', error);
      setConnectionError(true);
      
      if (error.message.includes('fetch')) {
        alert('Unable to connect to temple server. Please check if the backend is running on http://localhost:3001');
      } else {
        alert('Failed to load temple data. Please refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter poojas when month or category changes
  useEffect(() => {
    let filtered = [...allPoojas];
    
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(pooja => 
        pooja.date.split('-')[1] === selectedMonth
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pooja => pooja.category === selectedCategory);
    }
    
    setFilteredPoojas(filtered);
    setCurrentPage(1);
  }, [selectedMonth, selectedCategory, allPoojas]);

  const handleBookingClick = (pooja) => {
    if (pooja.availableSlots <= 0) {
      alert('Sorry, this pooja is fully booked (100/100 participants)');
      return;
    }
    setSelectedPooja(pooja);
    setShowBookingModal(true);
    setFormData({
      devoteName: '',
      star: '',
      paymentMethod: '',
      poojaDate: pooja.date
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const validation = poojaService.validateBookingData({
      ...formData,
      poojaId: selectedPooja?.id
    });
    
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return false;
    }
    
    return true;
  };

  // Enhanced Razorpay Payment Handler
  const handleRazorpayPayment = (bookingData) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: RAZORPAY_CONFIG.key_id,
        amount: bookingData.amount * 100, // Amount in paise
        currency: RAZORPAY_CONFIG.currency,
        name: RAZORPAY_CONFIG.name,
        description: `${bookingData.poojaEnglish} - ${bookingData.devoteName}`,
        image: RAZORPAY_CONFIG.image,
        order_id: bookingData.razorpayOrderId,
        handler: function (response) {
          console.log('Razorpay payment success:', response);
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        },
        modal: {
          ondismiss: function() {
            console.log('Razorpay payment modal dismissed');
            reject({
              success: false,
              error: 'Payment cancelled by user'
            });
          }
        },
        theme: RAZORPAY_CONFIG.theme,
        prefill: {
          name: bookingData.devoteName,
          contact: '', // Add phone number if collected
          email: ''    // Add email if collected
        },
        notes: {
          pooja_name: bookingData.poojaEnglish,
          participant_number: bookingData.participantNumber,
          booking_id: bookingData.bookingId
        }
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        reject({
          success: false,
          error: 'Razorpay SDK not loaded'
        });
      }
    });
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) return;
    
    if (selectedPooja.availableSlots <= 0) {
      alert('Sorry, this pooja is now fully booked');
      setShowBookingModal(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const bookingData = {
        devoteName: formData.devoteName.trim(),
        star: formData.star,
        paymentMethod: formData.paymentMethod,
        poojaDate: formData.poojaDate,
        poojaId: selectedPooja.id
      };

      console.log('Creating booking:', bookingData);

      // Step 1: Create booking and get Razorpay order
      const bookingResult = await poojaService.createBooking(bookingData);

      if (bookingResult.status === 'success') {
        console.log('Booking created, initiating Razorpay payment...');

        // Step 2: Launch Razorpay payment
        try {
          const paymentData = {
            ...bookingData,
            bookingId: bookingResult.bookingId,
            razorpayOrderId: bookingResult.razorpayOrderId,
            amount: bookingResult.amount,
            poojaEnglish: selectedPooja.poojaEnglish,
            participantNumber: selectedPooja.bookedCount + 1
          };

          const paymentResult = await handleRazorpayPayment(paymentData);

          if (paymentResult.success) {
            console.log('Razorpay payment successful, completing booking...');

            // Step 3: Complete payment on backend
            const completionResult = await poojaService.completePayment({
              bookingId: bookingResult.bookingId,
              razorpayPaymentId: paymentResult.paymentId,
              razorpayOrderId: paymentResult.orderId,
              razorpaySignature: paymentResult.signature
            });

            if (completionResult.status === 'success') {
              alert('🎉 Payment successful! Generating your receipt...');
              
              // Navigate to receipt page
              navigate('/receipt', { 
                state: { 
                  bookingData: completionResult.receiptData 
                } 
              });

              setShowBookingModal(false);
              
              // Refresh poojas to update counts
              try {
                const updatedPoojas = await poojaService.getAllPoojas();
                setAllPoojas(updatedPoojas);
              } catch (error) {
                console.log('Failed to refresh poojas, but payment was successful');
              }
            } else {
              throw new Error(completionResult.message || 'Failed to complete payment verification');
            }
          }
        } catch (paymentError) {
          console.error('Payment error:', paymentError);
          
          if (paymentError.error === 'Payment cancelled by user') {
            alert('Payment was cancelled. Your booking slot is still reserved for 10 minutes.');
          } else {
            alert('Payment failed: ' + (paymentError.error || 'Unknown payment error'));
          }
        }
      } else {
        throw new Error(bookingResult.message || 'Failed to create booking');
      }
      
    } catch (error) {
      console.error('Booking error:', error);
      
      if (error.message.includes('400')) {
        alert('Invalid booking data. Please check all fields.');
      } else if (error.message.includes('404')) {
        alert('Pooja not found. Please refresh and try again.');
      } else if (error.message.includes('fetch')) {
        alert('Connection error. Please check if the server is running.');
      } else {
        alert('Booking failed: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (availableSlots) => {
    if (availableSlots > 50) return '#28a745';
    if (availableSlots > 20) return '#ffc107';
    return '#dc3545';
  };

  // Pagination
  const indexOfLastPooja = currentPage * poojaPerPage;
  const indexOfFirstPooja = indexOfLastPooja - poojaPerPage;
  const currentPoojas = filteredPoojas.slice(indexOfFirstPooja, indexOfLastPooja);
  const totalPages = Math.ceil(filteredPoojas.length / poojaPerPage);

  if (loading) {
    return (
      <div className="pooja-booking-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading temple poojas...</h2>
          <p>Connecting to temple server...</p>
          {connectionError && (
            <div style={{ marginTop: '20px', color: 'red' }}>
              <p>Connection failed! Please ensure:</p>
              <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                <li>Backend server is running on port 3001</li>
                <li>Run: node index.js in temple-server folder</li>
              </ul>
              <button 
                onClick={loadInitialData}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#8B0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Retry Connection
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pooja-booking-page">
      <Header />
      
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Pooja Booking</h1>
            <h2>Book Sacred Rituals</h2>
            <p>Reserve your spot for divine blessings at Aalumthazham Sree Varahi Temple</p>
            <p>Limited to 100 participants per pooja - Book now!</p>
            <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.9 }}>
              <strong>🔒 Secure Payment via Razorpay</strong> - UPI, Cards, Net Banking supported
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="month-filter">
                <i className="fas fa-calendar-alt"></i>
                Month:
              </label>
              <select
                id="month-filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="category-filter">
                <i className="fas fa-filter"></i>
                Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="results-info">
              <span className="results-count">
                {filteredPoojas.length} Poojas Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Poojas Grid */}
      <section className="poojas-section">
        <div className="container">
          <div className="poojas-grid">
            {currentPoojas.map(pooja => (
              <div key={pooja.id} className={`pooja-card ${pooja.special ? 'special-pooja' : ''} ${pooja.category} ${!pooja.available ? 'fully-booked' : ''}`}>
                <div className="pooja-header">
                  <div className="pooja-date">
                    <span className="english-date">{formatDate(pooja.date)}</span>
                    <span className="malayalam-date">{pooja.malayalamDate} ({pooja.day})</span>
                  </div>
                  {pooja.special && (
                    <div className="special-badge">
                      <i className="fas fa-star"></i>
                      Special
                    </div>
                  )}
                </div>

                <div className="pooja-content">
                  <h3 className="pooja-name-english">{pooja.poojaEnglish}</h3>
                  <h4 className="pooja-name-malayalam">{pooja.pooja}</h4>
                  
                  <div className="pooja-details">
                    <div className="pooja-amount">
                      <i className="fas fa-rupee-sign"></i>
                      <span>{pooja.amount}</span>
                    </div>
                    
                    <div className="pooja-category">
                      <i className={`fas ${
                        pooja.category === 'festival' ? 'fa-calendar-week' :
                        pooja.category === 'special' ? 'fa-star' : 'fa-pray'
                      }`}></i>
                      <span>{
                        pooja.category === 'festival' ? 'Festival' :
                        pooja.category === 'special' ? 'Special' : 'Regular'
                      }</span>
                    </div>
                  </div>

                  {/* Enhanced Booking Progress */}
                  <div className="booking-progress">
                    <div className="progress-info">
                      <span className="booked-count">{pooja.bookedCount || 0}/100 Booked</span>
                      <span className="available-slots" style={{color: getProgressColor(pooja.availableSlots)}}>
                        {pooja.availableSlots} slots left
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{
                          width: `${((pooja.bookedCount || 0) / 100) * 100}%`,
                          backgroundColor: getProgressColor(pooja.availableSlots)
                        }}
                      ></div>
                    </div>
                    <div className="booking-status-indicator">
                      {pooja.availableSlots > 80 && <span className="status-high">🟢 High Availability</span>}
                      {pooja.availableSlots <= 80 && pooja.availableSlots > 20 && <span className="status-medium">🟡 Medium Availability</span>}
                      {pooja.availableSlots <= 20 && pooja.availableSlots > 0 && <span className="status-low">🔴 Limited Slots</span>}
                      {pooja.availableSlots === 0 && <span className="status-full">⛔ Fully Booked</span>}
                    </div>
                  </div>

                  <button
                    className={`book-btn ${!pooja.available ? 'disabled' : ''}`}
                    onClick={() => handleBookingClick(pooja)}
                    disabled={!pooja.available}
                  >
                    <i className="fas fa-calendar-check"></i>
                    {pooja.available ? 'Book with Razorpay' : 'Fully Booked'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn prev"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                className="page-btn next"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Booking Modal with Real Razorpay Integration */}
      {showBookingModal && selectedPooja && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title">
                <i className="fab fa-cc-visa"></i>
                Secure Razorpay Payment - Complete Booking Details
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="modal-close-btn"
                disabled={isLoading}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Pooja Details Card */}
              <div className="pooja-details-card">
                <div className="pooja-info">
                  <h3>{selectedPooja.poojaEnglish}</h3>
                  <h4>{selectedPooja.pooja}</h4>
                  <div className="pooja-meta">
                    <span className="pooja-date-info">
                      📅 {selectedPooja.malayalamDate} ({selectedPooja.day})
                    </span>
                    <span className="pooja-amount-info">
                      💰 ₹{selectedPooja.amount} per person
                    </span>
                  </div>
                  <div className="participant-info">
                    <span>👥 You will be participant #{(selectedPooja.bookedCount || 0) + 1} of 100</span>
                    <span className="slots-remaining">
                      ⏳ {selectedPooja.availableSlots} slots remaining
                    </span>
                  </div>
                </div>
                <div className="payment-security-badge">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <strong>100% Secure Payment</strong>
                    <small>Powered by Razorpay</small>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-section">
                <div className="form-row">
                  <div className="form-field">
                    <label>
                      <i className="fas fa-user"></i>
                      Devotee Name *
                    </label>
                    <input
                      type="text"
                      value={formData.devoteName}
                      onChange={(e) => handleInputChange('devoteName', e.target.value)}
                      placeholder="Enter full name of devotee"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>
                      <i className="fas fa-star"></i>
                      Star (Nakshatra) *
                    </label>
                    <select
                      value={formData.star}
                      onChange={(e) => handleInputChange('star', e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">-- Select Your Star --</option>
                      {stars.map((star, index) => (
                        <option key={index} value={star}>{star}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>
                      <i className="fas fa-credit-card"></i>
                      Preferred Payment Method *
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">-- Choose Payment Option --</option>
                      {paymentMethods.map((method, index) => (
                        <option key={index} value={method}>{method}</option>
                      ))}
                    </select>
                    <small className="payment-note">
                      Final payment method can be selected in Razorpay checkout
                    </small>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>
                      <i className="fas fa-calendar"></i>
                      Pooja Date *
                    </label>
                    <input
                      type="date"
                      value={formData.poojaDate}
                      onChange={(e) => handleInputChange('poojaDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="payment-summary">
                <div className="summary-header">
                  <h4>Payment Summary</h4>
                </div>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Pooja Fee:</span>
                    <span>₹{selectedPooja.amount}</span>
                  </div>
                  <div className="summary-row">
                    <span>Processing Fee:</span>
                    <span>₹0 <small>(Free)</small></span>
                  </div>
                  <div className="summary-row total">
                    <span><strong>Total Amount:</strong></span>
                    <span><strong>₹{selectedPooja.amount}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="cancel-btn"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookingSubmit}
                  className="razorpay-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-cc-visa"></i>
                      Pay ₹{selectedPooja.amount} with Razorpay
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Important Notes Section */}
      <section className="notes-section">
        <div className="container">
          <div className="notes-card">
            <div className="notes-header">
              <h3>
                <i className="fas fa-info-circle"></i>
                Important Booking Information
              </h3>
            </div>
            <div className="notes-content">
              <div className="notes-grid">
                <div className="note-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>Limited Capacity</h4>
                    <p>Only 100 participants allowed per pooja. Book early to secure your spot.</p>
                  </div>
                </div>
                
                <div className="note-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h4>Advance Booking</h4>
                    <p>Book at least 2 days in advance. Same-day bookings not accepted.</p>
                  </div>
                </div>
                
                <div className="note-item">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <h4>Secure Razorpay Payment</h4>
                    <p>All payments processed securely via Razorpay. UPI, Cards, Net Banking supported.</p>
                  </div>
                </div>

                <div className="note-item">
                  <i className="fas fa-mobile-alt"></i>
                  <div>
                    <h4>Instant Confirmation</h4>
                    <p>Receive instant SMS & email confirmation with receipt after successful payment.</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-info">
                <p>
                  <i className="fas fa-headset"></i>
                  For any queries or support: 
                  <strong> +91 8304091400</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Enhanced Modal Styles (add to your CSS)
const modalStyles = `
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.booking-modal {
  background: white;
  width: 700px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  background: linear-gradient(135deg, #8B0000, #A52A2A);
  color: white;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 50%;
  transition: background 0.2s;
}

.modal-close-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content {
  padding: 30px;
}

.pooja-details-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  border: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pooja-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 22px;
  font-weight: 700;
}

.pooja-info h4 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

.pooja-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.pooja-date-info, .pooja-amount-info {
  font-size: 14px;
  color: #555;
}

.participant-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 13px;
  color: #666;
}

.slots-remaining {
  color: #28a745;
  font-weight: 600;
}

.payment-security-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #28a745;
}

.payment-security-badge i {
  font-size: 24px;
  color: #28a745;
}

.payment-security-badge strong {
  color: #333;
  font-size: 14px;
}

.payment-security-badge small {
  color: #666;
  font-size: 12px;
}

.form-section {
  margin-bottom: 25px;
}

.form-row {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-field label i {
  color: #8B0000;
}

.form-field input,
.form-field select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: #8B0000;
  box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
}

.form-field input:disabled,
.form-field select:disabled {
  background: #f8f9fa;
  opacity: 0.7;
}

.payment-note {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.payment-summary {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
}

.summary-header {
  margin-bottom: 15px;
}

.summary-header h4 {
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.summary-row.total {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 10px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.cancel-btn:hover:not(:disabled) {
  background: #5a6268;
}

.razorpay-btn {
  background: linear-gradient(135deg, #2c5f41, #357a50);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(44, 95, 65, 0.3);
}

.razorpay-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #357a50, #2c5f41);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(44, 95, 65, 0.4);
}

.razorpay-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.booking-status-indicator {
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
}

.status-high { color: #28a745; }
.status-medium { color: #ffc107; }
.status-low { color: #fd7e14; }
.status-full { color: #dc3545; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .booking-modal {
    width: 95vw;
    margin: 10px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .pooja-details-card {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .razorpay-btn {
    width: 100%;
    justify-content: center;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
}

export default PoojaBooking;