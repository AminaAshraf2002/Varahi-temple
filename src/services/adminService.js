// services/adminService.js - Enhanced Admin API service with improved error handling and data management

// Updated to use production backend
const API_BASE_URL = 'https://temple-server.onrender.com/api';

// Helper function to handle API responses with better error handling
const handleResponse = async (response) => {
  let data;
  
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Invalid response format from server');
  }
  
  if (!response.ok) {
    // Handle different HTTP status codes
    switch (response.status) {
      case 401:
        throw new Error('Unauthorized: Please login again');
      case 403:
        throw new Error('Forbidden: Insufficient permissions');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error: Please try again later');
      default:
        throw new Error(data.message || `HTTP Error: ${response.status}`);
    }
  }
  
  return data;
};

// Helper function to make API calls with enhanced error handling
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Admin API call failed for ${endpoint}:`, error);
    
    // Handle network errors
    if (error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection and server status');
    }
    
    throw error;
  }
};

export const adminService = {
  // Admin login with enhanced validation
  login: async (credentials) => {
    try {
      // Basic validation
      if (!credentials.username || !credentials.password) {
        throw new Error('Username and password are required');
      }

      if (credentials.username.trim().length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }

      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const response = await apiCall('/admin/login', {
        method: 'POST',
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password
        }),
      });
      
      if (response.status === 'success') {
        // Store admin session data (Note: In production, consider more secure storage)
        if (response.token) {
          sessionStorage.setItem('adminToken', response.token);
          sessionStorage.setItem('adminUser', JSON.stringify(response.admin));
          sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        }
        
        console.log('Admin login successful:', response.admin);
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  },

  // Enhanced logout with cleanup
  logout: () => {
    try {
      // Clear all admin-related data
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminLoginTime');
      
      // Clear cached data
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith('adminCache_') || key.startsWith('adminBookingStats')) {
          sessionStorage.removeItem(key);
        }
      });
      
      console.log('Admin logout successful');
      return Promise.resolve({ 
        status: 'success', 
        message: 'Logged out successfully' 
      });
    } catch (error) {
      console.error('Logout error:', error);
      return Promise.resolve({ 
        status: 'success', 
        message: 'Logged out (with cleanup errors)' 
      });
    }
  },

  // Enhanced login status check
  isLoggedIn: () => {
    const token = sessionStorage.getItem('adminToken');
    const user = sessionStorage.getItem('adminUser');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    if (!token || !user) {
      return false;
    }

    // Check if login is expired (8 hours for admin sessions)
    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const diffInHours = (now - loginDate) / (1000 * 60 * 60);
      
      if (diffInHours > 8) {
        console.log('Admin session expired');
        adminService.logout();
        return false;
      }
    }
    
    return true;
  },

  // Get current admin user with session info
  getCurrentAdmin: () => {
    const user = sessionStorage.getItem('adminUser');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    if (!user) return null;
    
    try {
      const adminData = JSON.parse(user);
      
      if (loginTime) {
        adminData.loginTime = loginTime;
        adminData.sessionAge = Math.round((new Date() - new Date(loginTime)) / (1000 * 60)); // in minutes
      }
      
      return adminData;
    } catch (error) {
      console.error('Error parsing admin user data:', error);
      return null;
    }
  },

  // Enhanced dashboard data with error handling and retries
  getDashboard: async (retryCount = 0) => {
    try {
      console.log('Fetching admin dashboard data...');
      const response = await apiCall('/admin/dashboard');
      
      if (response.status === 'success') {
        console.log('Dashboard data loaded successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      
      // Retry logic for network errors
      if (retryCount < 2 && error.message.includes('Network error')) {
        console.log(`Retrying dashboard fetch... (attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        return adminService.getDashboard(retryCount + 1);
      }
      
      throw error;
    }
  },

  // Enhanced bookings fetch with advanced filtering
  getAllBookings: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query parameters
      if (filters.poojaId && filters.poojaId !== 'all') {
        queryParams.append('poojaId', filters.poojaId);
      }
      if (filters.status && filters.status !== 'all') {
        queryParams.append('status', filters.status);
      }
      if (filters.page) {
        queryParams.append('page', filters.page);
      }
      if (filters.limit) {
        queryParams.append('limit', filters.limit);
      }
      if (filters.sortBy) {
        queryParams.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        queryParams.append('sortOrder', filters.sortOrder);
      }

      const endpoint = `/admin/bookings${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('Fetching bookings with filters:', filters);
      
      const response = await apiCall(endpoint);
      
      if (response.status === 'success') {
        console.log(`Loaded ${response.data.bookings.length} bookings`);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Enhanced participants fetch with detailed error handling
  getPoojaParticipants: async (poojaId) => {
    try {
      if (!poojaId) {
        throw new Error('Pooja ID is required');
      }

      console.log(`Fetching participants for pooja ${poojaId}...`);
      const response = await apiCall(`/admin/bookings/pooja/${poojaId}`);
      
      if (response.status === 'success') {
        console.log(`Loaded ${response.data.participants.length} participants for pooja ${poojaId}`);
        
        // Enhance participant data with additional computed fields
        const enhancedData = {
          ...response.data,
          participants: response.data.participants.map(participant => ({
            ...participant,
            // Add booking age (how long ago the booking was made)
            bookingAge: participant.bookingDate ? 
              Math.round((new Date() - new Date(participant.bookingDate)) / (1000 * 60 * 60 * 24)) : null, // in days
            // Add formatted booking date
            bookingDateFormatted: participant.bookingDate ? 
              new Date(participant.bookingDate).toLocaleString('en-IN') : null
          }))
        };
        
        return enhancedData;
      } else {
        throw new Error(response.message || 'Failed to fetch pooja participants');
      }
    } catch (error) {
      console.error(`Error fetching participants for pooja ${poojaId}:`, error);
      throw error;
    }
  },

  // Enhanced booking statistics with caching (using sessionStorage for admin)
  getBookingStats: async (useCache = true) => {
    const cacheKey = 'adminBookingStats';
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    
    try {
      // Check cache first if enabled
      if (useCache) {
        const cachedData = sessionStorage.getItem(cacheKey);
        const cacheTime = sessionStorage.getItem(cacheKey + '_time');
        
        if (cachedData && cacheTime) {
          const age = new Date() - new Date(cacheTime);
          if (age < cacheExpiry) {
            console.log('Using cached booking stats');
            return JSON.parse(cachedData);
          }
        }
      }

      console.log('Fetching fresh booking statistics...');
      const dashboardData = await adminService.getDashboard();
      
      const stats = {
        totalPoojas: dashboardData.overview.totalPoojas,
        totalBookings: dashboardData.overview.totalBookings,
        pendingBookings: dashboardData.overview.pendingBookings,
        totalRevenue: dashboardData.overview.totalRevenue,
        recentBookings: dashboardData.recentBookings,
        // Additional computed stats
        averageBookingsPerPooja: dashboardData.overview.totalPoojas > 0 ? 
          (dashboardData.overview.totalBookings / dashboardData.overview.totalPoojas).toFixed(1) : 0,
        averageRevenuePerBooking: dashboardData.overview.totalBookings > 0 ? 
          (dashboardData.overview.totalRevenue / dashboardData.overview.totalBookings).toFixed(0) : 0,
        completionRate: dashboardData.overview.totalBookings > 0 ? 
          ((dashboardData.overview.totalBookings / (dashboardData.overview.totalBookings + dashboardData.overview.pendingBookings)) * 100).toFixed(1) : 100
      };

      // Cache the results in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(stats));
      sessionStorage.setItem(cacheKey + '_time', new Date().toISOString());

      return stats;
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  },

  // Enhanced pooja statistics with revenue calculations
  getPoojaStats: async () => {
    try {
      console.log('Fetching pooja-wise statistics...');
      const dashboardData = await adminService.getDashboard();
      
      // Enhance pooja stats with additional calculations
      const enhancedPoojaStats = dashboardData.poojaStats.map(pooja => ({
        ...pooja,
        // Add fill percentage
        fillPercentage: Math.round((pooja.bookedCount / pooja.maxParticipants) * 100),
        // Add capacity status
        capacityStatus: pooja.bookedCount >= pooja.maxParticipants ? 'full' :
                       pooja.bookedCount >= pooja.maxParticipants * 0.8 ? 'high' :
                       pooja.bookedCount >= pooja.maxParticipants * 0.5 ? 'medium' : 'low',
        // Add revenue per slot
        revenuePerSlot: pooja.amount,
        // Add potential revenue (if fully booked)
        potentialRevenue: pooja.maxParticipants * pooja.amount,
        // Add revenue efficiency
        revenueEfficiency: pooja.maxParticipants > 0 ? 
          Math.round((pooja.revenue / (pooja.maxParticipants * pooja.amount)) * 100) : 0
      }));

      console.log(`Enhanced ${enhancedPoojaStats.length} pooja statistics`);
      return enhancedPoojaStats;
    } catch (error) {
      console.error('Error fetching pooja stats:', error);
      throw error;
    }
  },

  // Get bookings filtered by pooja with enhanced data
  getBookingsByPooja: async (poojaId) => {
    try {
      if (!poojaId) {
        throw new Error('Pooja ID is required');
      }

      console.log(`Fetching bookings for pooja ${poojaId}...`);
      return await adminService.getAllBookings({ poojaId });
    } catch (error) {
      console.error(`Error fetching bookings for pooja ${poojaId}:`, error);
      throw error;
    }
  },

  // Get bookings filtered by status
  getBookingsByStatus: async (status) => {
    try {
      if (!status) {
        throw new Error('Status is required');
      }

      console.log(`Fetching bookings with status: ${status}...`);
      return await adminService.getAllBookings({ status });
    } catch (error) {
      console.error(`Error fetching bookings by status ${status}:`, error);
      throw error;
    }
  },

  // Enhanced search with multiple criteria
  searchBookings: async (searchCriteria) => {
    try {
      if (!searchCriteria) {
        throw new Error('Search criteria is required');
      }

      console.log('Searching bookings with criteria:', searchCriteria);
      const allBookingsData = await adminService.getAllBookings();
      
      let filteredBookings = [...allBookingsData.bookings];

      // Apply search filters
      if (searchCriteria.devoteName) {
        const searchTerm = searchCriteria.devoteName.toLowerCase();
        filteredBookings = filteredBookings.filter(booking =>
          booking.devoteName.toLowerCase().includes(searchTerm)
        );
      }

      if (searchCriteria.receiptNumber) {
        filteredBookings = filteredBookings.filter(booking =>
          booking.receiptNumber.includes(searchCriteria.receiptNumber)
        );
      }

      if (searchCriteria.star) {
        filteredBookings = filteredBookings.filter(booking =>
          booking.star === searchCriteria.star
        );
      }

      if (searchCriteria.dateFrom) {
        const fromDate = new Date(searchCriteria.dateFrom);
        filteredBookings = filteredBookings.filter(booking =>
          new Date(booking.createdAt) >= fromDate
        );
      }

      if (searchCriteria.dateTo) {
        const toDate = new Date(searchCriteria.dateTo);
        toDate.setHours(23, 59, 59, 999); // Include full day
        filteredBookings = filteredBookings.filter(booking =>
          new Date(booking.createdAt) <= toDate
        );
      }

      console.log(`Search found ${filteredBookings.length} matching bookings`);

      return {
        bookings: filteredBookings,
        pagination: {
          current: 1,
          total: 1,
          count: filteredBookings.length
        },
        searchCriteria
      };
    } catch (error) {
      console.error('Error searching bookings:', error);
      throw error;
    }
  },

  // Export data functionality
  exportBookingsToCSV: async (filters = {}) => {
    try {
      console.log('Exporting bookings to CSV...');
      const bookingsData = await adminService.getAllBookings(filters);
      
      const csvHeaders = [
        'Receipt Number',
        'Devotee Name', 
        'Star',
        'Pooja Name',
        'Pooja Date',
        'Amount',
        'Payment Method',
        'Payment Status',
        'Participant Number',
        'Transaction ID',
        'Booking Date'
      ];

      const csvRows = bookingsData.bookings.map(booking => [
        booking.receiptNumber,
        booking.devoteName,
        booking.star,
        booking.poojaEnglish,
        booking.poojaDate,
        booking.amount,
        booking.paymentMethod,
        booking.paymentStatus,
        booking.participantNumber,
        booking.transactionId || '',
        new Date(booking.createdAt).toLocaleString('en-IN')
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `temple_bookings_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      console.log(`Exported ${csvRows.length} bookings to CSV`);
      return { 
        status: 'success', 
        message: `Exported ${csvRows.length} bookings successfully`,
        count: csvRows.length 
      };
    } catch (error) {
      console.error('Error exporting bookings:', error);
      throw error;
    }
  },

  // System health check - Updated for production
  checkSystemHealth: async () => {
    try {
      console.log('Checking system health...');
      
      const healthChecks = {
        api: false,
        database: false,
        auth: false,
        timestamp: new Date().toISOString()
      };

      // Check API connectivity
      try {
        const response = await fetch('https://temple-server.onrender.com/health');
        const data = await response.json();
        healthChecks.api = response.ok;
        healthChecks.database = data.database === 'connected';
      } catch (error) {
        console.warn('Health check API call failed:', error);
      }

      // Check authentication
      healthChecks.auth = adminService.isLoggedIn();

      console.log('System health check completed:', healthChecks);
      return healthChecks;
    } catch (error) {
      console.error('System health check failed:', error);
      throw error;
    }
  },

  // Real-time data refresh utility
  refreshAllData: async () => {
    try {
      console.log('Refreshing all admin data...');
      
      // Clear any cached data
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith('adminBookingStats') || key.startsWith('adminCache_')) {
          sessionStorage.removeItem(key);
        }
      });

      // Fetch fresh dashboard data
      const dashboardData = await adminService.getDashboard();
      
      console.log('All admin data refreshed successfully');
      return {
        status: 'success',
        message: 'All data refreshed successfully',
        timestamp: new Date().toISOString(),
        data: dashboardData
      };
    } catch (error) {
      console.error('Error refreshing all data:', error);
      throw error;
    }
  },

  // Get environment info
  getEnvironmentInfo: () => {
    return {
      apiBaseUrl: API_BASE_URL,
      environment: 'production',
      server: 'https://temple-server.onrender.com',
      storageType: 'sessionStorage' // Using sessionStorage for admin sessions
    };
  },

  // Analytics helper functions
  getAnalytics: {
    // Get booking trends over time
    getBookingTrends: (bookings) => {
      const trends = {};
      bookings.forEach(booking => {
        const date = booking.createdAt.split('T')[0]; // Get date part only
        trends[date] = (trends[date] || 0) + 1;
      });
      
      return Object.entries(trends)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    // Get popular poojas by booking count
    getPopularPoojas: (poojaStats) => {
      return poojaStats
        .sort((a, b) => b.bookedCount - a.bookedCount)
        .slice(0, 5)
        .map(pooja => ({
          name: pooja.name,
          bookings: pooja.bookedCount,
          revenue: pooja.revenue,
          fillRate: Math.round((pooja.bookedCount / pooja.maxParticipants) * 100)
        }));
    },

    // Get revenue breakdown by category
    getRevenueByCategory: (poojaStats) => {
      const categoryRevenue = {};
      poojaStats.forEach(pooja => {
        categoryRevenue[pooja.category] = (categoryRevenue[pooja.category] || 0) + pooja.revenue;
      });
      
      return Object.entries(categoryRevenue)
        .map(([category, revenue]) => ({ category, revenue }))
        .sort((a, b) => b.revenue - a.revenue);
    },

    // Get star-wise distribution
    getStarDistribution: (bookings) => {
      const starCounts = {};
      bookings.forEach(booking => {
        starCounts[booking.star] = (starCounts[booking.star] || 0) + 1;
      });
      
      return Object.entries(starCounts)
        .map(([star, count]) => ({ star, count }))
        .sort((a, b) => b.count - a.count);
    }
  }
};

// Utility functions
export const adminUtils = {
  // Format currency consistently
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Format date consistently
  formatDate: (dateString, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    return new Date(dateString).toLocaleDateString('en-IN', defaultOptions);
  },

  // Format date and time
  formatDateTime: (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Get time ago string
  getTimeAgo: (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return adminUtils.formatDate(dateString);
  },

  // Validate admin session
  validateSession: () => {
    if (!adminService.isLoggedIn()) {
      throw new Error('Session expired. Please login again.');
    }
    return true;
  }
};

export default adminService;