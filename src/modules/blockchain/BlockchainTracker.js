// MONEY_TRACK - Blockchain Tracker Module
// This module handles tracking of cryptocurrency transactions across public blockchains

import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { Card, Button, Table, Select, Input } from '../../components/ui';
import { BlockchainAPI } from '../../services/api';

const BlockchainTracker = () => {
  const { updateData, getTrackedAddresses } = useData();
  const [activeChain, setActiveChain] = useState('ethereum');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  // Available blockchain networks to track
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
        return;
      }
      
      const data = await BlockchainAPI.getTransactions(activeChain, addresses);
      setTransactions(data);
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

  return (
    <div className="blockchain-tracker">
      <h1>Blockchain Transaction Tracker</h1>
      
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
      
      <Card className="data-card">
        <h2>Recent Transactions</h2>
        {loading ? (
          <div className="loading">Loading blockchain data...</div>
        ) : transactions.length > 0 ? (
          <Table
            data={transactions}
            columns={[
              { header: 'Transaction Hash', accessor: 'hash' },
              { header: 'From', accessor: 'from' },
              { header: 'To', accessor: 'to' },
              { header: 'Value', accessor: 'value' },
              { header: 'Time', accessor: 'timestamp' },
              { header: 'Status', accessor: 'status' }
            ]}
          />
        ) : (
          <div className="empty-state">
            No transactions found. Add addresses to track or switch blockchain networks.
          </div>
        )}
      </Card>
      
      <div className="module-actions">
        <Button onClick={() => window.location.href = `/blockchain/analysis`}>
          View Detailed Analysis
        </Button>
        <Button onClick={() => window.location.href = `/analytics/users?source=${activeChain}`}>
          View User Profiles
        </Button>
      </div>
    </div>
  );
};

export default BlockchainTracker;