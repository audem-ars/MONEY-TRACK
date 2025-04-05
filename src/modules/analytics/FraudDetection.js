// MONEY_TRACK - Fraud Detection Module
// This module detects and analyzes suspicious financial activity

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const FraudDetection = () => {
  const [alertLevel, setAlertLevel] = useState('all');
  const [patternType, setPatternType] = useState('all');
  const [timeframe, setTimeframe] = useState('7d');
  
  const alertLevels = [
    { id: 'all', name: 'All Alert Levels' },
    { id: 'high', name: 'High Priority' },
    { id: 'medium', name: 'Medium Priority' },
    { id: 'low', name: 'Low Priority' },
    { id: 'info', name: 'Informational' }
  ];
  
  const patternTypes = [
    { id: 'all', name: 'All Pattern Types' },
    { id: 'wash', name: 'Wash Trading' },
    { id: 'layering', name: 'Layering' },
    { id: 'rapid', name: 'Rapid Fund Movement' },
    { id: 'circular', name: 'Circular Trading' },
    { id: 'spoofing', name: 'Spoofing' },
    { id: 'unusual', name: 'Unusual Volume' },
    { id: 'multiple', name: 'Multiple Accounts' }
  ];
  
  const timeframes = [
    { id: '24h', name: 'Last 24 Hours' },
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' }
  ];
  
  // Placeholder fraud alerts data
  const fraudAlerts = [
    {
      id: 'alert-12345',
      timestamp: '2024-04-03 07:32:19',
      level: 'High',
      pattern: 'Wash Trading',
      entities: 'Multiple Addresses',
      volume: '$43.2 million',
      platform: 'Multiple Exchanges',
      status: 'Active'
    },
    {
      id: 'alert-12346',
      timestamp: '2024-04-02 22:47:53',
      level: 'High',
      pattern: 'Rapid Fund Movement',
      entities: 'Wallet 0x7a3b...4f21',
      volume: '$27.8 million',
      platform: 'Blockchain/Exchange',
      status: 'Active'
    },
    {
      id: 'alert-12347',
      timestamp: '2024-04-02 14:21:05',
      level: 'Medium',
      pattern: 'Circular Trading',
      entities: '5 Related Accounts',
      volume: '$12.4 million',
      platform: 'Exchange',
      status: 'Active'
    },
    {
      id: 'alert-12348',
      timestamp: '2024-04-01 19:36:42',
      level: 'Medium',
      pattern: 'Layering',
      entities: 'Trading Group Alpha',
      volume: '$8.7 million',
      platform: 'Exchange',
      status: 'Under Review'
    },
    {
      id: 'alert-12349',
      timestamp: '2024-04-01 12:08:27',
      level: 'Low',
      pattern: 'Unusual Volume',
      entities: 'Exchange Account #2754',
      volume: '$3.2 million',
      platform: 'Exchange',
      status: 'Under Review'
    },
    {
      id: 'alert-12350',
      timestamp: '2024-03-31 08:53:11',
      level: 'Low',
      pattern: 'Multiple Accounts',
      entities: 'User ID 87432',
      volume: '$1.7 million',
      platform: 'Payment Platform',
      status: 'Resolved'
    }
  ];
  
  // Placeholder pattern statistics
  const patternStats = [
    {
      pattern: 'Wash Trading',
      alertCount: 87,
      highPriority: 32,
      totalVolume: '$346.5 million',
      changeRate: '+23.7%'
    },
    {
      pattern: 'Layering',
      alertCount: 143,
      highPriority: 47,
      totalVolume: '$278.3 million',
      changeRate: '+18.2%'
    },
    {
      pattern: 'Rapid Fund Movement',
      alertCount: 217,
      highPriority: 61,
      totalVolume: '$532.8 million',
      changeRate: '+29.5%'
    },
    {
      pattern: 'Circular Trading',
      alertCount: 62,
      highPriority: 23,
      totalVolume: '$124.7 million',
      changeRate: '+7.3%'
    },
    {
      pattern: 'Spoofing',
      alertCount: 91,
      highPriority: 18,
      totalVolume: '$87.2 million',
      changeRate: '-12.5%'
    },
    {
      pattern: 'Unusual Volume',
      alertCount: 176,
      highPriority: 35,
      totalVolume: '$293.6 million',
      changeRate: '+15.9%'
    },
    {
      pattern: 'Multiple Accounts',
      alertCount: 104,
      highPriority: 12,
      totalVolume: '$67.8 million',
      changeRate: '+4.2%'
    }
  ];
  
  // Placeholder platform distribution
  const platformDistribution = [
    {
      platform: 'Cryptocurrency Exchanges',
      alertCount: 342,
      highPriority: 128,
      suspiciousVolume: '$724.5 million',
      percentOfTotal: '42.3%'
    },
    {
      platform: 'Blockchain Networks',
      alertCount: 287,
      highPriority: 112,
      suspiciousVolume: '$542.8 million',
      percentOfTotal: '31.7%'
    },
    {
      platform: 'Traditional Exchanges',
      alertCount: 143,
      highPriority: 42,
      suspiciousVolume: '$187.3 million',
      percentOfTotal: '10.9%'
    },
    {
      platform: 'Banking Systems',
      alertCount: 98,
      highPriority: 37,
      suspiciousVolume: '$156.2 million',
      percentOfTotal: '9.1%'
    },
    {
      platform: 'Payment Platforms',
      alertCount: 76,
      highPriority: 24,
      suspiciousVolume: '$102.4 million',
      percentOfTotal: '6.0%'
    }
  ];
  
  const handleAlertLevelChange = (e) => {
    setAlertLevel(e.target.value);
  };
  
  const handlePatternTypeChange = (e) => {
    setPatternType(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="fraud-detection">
      <h1>Fraud Detection & Monitoring</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Alert Level"
            value={alertLevel}
            onChange={handleAlertLevelChange}
            options={alertLevels.map(level => ({
              value: level.id,
              label: level.name
            }))}
          />
          
          <Select
            label="Pattern Type"
            value={patternType}
            onChange={handlePatternTypeChange}
            options={patternTypes.map(pattern => ({
              value: pattern.id,
              label: pattern.name
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
      
      <div className="alert-summary">
        <div className="alert-metrics">
          <div className="alert-metric-card high">
            <div className="metric-icon">⚠️</div>
            <div className="metric-info">
              <h3>High Priority</h3>
              <div className="metric-value">228</div>
              <div className="metric-change negative">+18.7% vs. last period</div>
            </div>
          </div>
          
          <div className="alert-metric-card medium">
            <div className="metric-icon">⚠️</div>
            <div className="metric-info">
              <h3>Medium Priority</h3>
              <div className="metric-value">453</div>
              <div className="metric-change negative">+12.3% vs. last period</div>
            </div>
          </div>
          
          <div className="alert-metric-card low">
            <div className="metric-icon">⚠️</div>
            <div className="metric-info">
              <h3>Low Priority</h3>
              <div className="metric-value">319</div>
              <div className="metric-change negative">+7.9% vs. last period</div>
            </div>
          </div>
          
          <div className="alert-metric-card total">
            <div className="metric-icon">🔍</div>
            <div className="metric-info">
              <h3>Total Alerts</h3>
              <div className="metric-value">1,000</div>
              <div className="metric-change negative">+13.2% vs. last period</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="data-grid">
        <Card className="active-alerts">
          <h2>Active Fraud Alerts</h2>
          <Table
            data={fraudAlerts}
            columns={[
              { header: 'Alert ID', accessor: 'id' },
              { header: 'Timestamp', accessor: 'timestamp' },
              { 
                header: 'Level', 
                accessor: 'level',
                render: (value) => {
                  let className = 'alert-level';
                  if (value === 'High') className += ' high';
                  if (value === 'Medium') className += ' medium';
                  if (value === 'Low') className += ' low';
                  
                  return (
                    <span className={className}>
                      {value}
                    </span>
                  );
                }
              },
              { header: 'Pattern', accessor: 'pattern' },
              { header: 'Entities', accessor: 'entities' },
              { header: 'Volume', accessor: 'volume' },
              { header: 'Platform', accessor: 'platform' },
              { 
                header: 'Status', 
                accessor: 'status',
                render: (value) => {
                  let className = 'alert-status';
                  if (value === 'Active') className += ' active';
                  if (value === 'Under Review') className += ' review';
                  if (value === 'Resolved') className += ' resolved';
                  
                  return (
                    <span className={className}>
                      {value}
                    </span>
                  );
                }
              }
            ]}
          />
        </Card>
        
        <Card className="pattern-stats">
          <h2>Suspicious Pattern Statistics</h2>
          <Table
            data={patternStats}
            columns={[
              { header: 'Pattern Type', accessor: 'pattern' },
              { header: 'Alert Count', accessor: 'alertCount' },
              { header: 'High Priority', accessor: 'highPriority' },
              { header: 'Total Volume', accessor: 'totalVolume' },
              { 
                header: 'Change Rate', 
                accessor: 'changeRate',
                render: (value) => (
                  <span className={value.startsWith('+') ? 'negative' : 'positive'}>
                    {value}
                  </span>
                )
              }
            ]}
          />
        </Card>
      </div>
      
      <Card className="platform-distribution">
        <h2>Suspicious Activity by Platform</h2>
        <div className="chart-placeholder" style={{ height: '300px' }}>
          Bar Chart: Suspicious Volume by Platform
        </div>
        
        <Table
          data={platformDistribution}
          columns={[
            { header: 'Platform', accessor: 'platform' },
            { header: 'Alert Count', accessor: 'alertCount' },
            { header: 'High Priority', accessor: 'highPriority' },
            { header: 'Suspicious Volume', accessor: 'suspiciousVolume' },
            { header: 'Percent of Total', accessor: 'percentOfTotal' }
          ]}
        />
      </Card>
      
      <Card className="fraud-patterns">
        <h2>Detected Fraud Patterns</h2>
        <div className="patterns-grid">
          <div className="pattern-item">
            <h3>Wash Trading</h3>
            <p>Trading between related accounts or entities to create artificial volume and manipulate prices. Often indicates market manipulation.</p>
            <div className="pattern-example">
              <div className="example-title">Typical Pattern:</div>
              <div className="example-diagram">
                Account A → Account B → Account C → Account A
              </div>
            </div>
          </div>
          
          <div className="pattern-item">
            <h3>Layering</h3>
            <p>Placing multiple orders at different price levels to create the illusion of market activity, then executing trades at manipulated prices.</p>
            <div className="pattern-example">
              <div className="example-title">Typical Pattern:</div>
              <div className="example-diagram">
                Multiple Small Orders → Cancel After Effect → Execute Target Trade
              </div>
            </div>
          </div>
          
          <div className="pattern-item">
            <h3>Rapid Fund Movement</h3>
            <p>Quick transfers of funds through multiple accounts or platforms to obscure the origin of funds, often associated with money laundering.</p>
            <div className="pattern-example">
              <div className="example-title">Typical Pattern:</div>
              <div className="example-diagram">
                Exchange → Multiple Wallets → Mixer Service → New Wallets → Different Exchange
              </div>
            </div>
          </div>
          
          <div className="pattern-item">
            <h3>Circular Trading</h3>
            <p>Funds moving in a circular pattern through multiple entities, often returning to the original source after passing through intermediaries.</p>
            <div className="pattern-example">
              <div className="example-title">Typical Pattern:</div>
              <div className="example-diagram">
                Entity A → Entity B → Entity C → Entity D → Entity A
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will use advanced algorithms and machine learning to detect suspicious patterns across all tracked financial systems, generating alerts and detailed analysis for potential fraud.</p>
      </Card>
    </div>
  );
};

export default FraudDetection;