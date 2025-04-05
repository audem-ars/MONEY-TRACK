// MONEY_TRACK - Transaction Types Module
// This module analyzes different types of financial transactions across platforms

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Select, Table } from '../../components/ui';

const TransactionTypes = () => {
  const location = useLocation();
  const [platform, setPlatform] = useState(() => {
    // Try to extract platform from URL query params
    const params = new URLSearchParams(location.search);
    return params.get('source') || 'all';
  });
  
  const [transactionType, setTransactionType] = useState('all');
  const [timeframe, setTimeframe] = useState('monthly');
  
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'exchanges', name: 'Exchanges' },
    { id: 'banking', name: 'Banking' },
    { id: 'fintech', name: 'Fintech' }
  ];
  
  const transactionTypes = [
    { id: 'all', name: 'All Transaction Types' },
    { id: 'spot', name: 'Spot Trades' },
    { id: 'futures', name: 'Futures & Forwards' },
    { id: 'options', name: 'Options' },
    { id: 'swaps', name: 'Swaps' },
    { id: 'otc', name: 'OTC Trades' },
    { id: 'settlements', name: 'Settlements' },
    { id: 'payments', name: 'Payments' }
  ];
  
  const timeframes = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' }
  ];
  
  // Placeholder transaction volume data
  const transactionVolumeData = [
    {
      type: 'Spot Trades',
      volume: '$3.92 trillion',
      count: '278.5 million',
      shareByVolume: '48.7%',
      shareByCount: '68.3%',
      avgSize: '$14,075',
      growth: '+7.3%'
    },
    {
      type: 'Futures & Forwards',
      volume: '$1.84 trillion',
      count: '52.7 million',
      shareByVolume: '22.9%',
      shareByCount: '12.9%',
      avgSize: '$34,915',
      growth: '+12.6%'
    },
    {
      type: 'Options',
      volume: '$0.78 trillion',
      count: '34.1 million',
      shareByVolume: '9.7%',
      shareByCount: '8.4%',
      avgSize: '$22,874',
      growth: '+18.5%'
    },
    {
      type: 'Swaps',
      volume: '$0.67 trillion',
      count: '2.1 million',
      shareByVolume: '8.3%',
      shareByCount: '0.5%',
      avgSize: '$319,048',
      growth: '+3.2%'
    },
    {
      type: 'OTC Trades',
      volume: '$0.42 trillion',
      count: '0.8 million',
      shareByVolume: '5.2%',
      shareByCount: '0.2%',
      avgSize: '$525,000',
      growth: '+4.7%'
    },
    {
      type: 'Settlements',
      volume: '$0.26 trillion',
      count: '5.3 million',
      shareByVolume: '3.2%',
      shareByCount: '1.3%',
      avgSize: '$49,057',
      growth: '+1.9%'
    },
    {
      type: 'Payments',
      volume: '$0.16 trillion',
      count: '34.2 million',
      shareByVolume: '2.0%',
      shareByCount: '8.4%',
      avgSize: '$4,678',
      growth: '+14.3%'
    }
  ];
  
  // Placeholder platform distribution data
  const platformDistribution = [
    {
      platform: 'Cryptocurrency Exchanges',
      spotTrades: '37.2%',
      futuresForwards: '45.3%',
      options: '28.7%',
      swaps: '4.2%',
      otc: '12.5%'
    },
    {
      platform: 'Traditional Exchanges',
      spotTrades: '32.8%',
      futuresForwards: '41.7%',
      options: '62.4%',
      swaps: '8.7%',
      otc: '7.3%'
    },
    {
      platform: 'Banking Systems',
      spotTrades: '8.4%',
      futuresForwards: '9.6%',
      options: '6.8%',
      swaps: '74.3%',
      otc: '42.8%'
    },
    {
      platform: 'Blockchain Networks',
      spotTrades: '21.6%',
      futuresForwards: '3.4%',
      options: '2.1%',
      swaps: '1.8%',
      otc: '14.7%'
    },
    {
      platform: 'Payment Platforms',
      spotTrades: '0.0%',
      futuresForwards: '0.0%',
      options: '0.0%',
      swaps: '11.0%',
      otc: '22.7%'
    }
  ];
  
  // Placeholder recent large transactions
  const largeTransactions = [
    {
      id: 'tx-84721',
      timestamp: '2024-04-03 09:23:47',
      type: 'OTC Trade',
      amount: '$384.2 million',
      asset: 'BTC/USD',
      platform: 'Cumberland/DRW',
      entities: 'Institutional'
    },
    {
      id: 'tx-84722',
      timestamp: '2024-04-03 08:17:32',
      type: 'Swap',
      amount: '$267.5 million',
      asset: '5Y Interest Rate Swap',
      platform: 'JPMorgan',
      entities: 'Institutional'
    },
    {
      id: 'tx-84723',
      timestamp: '2024-04-03 07:45:19',
      type: 'Futures Settlement',
      amount: '$183.7 million',
      asset: 'S&P 500 E-mini',
      platform: 'CME',
      entities: 'Multiple'
    },
    {
      id: 'tx-84724',
      timestamp: '2024-04-03 06:32:54',
      type: 'Spot Trade',
      amount: '$127.3 million',
      asset: 'ETH/USD',
      platform: 'Binance',
      entities: 'Institutional'
    },
    {
      id: 'tx-84725',
      timestamp: '2024-04-03 05:21:08',
      type: 'Options Exercise',
      amount: '$98.5 million',
      asset: 'BTC Options',
      platform: 'Deribit',
      entities: 'Institutional'
    }
  ];
  
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };
  
  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="transaction-types">
      <h1>Transaction Types Analysis</h1>
      
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
            label="Transaction Type"
            value={transactionType}
            onChange={handleTransactionTypeChange}
            options={transactionTypes.map(t => ({
              value: t.id,
              label: t.name
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
            Apply Filters
          </Button>
        </div>
      </Card>
      
      <div className="data-grid">
        <Card className="transaction-summary">
          <h2>Transaction Volume Distribution</h2>
          <div className="chart-placeholder" style={{ height: '300px' }}>
            Pie Chart: Transaction Volume by Type
          </div>
          
          <div className="totals-summary">
            <div className="total-item">
              <h3>Total Monthly Volume</h3>
              <div className="total-value">$8.05 trillion</div>
              <div className="total-change positive">+8.7% YoY</div>
            </div>
            
            <div className="total-item">
              <h3>Total Transaction Count</h3>
              <div className="total-value">407.7 million</div>
              <div className="total-change positive">+11.3% YoY</div>
            </div>
            
            <div className="total-item">
              <h3>Average Transaction Size</h3>
              <div className="total-value">$19,744</div>
              <div className="total-change negative">-2.3% YoY</div>
            </div>
          </div>
        </Card>
        
        <Card className="platform-distribution">
          <h2>Transaction Types by Platform</h2>
          <Table
            data={platformDistribution}
            columns={[
              { header: 'Platform', accessor: 'platform' },
              { header: 'Spot Trades', accessor: 'spotTrades' },
              { header: 'Futures/Forwards', accessor: 'futuresForwards' },
              { header: 'Options', accessor: 'options' },
              { header: 'Swaps', accessor: 'swaps' },
              { header: 'OTC', accessor: 'otc' }
            ]}
          />
        </Card>
      </div>
      
      <Card className="transaction-volume-table">
        <h2>Transaction Volume by Type</h2>
        <Table
          data={transactionVolumeData}
          columns={[
            { header: 'Transaction Type', accessor: 'type' },
            { header: 'Volume', accessor: 'volume' },
            { header: 'Transaction Count', accessor: 'count' },
            { header: 'Volume Share', accessor: 'shareByVolume' },
            { header: 'Count Share', accessor: 'shareByCount' },
            { header: 'Avg. Size', accessor: 'avgSize' },
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
      
      <Card className="recent-large-transactions">
        <h2>Recent Large Transactions</h2>
        <Table
          data={largeTransactions}
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'Type', accessor: 'type' },
            { header: 'Amount', accessor: 'amount' },
            { header: 'Asset/Instrument', accessor: 'asset' },
            { header: 'Platform', accessor: 'platform' },
            { header: 'Entity Type', accessor: 'entities' }
          ]}
        />
      </Card>
      
      <Card className="transaction-trends">
        <h2>Transaction Type Trends</h2>
        <div className="chart-placeholder" style={{ height: '300px' }}>
          Line Chart: Transaction Volume by Type (Last 12 Months)
        </div>
        <p>This visualization shows the change in transaction volume by type over time, highlighting shifts in market activity and trading preferences.</p>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide comprehensive analysis of transaction types across different platforms, including historical trends, volume distribution, and detailed categorization.</p>
      </Card>
    </div>
  );
};

export default TransactionTypes;