// services/poojaService.js - API service functions for temple booking

// Updated to use production backend
const API_BASE_URL = 'https://temple-server.onrender.com/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Helper function to make API calls
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
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

export const poojaService = {
  // Get all poojas with booking counts
  getAllPoojas: async () => {
    try {
      const response = await apiCall('/poojas');
      
      if (response.status === 'success') {
        return response.data;
      } else {
        throw new Error('Failed to fetch poojas');
      }
    } catch (error) {
      console.error('Error fetching poojas:', error);
      throw error;
    }
  },

  // Get all stars (nakshatras)
  getAllStars: async () => {
    try {
      const response = await apiCall('/stars');
      
      if (response.status === 'success') {
        return response.data;
      } else {
        throw new Error('Failed to fetch stars');
      }
    } catch (error) {
      console.error('Error fetching stars:', error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiCall('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
      
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Complete payment for a booking
  completePayment: async (paymentData) => {
    try {
      const response = await apiCall('/bookings/payment-complete', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
      
      return response;
    } catch (error) {
      console.error('Error completing payment:', error);
      throw error;
    }
  },

  // Get booking receipt by ID
  getBookingReceipt: async (bookingId) => {
    try {
      const response = await apiCall(`/bookings/${bookingId}`);
      
      if (response.status === 'success') {
        return response.receiptData;
      } else {
        throw new Error('Failed to fetch receipt');
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
      throw error;
    }
  },

  // Filter poojas by month
  getPoojasByMonth: async (month) => {
    try {
      const allPoojas = await poojaService.getAllPoojas();
      
      if (month === 'all') {
        return allPoojas;
      }
      
      return allPoojas.filter(pooja => 
        pooja.date.split('-')[1] === month
      );
    } catch (error) {
      console.error('Error filtering poojas by month:', error);
      throw error;
    }
  },

  // Filter poojas by category
  getPoojasByCategory: async (category) => {
    try {
      const allPoojas = await poojaService.getAllPoojas();
      
      if (category === 'all') {
        return allPoojas;
      }
      
      return allPoojas.filter(pooja => pooja.category === category);
    } catch (error) {
      console.error('Error filtering poojas by category:', error);
      throw error;
    }
  },

  // Get only available poojas (not fully booked)
  getAvailablePoojas: async () => {
    try {
      const allPoojas = await poojaService.getAllPoojas();
      return allPoojas.filter(pooja => pooja.available === true);
    } catch (error) {
      console.error('Error fetching available poojas:', error);
      throw error;
    }
  },

  // Get special poojas only
  getSpecialPoojas: async () => {
    try {
      const allPoojas = await poojaService.getAllPoojas();
      return allPoojas.filter(pooja => pooja.special === true);
    } catch (error) {
      console.error('Error fetching special poojas:', error);
      throw error;
    }
  },

  // Test API connection - Updated for production
  testConnection: async () => {
    try {
      const response = await fetch('https://temple-server.onrender.com/health');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error testing connection:', error);
      throw error;
    }
  },

  // Get server info - Updated for production
  getServerInfo: async () => {
    try {
      const response = await fetch('https://temple-server.onrender.com/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching server info:', error);
      throw error;
    }
  },

  // Validate booking data before sending
  validateBookingData: (bookingData) => {
    const { devoteName, star, paymentMethod, poojaDate, poojaId } = bookingData;
    
    const errors = [];
    
    if (!devoteName || devoteName.trim().length < 2) {
      errors.push('Devotee name must be at least 2 characters');
    }
    
    if (!star) {
      errors.push('Please select a star (nakshatra)');
    }
    
    if (!paymentMethod) {
      errors.push('Please select a payment method');
    }
    
    if (!poojaDate) {
      errors.push('Please select a pooja date');
    }
    
    if (!poojaId) {
      errors.push('Pooja ID is required');
    }
    
    // Validate date is not in the past
    if (poojaDate) {
      const selectedDate = new Date(poojaDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Cannot book pooja for past dates');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Get booking statistics
  getBookingStats: async () => {
    try {
      const allPoojas = await poojaService.getAllPoojas();
      
      const stats = {
        totalPoojas: allPoojas.length,
        availablePoojas: allPoojas.filter(p => p.available).length,
        fullyBookedPoojas: allPoojas.filter(p => !p.available).length,
        specialPoojas: allPoojas.filter(p => p.special).length,
        categories: {
          regular: allPoojas.filter(p => p.category === 'regular').length,
          special: allPoojas.filter(p => p.category === 'special').length,
          festival: allPoojas.filter(p => p.category === 'festival').length
        },
        totalParticipants: allPoojas.reduce((sum, p) => sum + p.bookedCount, 0),
        averageAmount: Math.round(allPoojas.reduce((sum, p) => sum + p.amount, 0) / allPoojas.length)
      };
      
      return stats;
    } catch (error) {
      console.error('Error calculating booking stats:', error);
      throw error;
    }
  },

  // NEW: Environment-aware API base URL getter
  getApiBaseUrl: () => {
    // Can be used to switch between development and production
    return API_BASE_URL;
  },

  // NEW: Check if server is responsive
  checkServerHealth: async () => {
    try {
      const startTime = Date.now();
      const response = await fetch('https://temple-server.onrender.com/health');
      const endTime = Date.now();
      
      if (response.ok) {
        const data = await response.json();
        return {
          status: 'healthy',
          responseTime: endTime - startTime,
          serverInfo: data
        };
      } else {
        return {
          status: 'unhealthy',
          responseTime: endTime - startTime,
          error: 'Server responded with error status'
        };
      }
    } catch (error) {
      return {
        status: 'offline',
        error: error.message
      };
    }
  }
};

export default poojaService;