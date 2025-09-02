// AdminDashboard.jsx - Enhanced with Expandable User Lists and Better Booking Management
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedPooja, setSelectedPooja] = useState('all');
  const [dashboardData, setDashboardData] = useState(null);
  const [participantData, setParticipantData] = useState({});
  const [expandedPoojas, setExpandedPoojas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState({});

  // Check if admin is logged in
  useEffect(() => {
    if (!adminService.isLoggedIn()) {
      navigate('/admin');
      return;
    }
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Loading dashboard data...');
      const data = await adminService.getDashboard();
      console.log('Dashboard data loaded:', data);
      
      setDashboardData(data);
      
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
      
      if (error.message.includes('401')) {
        adminService.logout();
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadParticipantData = async (poojaId) => {
    setLoadingParticipants(prev => ({ ...prev, [poojaId]: true }));
    
    try {
      const participants = await adminService.getPoojaParticipants(poojaId);
      setParticipantData(prev => ({ ...prev, [poojaId]: participants }));
    } catch (error) {
      console.error(`Error loading participants for pooja ${poojaId}:`, error);
      setParticipantData(prev => ({ ...prev, [poojaId]: { participants: [], statistics: {} } }));
    } finally {
      setLoadingParticipants(prev => ({ ...prev, [poojaId]: false }));
    }
  };

  const togglePoojaExpansion = async (poojaId) => {
    const isCurrentlyExpanded = expandedPoojas[poojaId];
    
    setExpandedPoojas(prev => ({
      ...prev,
      [poojaId]: !isCurrentlyExpanded
    }));

    // Load participants if expanding and not already loaded
    if (!isCurrentlyExpanded && !participantData[poojaId]) {
      await loadParticipantData(poojaId);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    // Refresh any currently expanded poojas
    const expandedPoojaIds = Object.keys(expandedPoojas).filter(id => expandedPoojas[id]);
    for (const poojaId of expandedPoojaIds) {
      await loadParticipantData(parseInt(poojaId));
    }
    setRefreshing(false);
  };

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin');
  };

  const getFilteredPoojas = () => {
    if (!dashboardData?.poojaStats) return [];
    
    if (selectedPooja === 'all') return dashboardData.poojaStats;
    return dashboardData.poojaStats.filter(pooja => pooja.id === parseInt(selectedPooja));
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'failed':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const exportParticipantList = (pooja) => {
    if (!participantData[pooja.id]) return;

    const bookedParticipants = participantData[pooja.id].participants
      .filter(p => p.status === 'booked');

    const csvContent = [
      ['Participant #', 'Devotee Name', 'Star', 'Booking Date', 'Receipt Number', 'Transaction ID', 'Payment Method'],
      ...bookedParticipants.map(p => [
        p.slotNumber,
        p.devoteName,
        p.star,
        formatDateTime(p.bookingDate),
        p.receiptNumber,
        p.transactionId,
        p.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pooja.name}_participants_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admindashboard-container">
        <div className="admindashboard-loading-state">
          <div className="admindashboard-spinner"></div>
          <h2>Loading Admin Dashboard...</h2>
          <p>Fetching real-time booking data from temple server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admindashboard-container">
        <div className="admindashboard-error-state">
          <div className="error-icon">⚠️</div>
          <h2>{error}</h2>
          <button 
            onClick={loadDashboardData}
            className="admindashboard-retry-btn"
          >
            <i className="fas fa-redo"></i>
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admindashboard-container">
      {/* Enhanced Header */}
      <div className="admindashboard-header">
        <div className="admindashboard-header-content">
          <div className="admindashboard-title">
            <div className="temple-icon">🏛️</div>
            <div>
              <h1>Temple Admin Dashboard</h1>
              <span className="admindashboard-temple-name">Aalumthazham Sree Varahi Temple</span>
            </div>
          </div>
          <div className="admindashboard-actions">
            <button 
              onClick={handleRefresh} 
              className="admindashboard-refresh-btn"
              disabled={refreshing}
            >
              <i className={`fas fa-sync-alt ${refreshing ? 'fa-spin' : ''}`}></i>
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <button onClick={() => navigate('/')} className="admindashboard-view-site-btn">
              <i className="fas fa-globe"></i>
              View Website
            </button>
            <button onClick={handleLogout} className="admindashboard-logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admindashboard-content">
        {/* Enhanced Summary Stats */}
        <div className="admindashboard-summary-stats">
          <div className="admindashboard-summary-item">
            <div className="summary-icon">
              <i className="fas fa-om"></i>
            </div>
            <div className="summary-details">
              <span className="admindashboard-summary-number">
                {dashboardData?.overview?.totalPoojas || 0}
              </span>
              <span className="admindashboard-summary-label">Total Poojas</span>
              <span className="summary-subtitle">Available for booking</span>
            </div>
          </div>

          <div className="admindashboard-summary-item">
            <div className="summary-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="summary-details">
              <span className="admindashboard-summary-number">
                {dashboardData?.overview?.totalBookings || 0}
              </span>
              <span className="admindashboard-summary-label">Total Bookings</span>
              <span className="summary-subtitle">Completed payments</span>
            </div>
          </div>

          <div className="admindashboard-summary-item">
            <div className="summary-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="summary-details">
              <span className="admindashboard-summary-number">
                {dashboardData?.overview?.pendingBookings || 0}
              </span>
              <span className="admindashboard-summary-label">Pending Payments</span>
              <span className="summary-subtitle">Awaiting completion</span>
            </div>
          </div>

          <div className="admindashboard-summary-item">
            <div className="summary-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="summary-details">
              <span className="admindashboard-summary-number">
                {formatCurrency(dashboardData?.overview?.totalRevenue || 0)}
              </span>
              <span className="admindashboard-summary-label">Total Revenue</span>
              <span className="summary-subtitle">All completed bookings</span>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Bookings */}
        {dashboardData?.recentBookings && dashboardData.recentBookings.length > 0 && (
          <div className="admindashboard-recent-bookings-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-clock"></i>
                Recent Bookings
              </h3>
              <span className="section-badge">
                Last {dashboardData.recentBookings.length} bookings
              </span>
            </div>
            <div className="recent-bookings-container">
              <div className="bookings-table-wrapper">
                <table className="admindashboard-recent-bookings-table">
                  <thead>
                    <tr>
                      <th>Receipt</th>
                      <th>Devotee Name</th>
                      <th>Pooja</th>
                      <th>Star</th>
                      <th>Amount</th>
                      <th>Booking Date</th>
                      <th>Participant #</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentBookings.slice(0, 8).map((booking, index) => (
                      <tr key={index} className="booking-row">
                        <td>
                          <span className="receipt-number">{booking.receiptNumber}</span>
                        </td>
                        <td>
                          <span className="devotee-name">{booking.devoteName}</span>
                        </td>
                        <td>
                          <span className="pooja-name">{booking.poojaEnglish}</span>
                        </td>
                        <td>
                          <span className="star-badge">{booking.star}</span>
                        </td>
                        <td>
                          <span className="amount">{formatCurrency(booking.amount)}</span>
                        </td>
                        <td>
                          <span className="booking-date">{formatDateTime(booking.date)}</span>
                        </td>
                        <td>
                          <span className="participant-number">#{booking.participantNumber}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Pooja Filter */}
        <div className="admindashboard-pooja-filter">
          <div className="filter-header">
            <h3>
              <i className="fas fa-filter"></i>
              Pooja Management & Participant Lists
            </h3>
            <div className="filter-info">
              <span className="total-poojas">
                {dashboardData?.poojaStats?.length || 0} Total Poojas
              </span>
            </div>
          </div>
          <div className="admindashboard-filter-controls">
            <div className="filter-select-wrapper">
              <select 
                value={selectedPooja} 
                onChange={(e) => setSelectedPooja(e.target.value)}
                className="admindashboard-pooja-select"
              >
                <option value="all">
                  🔍 View All Poojas ({dashboardData?.poojaStats?.length || 0} total)
                </option>
                {dashboardData?.poojaStats?.map(pooja => (
                  <option key={pooja.id} value={pooja.id}>
                    📅 {pooja.name} - {pooja.bookedCount}/{pooja.maxParticipants} booked ({formatCurrency(pooja.revenue)} revenue)
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-summary">
              <span className="filter-result">
                Showing: {selectedPooja === 'all' 
                  ? `All ${dashboardData?.poojaStats?.length || 0} poojas` 
                  : dashboardData?.poojaStats?.find(p => p.id === parseInt(selectedPooja))?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Poojas Section with Expandable Lists */}
        <div className="admindashboard-poojas-section">
          {getFilteredPoojas().map(pooja => (
            <div key={pooja.id} className="admindashboard-pooja-container">
              {/* Pooja Header with Click to Expand */}
              <div 
                className="admindashboard-pooja-header"
                onClick={() => togglePoojaExpansion(pooja.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="admindashboard-pooja-info">
                  <div className="pooja-title-section">
                    <h3>{pooja.name}</h3>
                    <h4>{pooja.malayalam}</h4>
                    <div className="admindashboard-pooja-meta">
                      <span className="pooja-date">📅 Date: {formatDate(pooja.date)}</span>
                      <span className="pooja-category">
                        {pooja.category === 'festival' && '🎉 Festival'}
                        {pooja.category === 'special' && '⭐ Special'}
                        {pooja.category === 'regular' && '🙏 Regular'}
                      </span>
                      <span className="admindashboard-pooja-amount">💰 ₹{pooja.amount} per person</span>
                      <span className="admindashboard-pooja-revenue">
                        💵 Revenue: {formatCurrency(pooja.revenue)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="admindashboard-pooja-stats">
                  <div className="admindashboard-participants-count">
                    <span className="admindashboard-count">{pooja.bookedCount}/{pooja.maxParticipants}</span>
                    <span className="admindashboard-label">Participants</span>
                  </div>
                  
                  <div className="admindashboard-progress-section">
                    <div className="admindashboard-progress-bar">
                      <div 
                        className="admindashboard-progress-fill" 
                        style={{ 
                          width: `${(pooja.bookedCount / pooja.maxParticipants) * 100}%`,
                          backgroundColor: pooja.isFullyBooked ? '#dc3545' : 
                                         pooja.bookedCount > 80 ? '#ffc107' : '#28a745'
                        }}
                      ></div>
                    </div>
                    <div className="progress-percentage">
                      {Math.round((pooja.bookedCount / pooja.maxParticipants) * 100)}% Full
                    </div>
                  </div>

                  <div className="admindashboard-status">
                    {pooja.isFullyBooked ? (
                      <span className="admindashboard-full">🔴 FULL</span>
                    ) : (
                      <span className="admindashboard-available">
                        🟢 {pooja.availableSlots} slots left
                      </span>
                    )}
                  </div>

                  <div className="expand-indicator">
                    <i className={`fas fa-chevron-${expandedPoojas[pooja.id] ? 'up' : 'down'}`}></i>
                    <span>{expandedPoojas[pooja.id] ? 'Hide' : 'Show'} Participants</span>
                  </div>
                </div>
              </div>

              {/* Expandable Participants Section */}
              {expandedPoojas[pooja.id] && (
                <div className="admindashboard-participants-section">
                  <div className="participants-section-header">
                    <h4>
                      <i className="fas fa-users"></i>
                      Participant Details
                    </h4>
                    <div className="participants-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          loadParticipantData(pooja.id);
                        }}
                        disabled={loadingParticipants[pooja.id]}
                        className="refresh-participants-btn"
                      >
                        <i className={`fas fa-sync-alt ${loadingParticipants[pooja.id] ? 'fa-spin' : ''}`}></i>
                        Refresh
                      </button>
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportParticipantList(pooja);
                        }}
                        disabled={!participantData[pooja.id] || pooja.bookedCount === 0}
                        className="export-participants-btn"
                      >
                        <i className="fas fa-download"></i>
                        Export CSV
                      </button> */}
                    </div>
                  </div>

                  {loadingParticipants[pooja.id] ? (
                    <div className="participants-loading">
                      <div className="admindashboard-spinner"></div>
                      <p>Loading participant details...</p>
                    </div>
                  ) : participantData[pooja.id] ? (
                    <div className="participants-table-container">
                      <div className="participants-summary">
                        <div className="summary-stat">
                          <span className="stat-number">{pooja.bookedCount}</span>
                          <span className="stat-label">Booked</span>
                        </div>
                        <div className="summary-stat">
                          <span className="stat-number">{pooja.availableSlots}</span>
                          <span className="stat-label">Available</span>
                        </div>
                        <div className="summary-stat revenue">
                          <span className="stat-number">{formatCurrency(pooja.revenue)}</span>
                          <span className="stat-label">Total Revenue</span>
                        </div>
                      </div>

                      <div className="participants-table-wrapper">
                        <table className="admindashboard-participants-table">
                          <thead>
                            <tr>
                              <th style={{ width: '60px' }}>#</th>
                              <th>Devotee Name</th>
                              <th>Star (Nakshatra)</th>
                              <th>Booking Date</th>
                              <th>Receipt No.</th>
                              <th>Payment Method</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {participantData[pooja.id].participants.map((participant, index) => (
                              <tr 
                                key={index} 
                                className={participant.status === 'available' ? 'admindashboard-empty-slot' : 'admindashboard-participant-row'}
                              >
                                <td className="admindashboard-participant-number">
                                  <span className="slot-number">
                                    {participant.slotNumber}
                                  </span>
                                </td>
                                <td className={participant.status === 'available' ? 'admindashboard-empty-cell' : 'admindashboard-participant-name'}>
                                  {participant.status === 'booked' ? (
                                    <div className="devotee-info">
                                      <span className="name">{participant.devoteName}</span>
                                    </div>
                                  ) : (
                                    <span className="available-slot">Available Slot</span>
                                  )}
                                </td>
                                <td className={participant.status === 'available' ? 'admindashboard-empty-cell' : 'admindashboard-participant-star'}>
                                  {participant.status === 'booked' ? (
                                    <span className="star-tag">{participant.star}</span>
                                  ) : (
                                    <span className="empty-indicator">-</span>
                                  )}
                                </td>
                                <td className={participant.status === 'available' ? 'admindashboard-empty-cell' : 'admindashboard-booking-date'}>
                                  {participant.status === 'booked' && participant.bookingDate ? (
                                    <div className="booking-date-info">
                                      <span className="date">{formatDate(participant.bookingDate)}</span>
                                      <span className="time">{new Date(participant.bookingDate).toLocaleTimeString('en-IN', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      })}</span>
                                    </div>
                                  ) : (
                                    <span className="empty-indicator">-</span>
                                  )}
                                </td>
                                <td className="receipt-cell">
                                  {participant.status === 'booked' ? (
                                    <span className="receipt-code">{participant.receiptNumber}</span>
                                  ) : (
                                    <span className="empty-indicator">-</span>
                                  )}
                                </td>
                                <td className="payment-method-cell">
                                  {participant.status === 'booked' ? (
                                    <span className="payment-method">{participant.paymentMethod}</span>
                                  ) : (
                                    <span className="empty-indicator">-</span>
                                  )}
                                </td>
                                <td className={participant.status === 'available' ? 'admindashboard-empty-cell' : 'admindashboard-amount'}>
                                  {participant.status === 'booked' ? (
                                    <span className="amount-paid">₹{pooja.amount}</span>
                                  ) : (
                                    <span className="empty-indicator">-</span>
                                  )}
                                </td>
                                <td className="status-cell">
                                  <span className={`status-badge status-${participant.status}`}>
                                    {participant.status === 'booked' ? (
                                      <>
                                        <i className="fas fa-check-circle"></i>
                                        BOOKED
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-circle"></i>
                                        AVAILABLE
                                      </>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Quick Stats for this pooja */}
                      <div className="pooja-quick-stats">
                        <div className="quick-stat">
                          <i className="fas fa-users"></i>
                          <span>{participantData[pooja.id].participants.filter(p => p.status === 'booked').length} Confirmed Bookings</span>
                        </div>
                        <div className="quick-stat">
                          <i className="fas fa-clock"></i>
                          <span>
                            Last booking: {
                              participantData[pooja.id].participants
                                .filter(p => p.status === 'booked' && p.bookingDate)
                                .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))[0]?.bookingDate
                                ? formatDateTime(participantData[pooja.id].participants
                                    .filter(p => p.status === 'booked' && p.bookingDate)
                                    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))[0].bookingDate)
                                : 'No bookings yet'
                            }
                          </span>
                        </div>
                        <div className="quick-stat">
                          <i className="fas fa-chart-line"></i>
                          <span>{Math.round((pooja.bookedCount / pooja.maxParticipants) * 100)}% Capacity Filled</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="participants-not-loaded">
                      <div className="not-loaded-content">
                        <i className="fas fa-info-circle"></i>
                        <p>Click "Refresh" to load detailed participant information for this pooja</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            loadParticipantData(pooja.id);
                          }}
                          className="load-participants-btn"
                        >
                          <i className="fas fa-download"></i>
                          Load Participant Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* No Poojas Message */}
          {getFilteredPoojas().length === 0 && (
            <div className="no-poojas-message">
              <div className="no-data-icon">📅</div>
              <h3>No Poojas Found</h3>
              <p>No poojas match your current filter criteria.</p>
              <button 
                onClick={() => setSelectedPooja('all')}
                className="show-all-btn"
              >
                Show All Poojas
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Footer Info */}
        <div className="admindashboard-footer-info">
          <div className="admindashboard-note">
            <div className="note-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="note-content">
              <h4>Admin Dashboard Information</h4>
              <div className="note-details">
                <div className="note-item">
                  <strong>Real-time Data:</strong> All booking information is updated automatically when devotees make payments through Razorpay.
                </div>
                <div className="note-item">
                  <strong>Participant Management:</strong> Click on any pooja header to view detailed participant lists, booking dates, and payment information.
                </div>
                {/* <div className="note-item">
                  <strong>Export Functionality:</strong> Export participant lists as CSV files for record keeping and offline management.
                </div> */}
                <div className="note-item">
                  <strong>Last Updated:</strong> {new Date().toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-version">
            <span>Temple Admin Dashboard v2.0 | Enhanced with Razorpay Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional CSS styles for enhanced features
const enhancedStyles = `
.admindashboard-loading-state,
.admindashboard-error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}

.admindashboard-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #8B0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.admindashboard-retry-btn {
  padding: 12px 24px;
  background: #8B0000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.temple-icon {
  font-size: 2.5rem;
}

.admindashboard-refresh-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.summary-icon {
  font-size: 2rem;
  color: #8B0000;
  background: rgba(139, 0, 0, 0.1);
  padding: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.summary-subtitle {
  font-size: 0.8rem;
  color: #999;
  font-style: italic;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-badge {
  background: rgba(139, 0, 0, 0.1);
  color: #8B0000;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.recent-bookings-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
}

.admindashboard-recent-bookings-table {
  width: 100%;
  border-collapse: collapse;
}

.admindashboard-recent-bookings-table th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
  font-size: 0.9rem;
}

.admindashboard-recent-bookings-table td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.9rem;
}

.booking-row:hover {
  background: #f8f9fa;
}

.receipt-number {
  font-family: monospace;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.devotee-name {
  font-weight: 600;
  color: #333;
}

.pooja-name {
  color: #666;
}

.star-badge {
  background: #e7f3ff;
  color: #0066cc;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.amount {
  font-weight: 700;
  color: #28a745;
}

.booking-date {
  font-size: 0.8rem;
  color: #666;
}

.participant-number {
  font-weight: 600;
  color: #8B0000;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.total-poojas {
  background: #28a745;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.filter-select-wrapper {
  flex: 1;
  margin-right: 20px;
}

.expand-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
}

.expand-indicator i {
  font-size: 1.2rem;
}

.pooja-title-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.progress-percentage {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px;
}

.admindashboard-participants-section {
  background: #f8f9fa;
  border-top: 2px solid #dee2e6;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}

.participants-section-header {
  padding: 20px 25px;
  background: #fff;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.participants-actions {
  display: flex;
  gap: 10px;
}

.refresh-participants-btn,
.export-participants-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.refresh-participants-btn {
  background: #17a2b8;
  color: white;
}

.export-participants-btn {
  background: #28a745;
  color: white;
}

.refresh-participants-btn:disabled,
.export-participants-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.participants-loading {
  padding: 40px;
  text-align: center;
}

.participants-summary {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
}

.summary-stat {
  text-align: center;
}

.summary-stat.revenue .stat-number {
  color: #28a745;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.participants-table-wrapper {
  max-height: 500px;
  overflow-y: auto;
  background: white;
}

.slot-number {
  background: #8B0000;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
}

.devotee-info .name {
  font-weight: 600;
  color: #333;
}

.available-slot {
  color: #999;
  font-style: italic;
}

.star-tag {
  background: #e7f3ff;
  color: #0066cc;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.booking-date-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.booking-date-info .date {
  font-weight: 500;
  color: #333;
}

.booking-date-info .time {
  font-size: 0.8rem;
  color: #666;
}

.receipt-code {
  font-family: monospace;
  background: #f8f9fa;
  padding: 4px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
  border: 1px solid #dee2e6;
}

.payment-method {
  font-size: 0.8rem;
  color: #666;
}

.amount-paid {
  font-weight: 700;
  color: #28a745;
}

.empty-indicator {
  color: #ccc;
  font-style: italic;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
}

.status-booked {
  background: #d4edda;
  color: #155724;
}

.status-available {
  background: #f8d7da;
  color: #721c24;
}

.pooja-quick-stats {
  background: white;
  padding: 15px 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
}

.quick-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
}

.quick-stat i {
  color: #8B0000;
}

.participants-not-loaded {
  background: white;
  padding: 40px;
  text-align: center;
}

.not-loaded-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.load-participants-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.no-poojas-message {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.no-data-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.show-all-btn {
  background: #8B0000;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}

.note-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.note-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.note-item {
  font-size: 0.9rem;
  line-height: 1.5;
}

.dashboard-version {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #dee2e6;
  color: #666;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .note-details {
    grid-template-columns: 1fr;
  }
  
  .participants-summary {
    flex-direction: column;
    gap: 10px;
  }
  
  .pooja-quick-stats {
    flex-direction: column;
  }
}
`;

// Inject enhanced styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = enhancedStyles;
  document.head.appendChild(styleSheet);
}

export default AdminDashboard;