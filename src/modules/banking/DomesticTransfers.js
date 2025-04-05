// MONEY_TRACK - Domestic Transfers Module
// This module tracks domestic payment systems and interbank transfers

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const DomesticTransfers = () => {
  const [country, setCountry] = useState('usa');
  const [system, setSystem] = useState('fedwire');
  const [timeframe, setTimeframe] = useState('daily');
  
  const countries = [
    { id: 'usa', name: 'United States' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'eu', name: 'European Union' },
    { id: 'japan', name: 'Japan' },
    { id: 'china', name: 'China' },
    { id: 'australia', name: 'Australia' }
  ];
  
  const systems = {
    usa: [
      { id: 'fedwire', name: 'Fedwire' },
      { id: 'ach', name: 'ACH' },
      { id: 'chips', name: 'CHIPS' }
    ],
    uk: [
      { id: 'chaps', name: 'CHAPS' },
      { id: 'bacs', name: 'BACS' },
      { id: 'faster_payments', name: 'Faster Payments' }
    ],
    eu: [
      { id: 'target2', name: 'TARGET2' },
      { id: 'sepa', name: 'SEPA' },
      { id: 'step2', name: 'STEP2' }
    ],
    japan: [
      { id: 'zengin', name: 'Zengin System' },
      { id: 'fxycs', name: 'FXYCS' }
    ],
    china: [
      { id: 'cnaps', name: 'CNAPS' },
      { id: 'cips', name: 'CIPS' }
    ],
    australia: [
      { id: 'rits', name: 'RITS' },
      { id: 'npp', name: 'New Payments Platform' }
    ]
  };
  
  const timeframes = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' }
  ];
  
  // Placeholder domestic transfer data
  const transferData = [
    {
      id: 'tx-89012',
      originBank: 'Bank of America',
      destinationBank: 'Wells Fargo',
      amount: '$5,230,000',
      type: 'Interbank Settlement',
      time: '13:42:15',
      system: 'Fedwire',
      status: 'Completed'
    },
    {
      id: 'tx-89013',
      originBank: 'JPMorgan Chase',
      destinationBank: 'Citibank',
      amount: '$3,750,000',
      type: 'Interbank Settlement',
      time: '13:44:32',
      system: 'Fedwire',
      status: 'Completed'
    },
    {
      id: 'tx-89014',
      originBank: 'U.S. Bank',
      destinationBank: 'PNC Bank',
      amount: '$2,180,000',
      type: 'Interbank Settlement',
      time: '13:47:05',
      system: 'Fedwire',
      status: 'Completed'
    },
    {
      id: 'tx-89015',
      originBank: 'Goldman Sachs',
      destinationBank: 'Morgan Stanley',
      amount: '$8,400,000',
      type: 'Securities Settlement',
      time: '13:51:23',
      system: 'Fedwire',
      status: 'Completed'
    },
    {
      id: 'tx-89016',
      originBank: 'Capital One',
      destinationBank: 'TD Bank',
      amount: '$1,920,000',
      type: 'Interbank Settlement',
      time: '13:53:47',
      system: 'Fedwire',
      status: 'Completed'
    }
  ];
  
  // System details
  const systemDetails = {
    fedwire: {
      name: 'Fedwire Funds Service',
      operator: 'Federal Reserve Banks',
      dailyVolume: '835,000 transactions',
      dailyValue: '$3.46 trillion',
      operatingHours: '9:00 PM ET (previous day) to 7:00 PM ET',
      settlementType: 'Real-time gross settlement (RTGS)',
      accessType: 'Direct and indirect participants'
    }
  };
  
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    
    // Set default system for the selected country
    if (systems[newCountry] && systems[newCountry].length > 0) {
      setSystem(systems[newCountry][0].id);
    }
  };
  
  const handleSystemChange = (e) => {
    setSystem(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="domestic-transfers">
      <h1>Domestic Payment Systems</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Country"
            value={country}
            onChange={handleCountryChange}
            options={countries.map(c => ({
              value: c.id,
              label: c.name
            }))}
          />
          
          <Select
            label="Payment System"
            value={system}
            onChange={handleSystemChange}
            options={(systems[country] || []).map(s => ({
              value: s.id,
              label: s.name
            }))}
          />
          
          <Select
            label="Timeframe"
            value={timeframe}
            onChange={handleTimeframeChange}
            options={timeframes.map(t => ({
              value: t.id,
              label: t.name
            }))}
          />
          
          <Button>
            Refresh Data
          </Button>
        </div>
      </Card>
      
      <div className="data-grid">
        <Card className="system-info">
          <h2>System Information: {systemDetails[system]?.name || system}</h2>
          <div className="system-details">
            {systemDetails[system] ? (
              <>
                <div className="detail-row">
                  <span className="label">Operator:</span>
                  <span className="value">{systemDetails[system].operator}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Daily Volume:</span>
                  <span className="value">{systemDetails[system].dailyVolume}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Daily Value:</span>
                  <span className="value">{systemDetails[system].dailyValue}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Operating Hours:</span>
                  <span className="value">{systemDetails[system].operatingHours}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Settlement Type:</span>
                  <span className="value">{systemDetails[system].settlementType}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Access Type:</span>
                  <span className="value">{systemDetails[system].accessType}</span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                Detailed information not available for this system.
              </div>
            )}
          </div>
        </Card>
        
        <Card className="system-statistics">
          <h2>System Activity Statistics</h2>
          <div className="statistics-grid">
            <div className="stat-item">
              <h3>Transaction Volume</h3>
              <div className="stat-chart">
                {/* Placeholder for chart */}
                <div className="chart-placeholder">Chart: Transaction Volume (Daily)</div>
              </div>
            </div>
            <div className="stat-item">
              <h3>Transaction Value</h3>
              <div className="stat-chart">
                {/* Placeholder for chart */}
                <div className="chart-placeholder">Chart: Transaction Value (Daily)</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="transfers-table">
        <h2>Recent Transfers</h2>
        <Table
          data={transferData}
          columns={[
            { header: 'Transfer ID', accessor: 'id' },
            { header: 'Origin Bank', accessor: 'originBank' },
            { header: 'Destination Bank', accessor: 'destinationBank' },
            { header: 'Amount', accessor: 'amount' },
            { header: 'Type', accessor: 'type' },
            { header: 'Time', accessor: 'time' },
            { header: 'System', accessor: 'system' },
            { 
              header: 'Status', 
              accessor: 'status',
              render: (value) => (
                <span className={`status-${value.toLowerCase().replace(' ', '-')}`}>
                  {value}
                </span>
              )
            }
          ]}
        />
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide tracking and analysis of domestic payment systems, including real-time updates, historical data, and system performance metrics.</p>
      </Card>
    </div>
  );
};

export default DomesticTransfers;