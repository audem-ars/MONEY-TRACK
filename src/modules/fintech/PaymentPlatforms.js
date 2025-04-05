// MONEY_TRACK - Payment Platforms Module
// This module tracks payment processors and digital wallet providers

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const PaymentPlatforms = () => {
  const [platform, setPlatform] = useState('paypal');
  const [metric, setMetric] = useState('transaction_volume');
  const [timeframe, setTimeframe] = useState('quarterly');
  
  const platforms = [
    { id: 'paypal', name: 'PayPal' },
    { id: 'stripe', name: 'Stripe' },
    { id: 'square', name: 'Square/Block' },
    { id: 'adyen', name: 'Adyen' },
    { id: 'wise', name: 'Wise' },
    { id: 'revolut', name: 'Revolut' }
  ];
  
  const metrics = [
    { id: 'transaction_volume', name: 'Transaction Volume' },
    { id: 'active_users', name: 'Active Users' },
    { id: 'average_transaction', name: 'Average Transaction Size' },
    { id: 'processing_fees', name: 'Processing Fees' },
    { id: 'settlement_time', name: 'Settlement Time' },
    { id: 'cross_border', name: 'Cross-Border Transactions' }
  ];
  
  const timeframes = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' }
  ];
  
  // Placeholder transaction data
  const transactionData = [
    {
      date: '2024-03-31',
      volume: '$380.5 billion',
      transactions: '5.7 billion',
      activeUsers: '429 million',
      avgTransactionSize: '$66.75',
      totalRevenue: '$7.42 billion',
      takeRate: '1.95%'
    },
    {
      date: '2023-12-31',
      volume: '$410.2 billion',
      transactions: '6.1 billion',
      activeUsers: '426 million',
      avgTransactionSize: '$67.25',
      totalRevenue: '$7.97 billion',
      takeRate: '1.94%'
    },
    {
      date: '2023-09-30',
      volume: '$387.7 billion',
      transactions: '5.8 billion',
      activeUsers: '421 million',
      avgTransactionSize: '$66.84',
      totalRevenue: '$7.52 billion',
      takeRate: '1.94%'
    },
    {
      date: '2023-06-30',
      volume: '$376.5 billion',
      transactions: '5.7 billion',
      activeUsers: '416 million',
      avgTransactionSize: '$66.05',
      totalRevenue: '$7.29 billion',
      takeRate: '1.94%'
    },
    {
      date: '2023-03-31',
      volume: '$351.8 billion',
      transactions: '5.3 billion',
      activeUsers: '411 million',
      avgTransactionSize: '$66.38',
      totalRevenue: '$6.82 billion',
      takeRate: '1.94%'
    }
  ];
  
  // Placeholder merchant segments data
  const merchantSegments = [
    {
      segment: 'E-commerce',
      transactionShare: '58.3%',
      volumeShare: '61.7%',
      growth: '+12.4%'
    },
    {
      segment: 'In-store Retail',
      transactionShare: '15.7%',
      volumeShare: '14.2%',
      growth: '+8.6%'
    },
    {
      segment: 'Services',
      transactionShare: '11.3%',
      volumeShare: '10.8%',
      growth: '+9.3%'
    },
    {
      segment: 'Digital Goods',
      transactionShare: '8.7%',
      volumeShare: '7.9%',
      growth: '+15.2%'
    },
    {
      segment: 'Travel & Hospitality',
      transactionShare: '6.0%',
      volumeShare: '5.4%',
      growth: '+21.7%'
    }
  ];
  
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };
  
  const handleMetricChange = (e) => {
    setMetric(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="payment-platforms">
      <h1>Payment Platforms</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Platform"
            value={platform}
            onChange={handlePlatformChange}
            options={platforms.map(p => ({
              value: p.id,
              label: p.name
            }))}
          />
          
          <Select
            label="Metric"
            value={metric}
            onChange={handleMetricChange}
            options={metrics.map(m => ({
              value: m.id,
              label: m.name
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
        <Card className="platform-summary">
          <h2>PayPal Overview</h2>
          <div className="platform-info">
            <div className="info-section">
              <h3>Key Statistics</h3>
              <div className="stat-row">
                <span className="stat-label">Total Payment Volume (TTM):</span>
                <span className="stat-value">$1.53 trillion</span>
                <span className="stat-change positive">+11.2% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Active Accounts:</span>
                <span className="stat-value">429 million</span>
                <span className="stat-change positive">+4.4% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Transactions per Active Account:</span>
                <span className="stat-value">53.2</span>
                <span className="stat-change positive">+7.9% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Take Rate:</span>
                <span className="stat-value">1.95%</span>
                <span className="stat-change neutral">+0.01% YoY</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3>Payment Methods</h3>
              <div className="payment-methods">
                <div className="method-item">
                  <span className="method-name">Credit/Debit Cards</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '45%' }}></div>
                  </div>
                  <span className="method-value">45%</span>
                </div>
                <div className="method-item">
                  <span className="method-name">PayPal Balance</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span className="method-value">30%</span>
                </div>
                <div className="method-item">
                  <span className="method-name">Bank Accounts</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '20%' }}></div>
                  </div>
                  <span className="method-value">20%</span>
                </div>
                <div className="method-item">
                  <span className="method-name">Other</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '5%' }}></div>
                  </div>
                  <span className="method-value">5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chart-placeholder">
            Chart: PayPal Transaction Volume (Quarterly, Last 5 Years)
          </div>
        </Card>
        
        <Card className="merchant-segments">
          <h2>Merchant Segments</h2>
          <Table
            data={merchantSegments}
            columns={[
              { header: 'Business Segment', accessor: 'segment' },
              { header: 'Transaction Share', accessor: 'transactionShare' },
              { header: 'Volume Share', accessor: 'volumeShare' },
              { 
                header: 'YoY Growth', 
                accessor: 'growth',
                render: (value) => (
                  <span className={value.startsWith('+') ? 'positive' : 'negative'}>
                    {value}
                  </span>
                )
              }
            ]}
          />
        </Card>
      </div>
      
      <Card className="quarterly-data">
        <h2>Quarterly Performance</h2>
        <Table
          data={transactionData}
          columns={[
            { header: 'Quarter End', accessor: 'date' },
            { header: 'Payment Volume', accessor: 'volume' },
            { header: 'Transactions', accessor: 'transactions' },
            { header: 'Active Users', accessor: 'activeUsers' },
            { header: 'Avg Transaction', accessor: 'avgTransactionSize' },
            { header: 'Revenue', accessor: 'totalRevenue' },
            { header: 'Take Rate', accessor: 'takeRate' }
          ]}
        />
      </Card>
      
      <Card className="geographical-distribution">
        <h2>Geographical Distribution</h2>
        <div className="geo-distribution">
          <div className="chart-placeholder" style={{ height: '300px' }}>
            World Map: PayPal Transaction Volume by Region
          </div>
          
          <div className="region-breakdown">
            <div className="region-item">
              <span className="region-name">North America</span>
              <div className="region-bar">
                <div className="region-fill" style={{ width: '47%' }}></div>
              </div>
              <span className="region-value">47%</span>
            </div>
            <div className="region-item">
              <span className="region-name">Europe</span>
              <div className="region-bar">
                <div className="region-fill" style={{ width: '32%' }}></div>
              </div>
              <span className="region-value">32%</span>
            </div>
            <div className="region-item">
              <span className="region-name">Asia Pacific</span>
              <div className="region-bar">
                <div className="region-fill" style={{ width: '14%' }}></div>
              </div>
              <span className="region-value">14%</span>
            </div>
            <div className="region-item">
              <span className="region-name">Rest of World</span>
              <div className="region-bar">
                <div className="region-fill" style={{ width: '7%' }}></div>
              </div>
              <span className="region-value">7%</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to payment platform APIs and financial data providers to track real-time and historical transaction data, user metrics, and geographical distribution of payment flows.</p>
      </Card>
    </div>
  );
};

export default PaymentPlatforms;