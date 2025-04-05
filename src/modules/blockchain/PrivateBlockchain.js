// MONEY_TRACK - Private Blockchains Module
// This module handles tracking of private/permissioned blockchain transactions

import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button, Table, Select, Input } from '../../components/ui';

const PrivateBlockchains = () => {
  const { updateData, getPrivateNetworks, getPrivateNetworkData } = useData();
  const { user, checkPermission } = useAuth();
  const [activeNetwork, setActiveNetwork] = useState('');
  const [networks, setNetworks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkInput, setNetworkInput] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [endpointInput, setEndpointInput] = useState('');
  const [error, setError] = useState('');

  // Load available private networks
  useEffect(() => {
    const networks = getPrivateNetworks();
    setNetworks(networks);
    if (networks.length > 0 && !activeNetwork) {
      setActiveNetwork(networks[0].id);
    }
  }, []);

  // Load transactions when active network changes
  useEffect(() => {
    if (activeNetwork) {
      fetchNetworkData();
    }
  }, [activeNetwork]);

  // Fetch network data
  const fetchNetworkData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if user has permission to access this network
      if (!checkPermission(`private_blockchain_${activeNetwork}`)) {
        setError('You do not have permission to access this private network.');
        setTransactions([]);
        return;
      }
      
      const data = getPrivateNetworkData(activeNetwork);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error('Error fetching private network data:', err);
      setError('Failed to fetch data from the private network.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new private network
  const addPrivateNetwork = () => {
    if (!networkInput.trim() || !apiKeyInput.trim() || !endpointInput.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    // Check if user has admin permission
    if (!checkPermission('admin_private_networks')) {
      setError('You do not have permission to add private networks.');
      return;
    }
    
    // Create network ID from name
    const networkId = networkInput.toLowerCase().replace(/\s+/g, '_');
    
    updateData({
      type: 'ADD_PRIVATE_NETWORK',
      network: {
        id: networkId,
        name: networkInput,
        endpoint: endpointInput,
        apiKey: apiKeyInput,
        addedBy: user.id,
        addedOn: new Date().toISOString()
      }
    });
    
    // Reset inputs
    setNetworkInput('');
    setApiKeyInput('');
    setEndpointInput('');
    
    // Reload networks
    const updatedNetworks = getPrivateNetworks();
    setNetworks(updatedNetworks);
    setActiveNetwork(networkId);
  };

  return (
    <div className="private-blockchains">
      <h1>Private Blockchain Networks</h1>
      
      <Card className="info-card">
        <p>
          Private blockchain networks require specific API credentials and permissions.
          Contact your administrator for access to these networks.
        </p>
      </Card>
      
      {error && (
        <Card className="error-card">
          <p className="error-message">{error}</p>
        </Card>
      )}
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Select Private Network"
            value={activeNetwork}
            onChange={(e) => setActiveNetwork(e.target.value)}
            options={networks.map(network => ({
              value: network.id,
              label: network.name
            }))}
            placeholder="Select a private blockchain network"
          />
          
          <Button 
            onClick={fetchNetworkData}
            disabled={!activeNetwork || loading}
          >
            Refresh Data
          </Button>
        </div>
      </Card>
      
      {checkPermission('admin_private_networks') && (
        <Card className="add-network-card">
          <h2>Add New Private Network</h2>
          <div className="form-grid">
            <Input
              label="Network Name"
              value={networkInput}
              onChange={(e) => setNetworkInput(e.target.value)}
              placeholder="e.g., Hyperledger Fabric Network"
              required
            />
            
            <Input
              label="API Endpoint"
              value={endpointInput}
              onChange={(e) => setEndpointInput(e.target.value)}
              placeholder="e.g., https://api.private-blockchain.com"
              required
            />
            
            <Input
              label="API Key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Your private network API key"
              type="password"
              required
            />
            
            <Button 
              className="add-btn"
              onClick={addPrivateNetwork}
              disabled={!networkInput || !apiKeyInput || !endpointInput}
            >
              Add Network
            </Button>
          </div>
        </Card>
      )}
      
      <Card className="data-card">
        <h2>Transactions on {networks.find(n => n.id === activeNetwork)?.name || 'Private Network'}</h2>
        {loading ? (
          <div className="loading">Loading private network data...</div>
        ) : transactions.length > 0 ? (
          <Table
            data={transactions}
            columns={[
              { header: 'Transaction ID', accessor: 'id' },
              { header: 'Type', accessor: 'type' },
              { header: 'Participants', accessor: 'participants' },
              { header: 'Asset ID', accessor: 'assetId' },
              { header: 'Timestamp', accessor: 'timestamp' },
              { header: 'Status', accessor: 'status' }
            ]}
          />
        ) : (
          <div className="empty-state">
            No transaction data available for this private network.
            {!error && <p>This could be due to API limitations or permission settings.</p>}
          </div>
        )}
      </Card>
      
      <Card className="network-info">
        <h2>Network Information</h2>
        {activeNetwork ? (
          <div className="network-details">
            <div className="detail-row">
              <span className="label">Network ID:</span>
              <span className="value">{activeNetwork}</span>
            </div>
            <div className="detail-row">
              <span className="label">Network Type:</span>
              <span className="value">{networks.find(n => n.id === activeNetwork)?.type || 'Unknown'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Added By:</span>
              <span className="value">{networks.find(n => n.id === activeNetwork)?.addedBy || 'System'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Added On:</span>
              <span className="value">
                {networks.find(n => n.id === activeNetwork)?.addedOn 
                  ? new Date(networks.find(n => n.id === activeNetwork).addedOn).toLocaleDateString() 
                  : 'Unknown'}
              </span>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            Select a private network to view details.
          </div>
        )}
      </Card>
    </div>
  );
};

export default PrivateBlockchains;