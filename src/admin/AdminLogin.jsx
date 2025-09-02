import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Check if already logged in
  useEffect(() => {
    if (adminService.isLoggedIn()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Test backend connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/health');
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Attempt login via backend API
      const response = await adminService.login({
        username: formData.username.trim(),
        password: formData.password
      });

      if (response.status === 'success') {
        console.log('Admin login successful:', response.admin);
        
        // Show success message briefly
        setError('');
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
        
      } else {
        setError(response.message || 'Login failed');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      
      // More specific error messages
      if (error.message.includes('401')) {
        setError('Invalid username or password');
      } else if (error.message.includes('fetch')) {
        setError('Cannot connect to server. Please ensure backend is running.');
      } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
        setError('Network error. Please check your connection and ensure the server is running on port 3001.');
      } else {
        setError(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = () => {
    setConnectionStatus('checking');
    testConnection();
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Connection Status */}
          {connectionStatus === 'error' && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              <strong>⚠️ Server Connection Failed</strong>
              <br />
              Please ensure the backend server is running on port 3001
              <br />
              <button 
                onClick={handleRetryConnection}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#721c24',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Retry Connection
              </button>
            </div>
          )}

          {connectionStatus === 'checking' && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '12px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              🔄 Checking server connection...
            </div>
          )}

          {/* Header */}
          <div className="admin-header">
            <h1>Admin Portal</h1>
            <p>Aalumthazham Sree Varahi Temple</p>
            {/* {connectionStatus === 'connected' && (
              <div style={{
                fontSize: '12px',
                color: '#28a745',
                marginTop: '5px'
              }}>
                ✅ Server Connected
              </div>
            )} */}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Error Display */}
            {error && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '14px',
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">
                <i className="fas fa-user"></i>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter admin username"
                disabled={isLoading || connectionStatus === 'error'}
                autoComplete="username"
                style={{
                  borderColor: error && !formData.username.trim() ? '#dc3545' : undefined
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter admin password"
                disabled={isLoading || connectionStatus === 'error'}
                autoComplete="current-password"
                style={{
                  borderColor: error && !formData.password.trim() ? '#dc3545' : undefined
                }}
              />
            </div>

            <button 
              type="submit" 
              className="admin-login-btn"
              disabled={isLoading || connectionStatus === 'error'}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Default Credentials Helper */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div style={{
              backgroundColor: '#d1ecf1',
              color: '#0c5460',
              padding: '12px',
              borderRadius: '5px',
              marginTop: '20px',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              <strong>🔧 Development Mode</strong>
              <br />
              Default credentials: admin / temple123
            </div>
          )} */}

          {/* Footer */}
          <div className="admin-footer">
            <p>
              <i className="fas fa-shield-alt"></i>
              Authorized Access Only
            </p>
            <button 
              onClick={() => navigate('/')}
              className="back-to-site-btn"
              disabled={isLoading}
            >
              <i className="fas fa-arrow-left"></i>
              Back to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;