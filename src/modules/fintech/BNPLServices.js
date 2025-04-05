// MONEY_TRACK - Buy Now Pay Later Services Module
// This module tracks BNPL platforms and installment payment flows

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const BNPLServices = () => {
  const [provider, setProvider] = useState('affirm');
  const [metric, setMetric] = useState('gmv');
  const [timeframe, setTimeframe] = useState('quarterly');
  
  const providers = [
    { id: 'affirm', name: 'Affirm' },
    { id: 'klarna', name: 'Klarna' },
    { id: 'afterpay', name: 'Afterpay/Block' },
    { id: 'paypal', name: 'PayPal Pay Later' },
    { id: 'zip', name: 'Zip' },
    { id: 'sezzle', name: 'Sezzle' }
  ];
  
  const metrics = [
    { id: 'gmv', name: 'Gross Merchandise Volume' },
    { id: 'active_users', name: 'Active Users' },
    { id: 'transactions', name: 'Transactions' },
    { id: 'average_order', name: 'Average Order Value' },
    { id: 'delinquency', name: 'Delinquency Rate' },
    { id: 'merchant_adoption', name: 'Merchant Adoption' }
  ];
  
  const timeframes = [
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'annually', name: 'Annually' }
  ];
  
  // Placeholder quarterly data
  const quarterlyData = [
    {
      date: '2024-03-31',
      gmv: '$4.2 billion',
      transactions: '14.7 million',
      activeUsers: '13.8 million',
      avgOrderValue: '$286',
      revenue: '$362 million',
      takeRate: '8.62%'
    },
    {
      date: '2023-12-31',
      gmv: '$5.6 billion',
      transactions: '19.3 million',
      activeUsers: '13.5 million',
      avgOrderValue: '$290',
      revenue: '$483 million',
      takeRate: '8.63%'
    },
    {
      date: '2023-09-30',
      gmv: '$4.0 billion',
      transactions: '13.9 million',
      activeUsers: '13.1 million',
      avgOrderValue: '$288',
      revenue: '$345 million',
      takeRate: '8.63%'
    },
    {
      date: '2023-06-30',
      gmv: '$3.8 billion',
      transactions: '13.2 million',
      activeUsers: '12.7 million',
      avgOrderValue: '$288',
      revenue: '$328 million',
      takeRate: '8.63%'
    },
    {
      date: '2023-03-31',
      gmv: '$3.9 billion',
      transactions: '13.7 million',
      activeUsers: '12.3 million',
      avgOrderValue: '$285',
      revenue: '$337 million',
      takeRate: '8.64%'
    }
  ];
  
  // Placeholder merchant category data
  const merchantCategories = [
    {
      category: 'Apparel & Fashion',
      volumeShare: '31.7%',
      transactionShare: '36.3%',
      avgOrderValue: '$251'
    },
    {
      category: 'Electronics',
      volumeShare: '27.2%',
      transactionShare: '13.8%',
      avgOrderValue: '$567'
    },
    {
      category: 'Home & Furniture',
      volumeShare: '16.5%',
      transactionShare: '11.3%',
      avgOrderValue: '$429'
    },
    {
      category: 'Health & Beauty',
      volumeShare: '8.9%',
      transactionShare: '14.7%',
      avgOrderValue: '$175'
    },
    {
      category: 'Travel',
      volumeShare: '8.2%',
      transactionShare: '4.3%',
      avgOrderValue: '$548'
    },
    {
      category: 'Other',
      volumeShare: '7.5%',
      transactionShare: '19.6%',
      avgOrderValue: '$113'
    }
  ];
  
  // Placeholder loan performance data
  const loanPerformance = [
    {
      duration: '0-30 days',
      outstandingBalance: '$1.85 billion',
      delinquencyRate: '0.8%',
      chargeoffRate: '0.1%'
    },
    {
      duration: '31-60 days',
      outstandingBalance: '$1.63 billion',
      delinquencyRate: '1.7%',
      chargeoffRate: '0.3%'
    },
    {
      duration: '61-90 days',
      outstandingBalance: '$1.41 billion',
      delinquencyRate: '2.5%',
      chargeoffRate: '0.7%'
    },
    {
      duration: '91+ days',
      outstandingBalance: '$1.37 billion',
      delinquencyRate: '3.4%',
      chargeoffRate: '1.2%'
    }
  ];
  
  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };
  
  const handleMetricChange = (e) => {
    setMetric(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="bnpl-services">
      <h1>Buy Now Pay Later Services</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Provider"
            value={provider}
            onChange={handleProviderChange}
            options={providers.map(p => ({
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
        <Card className="provider-summary">
          <h2>Affirm Overview</h2>
          <div className="provider-info">
            <div className="info-section">
              <h3>Key Statistics</h3>
              <div className="stat-row">
                <span className="stat-label">Annual GMV:</span>
                <span className="stat-value">$17.5 billion</span>
                <span className="stat-change positive">+15.3% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Active Users:</span>
                <span className="stat-value">13.8 million</span>
                <span className="stat-change positive">+12.2% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Merchant Partners:</span>
                <span className="stat-value">235,000+</span>
                <span className="stat-change positive">+18.7% YoY</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Average Order Value:</span>
                <span className="stat-value">$286</span>
                <span className="stat-change neutral">+0.3% YoY</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3>Installment Plans</h3>
              <div className="installment-distribution">
                <div className="installment-item">
                  <span className="installment-name">Pay in 4 (0% APR)</span>
                  <div className="installment-bar">
                    <div className="installment-fill" style={{ width: '43%' }}></div>
                  </div>
                  <span className="installment-value">43%</span>
                </div>
                <div className="installment-item">
                  <span className="installment-name">3-Month (0% APR)</span>
                  <div className="installment-bar">
                    <div className="installment-fill" style={{ width: '27%' }}></div>
                  </div>
                  <span className="installment-value">27%</span>
                </div>
                <div className="installment-item">
                  <span className="installment-name">6-Month (0-15% APR)</span>
                  <div className="installment-bar">
                    <div className="installment-fill" style={{ width: '18%' }}></div>
                  </div>
                  <span className="installment-value">18%</span>
                </div>
                <div className="installment-item">
                  <span className="installment-name">12-Month (10-30% APR)</span>
                  <div className="installment-bar">
                    <div className="installment-fill" style={{ width: '12%' }}></div>
                  </div>
                  <span className="installment-value">12%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chart-placeholder">
            Chart: Affirm GMV Growth (Quarterly, Last 5 Years)
          </div>
        </Card>
        
        <Card className="performance-metrics">
          <h2>Loan Performance</h2>
          <Table
            data={loanPerformance}
            columns={[
              { header: 'Duration', accessor: 'duration' },
              { header: 'Outstanding Balance', accessor: 'outstandingBalance' },
              { 
                header: 'Delinquency Rate', 
                accessor: 'delinquencyRate',
                render: (value) => (
                  <span className={parseFloat(value) > 2.0 ? 'negative' : 'neutral'}>
                    {value}
                  </span>
                )
              },
              { 
                header: 'Charge-off Rate', 
                accessor: 'chargeoffRate',
                render: (value) => (
                  <span className={parseFloat(value) > 1.0 ? 'negative' : 'neutral'}>
                    {value}
                  </span>
                )
              }
            ]}
          />
        </Card>
      </div>
      
      <Card className="merchant-categories">
        <h2>Merchant Categories</h2>
        <Table
          data={merchantCategories}
          columns={[
            { header: 'Category', accessor: 'category' },
            { header: 'Volume Share', accessor: 'volumeShare' },
            { header: 'Transaction Share', accessor: 'transactionShare' },
            { header: 'Avg. Order Value', accessor: 'avgOrderValue' }
          ]}
        />
      </Card>
      
      <Card className="quarterly-metrics">
        <h2>Quarterly Performance</h2>
        <Table
          data={quarterlyData}
          columns={[
            { header: 'Quarter End', accessor: 'date' },
            { header: 'GMV', accessor: 'gmv' },
            { header: 'Transactions', accessor: 'transactions' },
            { header: 'Active Users', accessor: 'activeUsers' },
            { header: 'Avg Order Value', accessor: 'avgOrderValue' },
            { header: 'Revenue', accessor: 'revenue' },
            { header: 'Take Rate', accessor: 'takeRate' }
          ]}
        />
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to BNPL provider APIs and financial data sources to track installment payment flows, consumer credit trends, merchant adoption, and loan performance metrics.</p>
      </Card>
    </div>
  );
};

export default BNPLServices;