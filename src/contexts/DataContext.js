// MONEY_TRACK - Data Context Provider
// This context manages the application's data state

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // Tracked blockchain addresses
  trackedAddresses: {
    ethereum: [],
    bitcoin: [],
    solana: [],
    binance: [],
    polygon: []
  },
  
  // Private blockchain networks
  privateNetworks: [],
  
  // Transaction history cache
  transactionHistory: {},
  
  // Exchange market data
  exchangeData: {},
  
  // Banking system data
  bankingData: {},
  
  // Fintech platform data
  fintechData: {},
  
  // Analytics and user classification data
  analyticsData: {},
  
  // Last updated timestamps
  lastUpdated: {}
};

// Try to load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('money_track_data');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }
  return initialState;
};

// Data reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRACKED_ADDRESS':
      // Add a new address to track for a blockchain
      const { blockchain, address } = action;
      if (!state.trackedAddresses[blockchain]) {
        return state;
      }
      
      // Check if address is already tracked
      if (state.trackedAddresses[blockchain].includes(address)) {
        return state;
      }
      
      return {
        ...state,
        trackedAddresses: {
          ...state.trackedAddresses,
          [blockchain]: [...state.trackedAddresses[blockchain], address]
        },
        lastUpdated: {
          ...state.lastUpdated,
          [blockchain]: new Date().toISOString()
        }
      };
      
    case 'REMOVE_TRACKED_ADDRESS':
      // Remove an address from tracking
      return {
        ...state,
        trackedAddresses: {
          ...state.trackedAddresses,
          [action.blockchain]: state.trackedAddresses[action.blockchain].filter(
            addr => addr !== action.address
          )
        },
        lastUpdated: {
          ...state.lastUpdated,
          [action.blockchain]: new Date().toISOString()
        }
      };
      
    case 'ADD_TRANSACTION_DATA':
      // Add transaction data to history
      const { chain, transactions } = action;
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          [chain]: {
            ...state.transactionHistory[chain],
            data: transactions,
            lastUpdated: new Date().toISOString()
          }
        }
      };
      
    case 'ADD_PRIVATE_NETWORK':
      // Add a new private blockchain network
      return {
        ...state,
        privateNetworks: [...state.privateNetworks, action.network],
        lastUpdated: {
          ...state.lastUpdated,
          privateNetworks: new Date().toISOString()
        }
      };
      
    case 'UPDATE_PRIVATE_NETWORK_DATA':
      // Update data for a private network
      return {
        ...state,
        privateNetworks: state.privateNetworks.map(network => 
          network.id === action.networkId 
            ? { ...network, data: action.data, lastUpdated: new Date().toISOString() }
            : network
        ),
        lastUpdated: {
          ...state.lastUpdated,
          privateNetworks: new Date().toISOString()
        }
      };
      
    case 'UPDATE_EXCHANGE_DATA':
      // Update exchange market data
      return {
        ...state,
        exchangeData: {
          ...state.exchangeData,
          [action.exchange]: action.data
        },
        lastUpdated: {
          ...state.lastUpdated,
          exchanges: new Date().toISOString()
        }
      };
      
    case 'UPDATE_BANKING_DATA':
      // Update banking system data
      return {
        ...state,
        bankingData: {
          ...state.bankingData,
          [action.system]: action.data
        },
        lastUpdated: {
          ...state.lastUpdated,
          banking: new Date().toISOString()
        }
      };
      
    case 'UPDATE_FINTECH_DATA':
      // Update fintech platform data
      return {
        ...state,
        fintechData: {
          ...state.fintechData,
          [action.platform]: action.data
        },
        lastUpdated: {
          ...state.lastUpdated,
          fintech: new Date().toISOString()
        }
      };
      
    case 'UPDATE_ANALYTICS_DATA':
      // Update analytics data
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          [action.category]: action.data
        },
        lastUpdated: {
          ...state.lastUpdated,
          analytics: new Date().toISOString()
        }
      };
      
    case 'RESET_DATA':
      // Reset all data to initial state
      return initialState;
      
    default:
      return state;
  }
};

// Create context
const DataContext = createContext();

// Data provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, loadState());
  
  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('money_track_data', JSON.stringify(state));
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  }, [state]);
  
  // Helper functions for working with data
  const getTrackedAddresses = (blockchain) => {
    return state.trackedAddresses[blockchain] || [];
  };
  
  const getTransactionHistory = (blockchain, timeframe) => {
    // Mock implementation - would filter by timeframe in production
    return state.transactionHistory[blockchain]?.data || [];
  };
  
  const getPrivateNetworks = () => {
    return state.privateNetworks || [];
  };
  
  const getPrivateNetworkData = (networkId) => {
    const network = state.privateNetworks.find(n => n.id === networkId);
    
    // For demo purposes, return mock data
    return {
      transactions: Array(5).fill(null).map((_, i) => ({
        id: `private-tx-${i}`,
        type: ['Asset Transfer', 'Contract Call', 'Config Update'][Math.floor(Math.random() * 3)],
        participants: `Org${Math.floor(Math.random() * 5) + 1}, Org${Math.floor(Math.random() * 5) + 1}`,
        assetId: `asset-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        status: Math.random() > 0.2 ? 'Committed' : 'Pending'
      }))
    };
  };
  
  // Create the context value object
  const value = {
    ...state,
    updateData: dispatch,
    getTrackedAddresses,
    getTransactionHistory,
    getPrivateNetworks,
    getPrivateNetworkData
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};