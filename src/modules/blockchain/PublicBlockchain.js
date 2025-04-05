// MONEY_TRACK - Public Blockchains Module
// This module handles detailed tracking of public blockchain transactions

import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { Card, Button, Table, Select, Input } from '../../components/ui';
import { BlockchainAPI } from '../../services/api';

const PublicBlockchains = () => {
  const { updateData, getTrackedAddresses } = useData();
  const [activeChain, setActiveChain] = useState('ethereum');
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [analyticsData, setAnalyticsData] = useState({
    totalVolume: 0,
    largestTx: null,
    recentActivity: 0
  });

  // Available public blockchain networks to track
  const blockchains = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'binance', name: 'Binance Smart Chain' },
    { id: 'polygon', name: 'Polygon' },
  ];

  // Fetch transactions when blockchain changes
  useEffect(() => {
    fetchTransactions();
  }, [activeChain]);

  // Function to fetch transactions from selected blockchain
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const addresses = getTrackedAddresses(activeChain);
      
      if (addresses.length === 0) {
        setTransactions([]);
        setBalances({});
        setAnalyticsData({
          totalVolume: 0,
          largestTx: null,
          recentActivity: 0
        });
        return;
      }
      
      // Fetch transactions
      const txData = await BlockchainAPI.getTransactions(activeChain, addresses);
      setTransactions(txData);
      
      // Calculate analytics
      const totalVolume = txData.reduce((sum, tx) => sum + parseFloat(tx.value || 0), 0);
      const largestTx = txData.reduce((max, tx) => 
        parseFloat(tx.value || 0) > parseFloat(max?.value || 0) ? tx : max, null);
      
      const recentActivity = txData.filter(tx => {
        const txDate = new Date(tx.timestamp);
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return txDate >= oneDayAgo;
      }).length;
      
      setAnalyticsData({
        totalVolume,
        largestTx,
        recentActivity
      });
      
      // Fetch balances
      const balanceData = {};
      for (const address of addresses) {
        const balance = await BlockchainAPI.getBalance(activeChain, address);
        balanceData[address] = balance;
      }
      setBalances(balanceData);
      
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Track a new address
  const addAddressToTrack = () => {
    if (!addressInput.trim()) return;
    
    updateData({
      type: 'ADD_TRACKED_ADDRESS',
      blockchain: activeChain,
      address: addressInput
    });
    
    setAddressInput('');
    fetchTransactions();
  };

  // Remove tracked address
  const removeAddress = (address) => {
    updateData({
      type: 'REMOVE_TRACKED_ADDRESS',
      blockchain: activeChain,
      address
    });
    
    fetchTransactions();
  };

  return (
    <div className="public-blockchains">
      <h1>Public Blockchain Explorer</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Select Blockchain"
            value={activeChain}
            onChange={(e) => setActiveChain(e.target.value)}
            options={blockchains.map(chain => ({
              value: chain.id,
              label: chain.name
            }))}
          />
          
          <div className="address-input">
            <Input
              label="Track Address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter wallet address to track"
            />
            <Button onClick={addAddressToTrack}>
              Add Address
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="grid-layout">
        <Card className="tracked-addresses">
          <h2>Tracked Addresses</h2>
          {getTrackedAddresses(activeChain).length > 0 ? (
            <ul className="address-list">
              {getTrackedAddresses(activeChain).map((address, index) => (
                <li key={index} className="address-item">
                  <div className="address-info">
                    <span className="address">{address}</span>
                    {balances[address] && (
                      <span className="balance">
                        {balances[address].balance} {balances[address].token}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="remove-btn"
                    onClick={() => removeAddress(address)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              No addresses being tracked. Add an address to start monitoring.
            </div>
          )}
        </Card>
        
        <Card className="analytics-card">
          <h2>Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-item">
              <h3>Total Volume</h3>
              <div className="analytics-value">
                {analyticsData.totalVolume.toFixed(4)} {activeChain === 'ethereum' ? 'ETH' : activeChain === 'bitcoin' ? 'BTC' : activeChain.toUpperCase()}
              </div>
            </div>
            
            <div className="analytics-item">
              <h3>Recent Activity (24h)</h3>
              <div className="analytics-value">
                {analyticsData.recentActivity} transactions
              </div>
            </div>
            
            <div className="analytics-item">
              <h3>Largest Transaction</h3>
              <div className="analytics-value">
                {analyticsData.largestTx ? (
                  <>
                    {parseFloat(analyticsData.largestTx.value).toFixed(4)} {activeChain === 'ethereum' ? 'ETH' : activeChain === 'bitcoin' ? 'BTC' : activeChain.toUpperCase()}
                  </>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="data-card">
        <h2>Recent Transactions</h2>
        {loading ? (
          <div className="loading">Loading blockchain data...</div>
        ) : transactions.length > 0 ? (
          <Table
            data={transactions}
            columns={[
              { header: 'Transaction Hash', accessor: 'hash', render: (hash) => (
                <a 
                  href={`https://${activeChain === 'ethereum' ? 'etherscan.io' : 
                         activeChain === 'bitcoin' ? 'blockchain.info' :
                         activeChain === 'solana' ? 'solscan.io' :
                         activeChain === 'binance' ? 'bscscan.com' :
                         activeChain === 'polygon' ? 'polygonscan.com' : ''}/tx/${hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {`${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`}
                </a>
              )},
              { header: 'From', accessor: 'from', render: (from) => (
                <span title={from}>{`${from.substring(0, 8)}...${from.substring(from.length - 8)}`}</span>
              )},
              { header: 'To', accessor: 'to', render: (to) => (
                <span title={to}>{`${to.substring(0, 8)}...${to.substring(to.length - 8)}`}</span>
              )},
              { 
                header: 'Value', 
                accessor: 'value',
                render: (value) => (
                  <span>{parseFloat(value).toFixed(4)} {activeChain === 'ethereum' ? 'ETH' : activeChain === 'bitcoin' ? 'BTC' : activeChain.toUpperCase()}</span>
                )
              },
              { header: 'Time', accessor: 'timestamp' },
              { 
                header: 'Status', 
                accessor: 'status',
                render: (status) => (
                  <span className={`status ${status.toLowerCase()}`}>{status}</span>
                )
              }
            ]}
          />
        ) : (
          <div className="empty-state">
            No transactions found. Add addresses to track or switch blockchain networks.
          </div>
        )}
      </Card>
    </div>
  );
};

export default PublicBlockchains;