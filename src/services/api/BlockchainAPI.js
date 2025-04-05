// MONEY_TRACK - Blockchain API Service
// This service handles requests to various blockchain APIs

import axios from 'axios';

// API configuration
const API_CONFIG = {
  ethereum: {
    baseUrl: 'https://api.etherscan.io/api',
    key: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  bitcoin: {
    baseUrl: 'https://blockchain.info',
    key: process.env.REACT_APP_BLOCKCHAIN_INFO_API_KEY,
  },
  solana: {
    baseUrl: 'https://api.solscan.io/v2',
    key: process.env.REACT_APP_SOLSCAN_API_KEY,
  },
  binance: {
    baseUrl: 'https://api.bscscan.com/api',
    key: process.env.REACT_APP_BSCSCAN_API_KEY,
  },
  polygon: {
    baseUrl: 'https://api.polygonscan.com/api',
    key: process.env.REACT_APP_POLYGONSCAN_API_KEY,
  }
};

// Create axios instances for each blockchain
const apiInstances = {};
Object.keys(API_CONFIG).forEach(blockchain => {
  apiInstances[blockchain] = axios.create({
    baseURL: API_CONFIG[blockchain].baseUrl,
    timeout: 10000,
    params: {
      apikey: API_CONFIG[blockchain].key
    }
  });
});

// Format transactions based on blockchain
const formatTransactions = (blockchain, data) => {
  switch(blockchain) {
    case 'ethereum':
    case 'binance':
    case 'polygon':
      return data.map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
        status: tx.isError === '0' ? 'Success' : 'Failed',
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        blockNumber: tx.blockNumber
      }));

    case 'bitcoin':
      return data.map(tx => ({
        hash: tx.hash,
        from: tx.inputs.map(input => input.prev_out.addr).join(', '),
        to: tx.out.map(output => output.addr).join(', '),
        value: tx.out.reduce((sum, output) => sum + output.value, 0) / 100000000,
        timestamp: new Date(tx.time * 1000).toLocaleString(),
        status: 'Success',
        blockHeight: tx.block_height
      }));

    case 'solana':
      return data.map(tx => ({
        hash: tx.txHash,
        from: tx.signer[0] || 'Unknown',
        to: tx.mainActions && tx.mainActions[0] ? tx.mainActions[0].dest : 'Unknown',
        value: tx.fee,
        timestamp: new Date(parseInt(tx.blockTime) * 1000).toLocaleString(),
        status: tx.status === 'Success' ? 'Success' : 'Failed',
        slot: tx.slot
      }));

    default:
      return data;
  }
};

// Mock data for development (remove in production)
const MOCK_DATA = {
  ethereum: [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      value: '1.2345',
      timeStamp: '1649524800',
      isError: '0',
      gas: '21000',
      gasPrice: '50000000000',
      blockNumber: '12345678'
    },
    {
      hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '0.5432',
      timeStamp: '1649524700',
      isError: '0',
      gas: '21000',
      gasPrice: '45000000000',
      blockNumber: '12345677'
    }
  ]
};

// Blockchain API service
const BlockchainAPI = {
  // Get transactions for specified addresses on a blockchain
  getTransactions: async (blockchain, addresses) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development') {
        return formatTransactions(blockchain, MOCK_DATA[blockchain] || []);
      }

      // Real API calls
      if (!addresses || addresses.length === 0) {
        return [];
      }

      let data = [];
      
      // Different APIs have different endpoints and parameters
      switch(blockchain) {
        case 'ethereum':
        case 'binance':
        case 'polygon':
          // Fetch transactions for each address
          for (const address of addresses) {
            const response = await apiInstances[blockchain].get('', {
              params: {
                module: 'account',
                action: 'txlist',
                address,
                startblock: 0,
                endblock: 99999999,
                sort: 'desc',
                page: 1,
                offset: 10
              }
            });
            
            if (response.data.status === '1') {
              data = [...data, ...response.data.result];
            }
          }
          break;

        case 'bitcoin':
          // Fetch transactions for each address
          for (const address of addresses) {
            const response = await apiInstances[blockchain].get(`/rawaddr/${address}`);
            if (response.data && response.data.txs) {
              data = [...data, ...response.data.txs];
            }
          }
          break;

        case 'solana':
          // Fetch transactions for each address
          for (const address of addresses) {
            const response = await apiInstances[blockchain].get(`/account/transactions`, {
              params: {
                account: address,
                limit: 10
              }
            });
            
            if (response.data && response.data.data) {
              data = [...data, ...response.data.data];
            }
          }
          break;

        default:
          throw new Error(`Unsupported blockchain: ${blockchain}`);
      }

      return formatTransactions(blockchain, data);

    } catch (error) {
      console.error(`Error fetching ${blockchain} transactions:`, error);
      throw error;
    }
  },

  // Get balance for a specified address
  getBalance: async (blockchain, address) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development') {
        return { balance: '10.5432', token: blockchain === 'ethereum' ? 'ETH' : blockchain };
      }

      // Real API calls
      switch(blockchain) {
        case 'ethereum':
        case 'binance':
        case 'polygon':
          const response = await apiInstances[blockchain].get('', {
            params: {
              module: 'account',
              action: 'balance',
              address,
              tag: 'latest'
            }
          });
          
          if (response.data.status === '1') {
            const balance = parseFloat(response.data.result) / 1e18;
            return { 
              balance, 
              token: blockchain === 'ethereum' ? 'ETH' : 
                     blockchain === 'binance' ? 'BNB' : 
                     blockchain === 'polygon' ? 'MATIC' : blockchain
            };
          }
          break;

        case 'bitcoin':
          const btcResponse = await apiInstances[blockchain].get(`/rawaddr/${address}`);
          if (btcResponse.data) {
            return { 
              balance: btcResponse.data.final_balance / 100000000, 
              token: 'BTC' 
            };
          }
          break;

        case 'solana':
          const solResponse = await apiInstances[blockchain].get(`/account/tokens`, {
            params: {
              account: address
            }
          });
          
          if (solResponse.data && solResponse.data.data) {
            return { 
              balance: solResponse.data.data.lamports / 1e9, 
              token: 'SOL' 
            };
          }
          break;
      }

      return { balance: 0, token: blockchain };

    } catch (error) {
      console.error(`Error fetching ${blockchain} balance:`, error);
      throw error;
    }
  }
};

export { BlockchainAPI };