// MONEY_TRACK - Authentication Context Provider
// This context manages user authentication and permissions

import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial auth state
const initialAuthState = {
  isAuthenticated: false,
  user: {
    id: '',
    username: 'Guest',
    email: '',
    role: 'guest',
    permissions: []
  },
  token: null,
  permissions: []
};

// Mock user for development
const MOCK_USER = {
  id: 'user-1',
  username: 'admin',
  email: 'admin@moneytrack.io',
  role: 'admin',
  permissions: [
    'blockchain_read', 
    'blockchain_write',
    'private_blockchain_hyperledger_fabric',
    'private_blockchain_corda',
    'admin_private_networks',
    'exchanges_read',
    'banking_read',
    'fintech_read',
    'analytics_read',
    'analytics_write'
  ]
};

// Create context with default values
const AuthContext = createContext({
  ...initialAuthState,
  login: () => Promise.resolve({ success: false }),
  logout: () => {},
  checkPermission: () => false
});

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  
  // Initialize auth state on component mount
  useEffect(() => {
    // For development, auto-login with mock user
    if (process.env.NODE_ENV === 'development') {
      setAuthState({
        isAuthenticated: true,
        user: MOCK_USER,
        token: 'mock-token-for-development',
        permissions: MOCK_USER.permissions
      });
    } else {
      // Try to load auth state from localStorage
      try {
        const savedState = localStorage.getItem('money_track_auth');
        if (savedState) {
          setAuthState(JSON.parse(savedState));
        }
      } catch (err) {
        console.error('Error loading auth state from localStorage:', err);
      }
    }
  }, []);
  
  // Save auth state to localStorage when it changes
  useEffect(() => {
    try {
      if (authState.isAuthenticated) {
        localStorage.setItem('money_track_auth', JSON.stringify(authState));
      }
    } catch (err) {
      console.error('Error saving auth state to localStorage:', err);
    }
  }, [authState]);
  
  // Login function
  const login = async (credentials) => {
    try {
      // In a real app, this would make an API call to authenticate
      if (process.env.NODE_ENV === 'development') {
        // For development, just use mock user
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          setAuthState({
            isAuthenticated: true,
            user: MOCK_USER,
            token: 'mock-token-for-development',
            permissions: MOCK_USER.permissions
          });
          return { success: true };
        }
      }
      
      // Mock failed login
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };
  
  // Logout function
  const logout = () => {
    setAuthState(initialAuthState);
    localStorage.removeItem('money_track_auth');
  };
  
  // Check if user has a specific permission
  const checkPermission = (permission) => {
    if (!authState.isAuthenticated || !authState.permissions) {
      return false;
    }
    
    return authState.permissions.includes(permission);
  };
  
  // Create the context value object
  const value = {
    ...authState,
    login,
    logout,
    checkPermission
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};