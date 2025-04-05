// MONEY_TRACK - Blockchain Analysis Module
// This module provides advanced analytics and visualizations for blockchain data

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, Button, Select } from '../../components/ui';
import { BlockchainAPI } from '../../services/api';

const BlockchainAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTrackedAddresses, getTransactionHistory } = useData();
  
  const [activeChain, setActiveChain] = useState(() => {
    // Extract blockchain from URL query params if available
    const params = new URLSearchParams(location.search);
    return params.get('blockchain') || 'ethereum';
  });
  
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    volumeByDay: [],
    addressActivity: [],
    largeTransactions: [],
    networkStats: { avgValue: 0, totalVolume: 0, transactionCount: 0 }
  });

  // Available blockchain networks
  const blockchains = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'binance', name: 'Binance Smart Chain' },
    { id: 'polygon', name: 'Polygon' },
  ];

  // Available timeframes
  const timeframes = [
    { id: '24h', name: '24 Hours' },
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: 'all', name: 'All Time' }
  ];

  // Load data when blockchain or timeframe changes
  useEffect(() => {
    fetchAnalysisData();
    
    // Update URL query params
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('blockchain', activeChain);
    searchParams.set('timeframe', timeframe);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
  }, [activeChain, timeframe]);

  // Fetch analysis data
  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      const addresses = getTrackedAddresses(activeChain);
      
      if (addresses.length === 0) {
        // No addresses to analyze
        setAnalysisData({
          volumeByDay: [],
          addressActivity: [],
          largeTransactions: [],
          networkStats: { avgValue: 0, totalVolume: 0, transactionCount: 0 }
        });
        return;
      }
      
      // Get historical transaction data
      const txHistory = getTransactionHistory(activeChain, timeframe);
      
      // Generate daily volume data
      const volumeByDay = generateDailyVolumeData(txHistory);
      
      // Analyze address activity
      const addressActivity = analyzeAddressActivity(txHistory, addresses);
      
      // Find large transactions
      const largeTransactions = findLargeTransactions(txHistory);
      
      // Calculate network stats
      const networkStats = calculateNetworkStats(txHistory);
      
      setAnalysisData({
        volumeByDay,
        addressActivity,
        largeTransactions,
        networkStats
      });
      
    } catch (error) {
      console.error('Error fetching analysis data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate daily volume data
  const generateDailyVolumeData = (transactions) => {
    // Mock implementation - would be more robust in production
    const days = timeframe === '24h' ? 1 : 
                timeframe === '7d' ? 7 : 
                timeframe === '30d' ? 30 : 
                timeframe === '90d' ? 90 : 180;
    
    const result = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Format date as YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      
      // Calculate random volume (for demo purposes)
      // In real app, this would aggregate actual transaction volumes
      const volume = Math.random() * 100 + 50;
      
      result.unshift({
        date: dateStr,
        volume
      });
    }
    
    return result;
  };

  // Analyze address activity
  const analyzeAddressActivity = (transactions, addresses) => {
    // Mock implementation - would use real transaction data in production
    return addresses.map(address => {
      return {
        address,
        sentCount: Math.floor(Math.random() * 50),
        receivedCount: Math.floor(Math.random() * 50),
        totalSent: Math.random() * 100 + 10,
        totalReceived: Math.random() * 100 + 10
      };
    });
  };

  // Find large transactions
  const findLargeTransactions = (transactions) => {
    // Mock implementation - would filter actual transactions in production
    const result = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      result.push({
        id: `tx-${i}`,
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        from: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        to: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        value: Math.random() * 1000 + 100,
        timestamp: date.toISOString()
      });
    }
    
    return result.sort((a, b) => b.value - a.value);
  };

  // Calculate network stats
  const calculateNetworkStats = (transactions) => {
    // Mock implementation - would calculate from actual transactions in production
    return {
      avgValue: Math.random() * 10 + 1,
      totalVolume: Math.random() * 10000 + 1000,
      transactionCount: Math.floor(Math.random() * 1000 + 100)
    };
  };

  // Format currency value based on blockchain
  const formatCurrency = (value) => {
    const currencySymbol = activeChain === 'ethereum' ? 'ETH' : 
                          activeChain === 'bitcoin' ? 'BTC' : 
                          activeChain.toUpperCase();
    
    return `${parseFloat(value).toFixed(4)} ${currencySymbol}`;
  };

  return (
    <div className="blockchain-analysis">
      <h1>Blockchain Analysis Dashboard</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Blockchain Network"
            value={activeChain}
            onChange={(e) => setActiveChain(e.target.value)}
            options={blockchains.map(chain => ({
              value: chain.id,
              label: chain.name
            }))}
          />
          
          <Select
            label="Timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            options={timeframes.map(tf => ({
              value: tf.id,
              label: tf.name
            }))}
          />
          
          <Button onClick={fetchAnalysisData} disabled={loading}>
            Refresh Data
          </Button>
        </div>
      </Card>
      
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Analyzing blockchain data...</p>
        </div>
      ) : (
        <div className="analysis-content">
          <div className="stats-grid">
            <Card className="stat-card">
              <h3>Total Volume</h3>
              <div className="stat-value">{formatCurrency(analysisData.networkStats.totalVolume)}</div>
            </Card>
            
            <Card className="stat-card">
              <h3>Transaction Count</h3>
              <div className="stat-value">{analysisData.networkStats.transactionCount}</div>
            </Card>
            
            <Card className="stat-card">
              <h3>Average Transaction</h3>
              <div className="stat-value">{formatCurrency(analysisData.networkStats.avgValue)}</div>
            </Card>
            
            <Card className="stat-card">
              <h3>Addresses Tracked</h3>
              <div className="stat-value">{getTrackedAddresses(activeChain).length}</div>
            </Card>
          </div>
          
          <div className="chart-grid">
            <Card className="chart-card">
              <h2>Volume Over Time</h2>
              <div className="chart-placeholder">
                {analysisData.volumeByDay.length > 0 ? (
                  <p>Chart would render here in production version.</p>
                ) : (
                  <div className="empty-state">No volume data available</div>
                )}
              </div>
            </Card>
            
            <Card className="chart-card">
              <h2>Address Activity</h2>
              <div className="address-activity">
                {analysisData.addressActivity.length > 0 ? (
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>Sent</th>
                        <th>Received</th>
                        <th>Net Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisData.addressActivity.map((item, index) => (
                        <tr key={index}>
                          <td>{`${item.address.substring(0, 8)}...${item.address.substring(item.address.length - 8)}`}</td>
                          <td>{formatCurrency(item.totalSent)}</td>
                          <td>{formatCurrency(item.totalReceived)}</td>
                          <td className={item.totalReceived > item.totalSent ? 'positive' : 'negative'}>
                            {formatCurrency(item.totalReceived - item.totalSent)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">No address activity data available</div>
                )}
              </div>
            </Card>
          </div>
          
          <Card className="large-tx-card">
            <h2>Largest Transactions</h2>
            {analysisData.largeTransactions.length > 0 ? (
              <table className="large-tx-table">
                <thead>
                  <tr>
                    <th>Transaction Hash</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.largeTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td>
                        <a 
                          href={`https://${activeChain === 'ethereum' ? 'etherscan.io' : 
                                 activeChain === 'bitcoin' ? 'blockchain.info' :
                                 activeChain === 'solana' ? 'solscan.io' :
                                 activeChain === 'binance' ? 'bscscan.com' :
                                 activeChain === 'polygon' ? 'polygonscan.com' : ''}/tx/${tx.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {tx.hash}
                        </a>
                      </td>
                      <td>{tx.from}</td>
                      <td>{tx.to}</td>
                      <td className="tx-value">{formatCurrency(tx.value)}</td>
                      <td>{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">No large transactions found</div>
            )}
          </Card>
          
          <div className="action-buttons">
            <Button onClick={() => navigate(`/blockchain`)}>
              Back to Blockchain Tracker
            </Button>
            <Button onClick={() => navigate(`/analytics/users?source=${activeChain}`)}>
              View User Analytics
            </Button>
            <Button onClick={() => navigate(`/analytics/transactions?source=${activeChain}`)}>
              Transaction Type Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainAnalysis;