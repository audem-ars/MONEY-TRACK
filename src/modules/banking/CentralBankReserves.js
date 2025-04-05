// MONEY_TRACK - Central Bank Reserves Module
// This module tracks central bank balance sheets and monetary reserves

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const CentralBankReserves = () => {
  const [centralBank, setCentralBank] = useState('fed');
  const [metric, setMetric] = useState('total_assets');
  const [timeframe, setTimeframe] = useState('monthly');
  
  const centralBanks = [
    { id: 'fed', name: 'Federal Reserve (US)' },
    { id: 'ecb', name: 'European Central Bank' },
    { id: 'boj', name: 'Bank of Japan' },
    { id: 'pboc', name: 'People\'s Bank of China' },
    { id: 'boe', name: 'Bank of England' },
    { id: 'snb', name: 'Swiss National Bank' }
  ];
  
  const metrics = [
    { id: 'total_assets', name: 'Total Assets' },
    { id: 'currency_in_circulation', name: 'Currency in Circulation' },
    { id: 'foreign_reserves', name: 'Foreign Exchange Reserves' },
    { id: 'gold_reserves', name: 'Gold Reserves' },
    { id: 'securities_holdings', name: 'Securities Holdings' },
    { id: 'repo_operations', name: 'Repo Operations' }
  ];
  
  const timeframes = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'annually', name: 'Annually' }
  ];
  
  // Placeholder balance sheet data
  const balanceSheetData = [
    {
      date: '2024-03-31',
      totalAssets: '$7.32 trillion',
      securitiesHoldings: '$5.74 trillion',
      loans: '$0.12 trillion',
      goldStock: '$11.04 billion',
      foreignCurrency: '$19.65 billion',
      currencyInCirculation: '$2.32 trillion',
      bankReserves: '$3.23 trillion'
    },
    {
      date: '2024-02-29',
      totalAssets: '$7.38 trillion',
      securitiesHoldings: '$5.79 trillion',
      loans: '$0.11 trillion',
      goldStock: '$11.04 billion',
      foreignCurrency: '$19.63 billion',
      currencyInCirculation: '$2.31 trillion',
      bankReserves: '$3.27 trillion'
    },
    {
      date: '2024-01-31',
      totalAssets: '$7.45 trillion',
      securitiesHoldings: '$5.84 trillion',
      loans: '$0.13 trillion',
      goldStock: '$11.04 billion',
      foreignCurrency: '$19.61 billion',
      currencyInCirculation: '$2.30 trillion',
      bankReserves: '$3.32 trillion'
    },
    {
      date: '2023-12-31',
      totalAssets: '$7.51 trillion',
      securitiesHoldings: '$5.90 trillion',
      loans: '$0.14 trillion',
      goldStock: '$11.04 billion',
      foreignCurrency: '$19.58 billion',
      currencyInCirculation: '$2.29 trillion',
      bankReserves: '$3.36 trillion'
    },
    {
      date: '2023-11-30',
      totalAssets: '$7.58 trillion',
      securitiesHoldings: '$5.95 trillion',
      loans: '$0.15 trillion',
      goldStock: '$11.04 billion',
      foreignCurrency: '$19.55 billion',
      currencyInCirculation: '$2.28 trillion',
      bankReserves: '$3.41 trillion'
    }
  ];
  
  // Placeholder policy actions
  const policyActions = [
    {
      date: '2024-03-20',
      action: 'Interest Rate Decision',
      description: 'Maintained target range for federal funds rate at 5.25%-5.50%',
      impact: 'Neutral'
    },
    {
      date: '2024-02-28',
      action: 'Balance Sheet Reduction',
      description: 'Continued balance sheet reduction at pace of $60 billion per month',
      impact: 'Contractionary'
    },
    {
      date: '2024-01-31',
      action: 'Interest Rate Decision',
      description: 'Maintained target range for federal funds rate at 5.25%-5.50%',
      impact: 'Neutral'
    },
    {
      date: '2023-12-13',
      action: 'Interest Rate Decision',
      description: 'Maintained target range for federal funds rate at 5.25%-5.50%',
      impact: 'Neutral'
    },
    {
      date: '2023-11-01',
      action: 'Interest Rate Decision',
      description: 'Maintained target range for federal funds rate at 5.25%-5.50%',
      impact: 'Neutral'
    }
  ];
  
  const handleCentralBankChange = (e) => {
    setCentralBank(e.target.value);
  };
  
  const handleMetricChange = (e) => {
    setMetric(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="central-bank-reserves">
      <h1>Central Bank Reserves & Balance Sheets</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Central Bank"
            value={centralBank}
            onChange={handleCentralBankChange}
            options={centralBanks.map(bank => ({
              value: bank.id,
              label: bank.name
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
        <Card className="bank-summary">
          <h2>Federal Reserve Overview</h2>
          <div className="bank-info">
            <div className="info-section">
              <h3>Key Monetary Policy Rates</h3>
              <div className="rate-item">
                <span className="rate-name">Federal Funds Rate:</span>
                <span className="rate-value">5.25% - 5.50%</span>
                <span className="rate-change">Unchanged since July 2023</span>
              </div>
              <div className="rate-item">
                <span className="rate-name">Discount Rate:</span>
                <span className="rate-value">5.75%</span>
                <span className="rate-change">Unchanged since July 2023</span>
              </div>
              <div className="rate-item">
                <span className="rate-name">Interest on Reserve Balances:</span>
                <span className="rate-value">5.40%</span>
                <span className="rate-change">Unchanged since July 2023</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3>Balance Sheet Summary</h3>
              <div className="detail-row">
                <span className="label">Total Assets:</span>
                <span className="value">$7.32 trillion</span>
                <span className="change negative">-$0.06 trillion MTD</span>
              </div>
              <div className="detail-row">
                <span className="label">Securities Holdings:</span>
                <span className="value">$5.74 trillion</span>
                <span className="change negative">-$0.05 trillion MTD</span>
              </div>
              <div className="detail-row">
                <span className="label">Bank Reserves:</span>
                <span className="value">$3.23 trillion</span>
                <span className="change negative">-$0.04 trillion MTD</span>
              </div>
            </div>
          </div>
          
          <div className="chart-placeholder">
            Chart: Federal Reserve Total Assets (Monthly, Last 5 Years)
          </div>
        </Card>
        
        <Card className="policy-actions">
          <h2>Recent Monetary Policy Actions</h2>
          <Table
            data={policyActions}
            columns={[
              { header: 'Date', accessor: 'date' },
              { header: 'Action', accessor: 'action' },
              { header: 'Description', accessor: 'description' },
              { 
                header: 'Impact', 
                accessor: 'impact',
                render: (value) => {
                  let className = 'neutral';
                  if (value === 'Expansionary') className = 'positive';
                  if (value === 'Contractionary') className = 'negative';
                  
                  return (
                    <span className={`impact-${className}`}>
                      {value}
                    </span>
                  );
                }
              }
            ]}
          />
        </Card>
      </div>
      
      <Card className="balance-sheet">
        <h2>Balance Sheet History</h2>
        <Table
          data={balanceSheetData}
          columns={[
            { header: 'Date', accessor: 'date' },
            { header: 'Total Assets', accessor: 'totalAssets' },
            { header: 'Securities', accessor: 'securitiesHoldings' },
            { header: 'Loans', accessor: 'loans' },
            { header: 'Gold Stock', accessor: 'goldStock' },
            { header: 'Foreign Currency', accessor: 'foreignCurrency' },
            { header: 'Currency in Circulation', accessor: 'currencyInCirculation' },
            { header: 'Bank Reserves', accessor: 'bankReserves' }
          ]}
        />
      </Card>
      
      <Card className="central-bank-comparison">
        <h2>Global Central Bank Comparison</h2>
        <div className="comparison-grid">
          <div className="comparison-item">
            <h3>Balance Sheet Size (% of GDP)</h3>
            <div className="comparison-chart">
              <div className="chart-bar-container">
                <div className="chart-label">Bank of Japan</div>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: '135%' }}></div>
                </div>
                <div className="chart-value">135%</div>
              </div>
              <div className="chart-bar-container">
                <div className="chart-label">ECB</div>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: '60%' }}></div>
                </div>
                <div className="chart-value">60%</div>
              </div>
              <div className="chart-bar-container">
                <div className="chart-label">Fed</div>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: '32%' }}></div>
                </div>
                <div className="chart-value">32%</div>
              </div>
              <div className="chart-bar-container">
                <div className="chart-label">Bank of England</div>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: '28%' }}></div>
                </div>
                <div className="chart-value">28%</div>
              </div>
              <div className="chart-bar-container">
                <div className="chart-label">PBoC</div>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: '27%' }}></div>
                </div>
                <div className="chart-value">27%</div>
              </div>
            </div>
          </div>
          
          <div className="comparison-item">
            <h3>Policy Rates Comparison</h3>
            <div className="comparison-chart">
              {/* Placeholder for policy rates comparison chart */}
              <div className="chart-placeholder">Chart: Policy Rates Across Major Central Banks</div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide real-time tracking of central bank balance sheets, monetary policy changes, and compare reserves across global central banks.</p>
      </Card>
    </div>
  );
};

export default CentralBankReserves;