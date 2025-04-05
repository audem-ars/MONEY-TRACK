// MONEY_TRACK - SWIFT Transactions Module
// This module tracks cross-border banking transactions through SWIFT

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const SwiftTransactions = () => {
  const [region, setRegion] = useState('global');
  const [currency, setCurrency] = useState('all');
  const [timeframe, setTimeframe] = useState('daily');
  
  const regions = [
    { id: 'global', name: 'Global' },
    { id: 'north_america', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia_pacific', name: 'Asia Pacific' },
    { id: 'middle_east', name: 'Middle East' },
    { id: 'latin_america', name: 'Latin America' }
  ];
  
  const currencies = [
    { id: 'all', name: 'All Currencies' },
    { id: 'usd', name: 'USD' },
    { id: 'eur', name: 'EUR' },
    { id: 'gbp', name: 'GBP' },
    { id: 'jpy', name: 'JPY' },
    { id: 'cny', name: 'CNY' }
  ];
  
  const timeframes = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' }
  ];
  
  // Placeholder SWIFT transaction data
  const transactionData = [
    {
      id: 'tx-12345',
      originBank: 'JPMorgan Chase',
      originCountry: 'United States',
      destinationBank: 'Deutsche Bank',
      destinationCountry: 'Germany',
      amount: '$24,500,000',
      currency: 'USD',
      messageType: 'MT103',
      status: 'Completed',
      settlementTime: '1.2 days'
    },
    {
      id: 'tx-12346',
      originBank: 'HSBC',
      originCountry: 'United Kingdom',
      destinationBank: 'Bank of Tokyo-Mitsubishi',
      destinationCountry: 'Japan',
      amount: '¥2,130,000,000',
      currency: 'JPY',
      messageType: 'MT103',
      status: 'Completed',
      settlementTime: '1.5 days'
    },
    {
      id: 'tx-12347',
      originBank: 'BNP Paribas',
      originCountry: 'France',
      destinationBank: 'Santander',
      destinationCountry: 'Spain',
      amount: '€18,300,000',
      currency: 'EUR',
      messageType: 'MT202',
      status: 'In Process',
      settlementTime: 'Pending'
    },
    {
      id: 'tx-12348',
      originBank: 'Industrial and Commercial Bank of China',
      originCountry: 'China',
      destinationBank: 'Standard Chartered',
      destinationCountry: 'Hong Kong',
      amount: '¥135,000,000',
      currency: 'CNY',
      messageType: 'MT103',
      status: 'Completed',
      settlementTime: '2.3 days'
    },
    {
      id: 'tx-12349',
      originBank: 'Citibank',
      originCountry: 'United States',
      destinationBank: 'Barclays',
      destinationCountry: 'United Kingdom',
      amount: '$32,100,000',
      currency: 'USD',
      messageType: 'MT202',
      status: 'Completed',
      settlementTime: '1.0 days'
    }
  ];
  
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="swift-transactions">
      <h1>SWIFT & Cross-Border Transactions</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Region"
            value={region}
            onChange={handleRegionChange}
            options={regions.map(r => ({
              value: r.id,
              label: r.name
            }))}
          />
          
          <Select
            label="Currency"
            value={currency}
            onChange={handleCurrencyChange}
            options={currencies.map(c => ({
              value: c.id,
              label: c.name
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
        <Card className="swift-summary">
          <h2>SWIFT Network Summary</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <h3>Daily Transaction Volume</h3>
              <div className="stat-value">42.3 million messages</div>
              <div className="stat-change positive">+3.2% vs. previous day</div>
            </div>
            
            <div className="stat-item">
              <h3>Daily Transaction Value</h3>
              <div className="stat-value">$5.4 trillion</div>
              <div className="stat-change positive">+2.8% vs. previous day</div>
            </div>
            
            <div className="stat-item">
              <h3>Average Settlement Time</h3>
              <div className="stat-value">1.8 days</div>
              <div className="stat-change negative">+0.2 days vs. previous month</div>
            </div>
            
            <div className="stat-item">
              <h3>Connected Institutions</h3>
              <div className="stat-value">11,000+</div>
              <div className="stat-change neutral">No change</div>
            </div>
          </div>
        </Card>
        
        <Card className="swift-transactions-table">
          <h2>Recent High-Value Transactions</h2>
          <Table
            data={transactionData}
            columns={[
              { header: 'Transaction ID', accessor: 'id' },
              { header: 'Origin Bank', accessor: 'originBank' },
              { header: 'Origin Country', accessor: 'originCountry' },
              { header: 'Destination Bank', accessor: 'destinationBank' },
              { header: 'Destination Country', accessor: 'destinationCountry' },
              { header: 'Amount', accessor: 'amount' },
              { header: 'Currency', accessor: 'currency' },
              { 
                header: 'Status', 
                accessor: 'status',
                render: (value) => (
                  <span className={`status-${value.toLowerCase().replace(' ', '-')}`}>
                    {value}
                  </span>
                )
              },
              { header: 'Settlement Time', accessor: 'settlementTime' }
            ]}
          />
        </Card>
      </div>
      
      <Card className="swift-insights">
        <h2>Cross-Border Transaction Insights</h2>
        <div className="insights-grid">
          <div className="insight-item">
            <h3>Top Corridors by Volume</h3>
            <ol className="corridor-list">
              <li>United States ↔ European Union</li>
              <li>United Kingdom ↔ European Union</li>
              <li>China ↔ United States</li>
              <li>Japan ↔ United States</li>
              <li>Hong Kong ↔ China</li>
            </ol>
          </div>
          
          <div className="insight-item">
            <h3>Currency Distribution</h3>
            <div className="currency-distribution">
              <div className="currency-item">
                <span className="currency-name">USD</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: '43%' }}></div>
                </div>
                <span className="distribution-value">43%</span>
              </div>
              <div className="currency-item">
                <span className="currency-name">EUR</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: '31%' }}></div>
                </div>
                <span className="distribution-value">31%</span>
              </div>
              <div className="currency-item">
                <span className="currency-name">GBP</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: '7%' }}></div>
                </div>
                <span className="distribution-value">7%</span>
              </div>
              <div className="currency-item">
                <span className="currency-name">JPY</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: '5%' }}></div>
                </div>
                <span className="distribution-value">5%</span>
              </div>
              <div className="currency-item">
                <span className="currency-name">Other</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: '14%' }}></div>
                </div>
                <span className="distribution-value">14%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide analysis of SWIFT network data, cross-border transaction flows, and settlement patterns between financial institutions.</p>
      </Card>
    </div>
  );
};

export default SwiftTransactions;