// MONEY_TRACK - User Segmentation Module
// This module classifies and tracks users based on transaction patterns

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Select, Table } from '../../components/ui';

const UserSegmentation = () => {
  const location = useLocation();
  const [platform, setPlatform] = useState(() => {
    // Try to extract platform from URL query params
    const params = new URLSearchParams(location.search);
    return params.get('source') || 'all';
  });
  
  const [segment, setSegment] = useState('institutional');
  const [sortBy, setSortBy] = useState('volume');
  
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'exchanges', name: 'Exchanges' },
    { id: 'banking', name: 'Banking' },
    { id: 'fintech', name: 'Fintech' }
  ];
  
  const segments = [
    { id: 'institutional', name: 'Institutional' },
    { id: 'large', name: 'Large Players' },
    { id: 'medium', name: 'Medium Players' },
    { id: 'retail', name: 'Retail Users' },
    { id: 'automated', name: 'Automated Systems' }
  ];
  
  const sortOptions = [
    { id: 'volume', name: 'Transaction Volume' },
    { id: 'frequency', name: 'Transaction Frequency' },
    { id: 'balance', name: 'Balance/Holdings' },
    { id: 'growth', name: 'Growth Rate' },
    { id: 'activity', name: 'Recent Activity' }
  ];
  
  // Placeholder user data
  const userData = [
    {
      id: 'user-10001',
      entity: 'BlackRock Digital Assets',
      type: 'Asset Manager',
      volumeLastMonth: '$5.7 billion',
      avgTransactionSize: '$43.5 million',
      avgDailyTransactions: '4.2',
      platforms: 'Blockchain, Exchanges, Banking',
      growthRate: '+8.3%'
    },
    {
      id: 'user-10002',
      entity: 'Grayscale Investments',
      type: 'Asset Manager',
      volumeLastMonth: '$4.3 billion',
      avgTransactionSize: '$37.2 million',
      avgDailyTransactions: '3.7',
      platforms: 'Blockchain, Exchanges',
      growthRate: '+5.1%'
    },
    {
      id: 'user-10003',
      entity: 'Galaxy Digital',
      type: 'Financial Services',
      volumeLastMonth: '$3.9 billion',
      avgTransactionSize: '$28.7 million',
      avgDailyTransactions: '4.3',
      platforms: 'Blockchain, Exchanges, Banking',
      growthRate: '+12.7%'
    },
    {
      id: 'user-10004',
      entity: 'Coinbase Institutional',
      type: 'Exchange/Custody',
      volumeLastMonth: '$3.5 billion',
      avgTransactionSize: '$18.9 million',
      avgDailyTransactions: '6.1',
      platforms: 'Blockchain, Exchanges',
      growthRate: '+3.2%'
    },
    {
      id: 'user-10005',
      entity: 'Jump Trading',
      type: 'Trading Firm',
      volumeLastMonth: '$3.2 billion',
      avgTransactionSize: '$12.8 million',
      avgDailyTransactions: '8.3',
      platforms: 'Blockchain, Exchanges, Banking',
      growthRate: '+7.5%'
    }
  ];
  
  // Placeholder segment distribution
  const segmentDistribution = [
    { segment: 'Institutional', count: 273, volume: '$28.7 billion', share: '42.3%' },
    { segment: 'Large Players', count: 1542, volume: '$19.5 billion', share: '28.7%' },
    { segment: 'Medium Players', count: 8764, volume: '$12.8 billion', share: '18.9%' },
    { segment: 'Retail Users', count: 427319, volume: '$6.2 billion', share: '9.1%' },
    { segment: 'Automated Systems', count: 342, volume: '$0.7 billion', share: '1.0%' }
  ];
  
  // Placeholder geographic distribution
  const geographicDistribution = [
    { region: 'North America', entities: '147K', volume: '$29.5 billion', share: '43.4%' },
    { region: 'Europe', entities: '128K', volume: '$21.2 billion', share: '31.2%' },
    { region: 'Asia Pacific', entities: '104K', volume: '$13.4 billion', share: '19.7%' },
    { region: 'Middle East', entities: '17K', volume: '$2.1 billion', share: '3.1%' },
    { region: 'Latin America', entities: '12K', volume: '$1.2 billion', share: '1.8%' },
    { region: 'Africa', entities: '5K', volume: '$0.6 billion', share: '0.8%' }
  ];
  
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };
  
  const handleSegmentChange = (e) => {
    setSegment(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="user-segmentation">
      <h1>User Segmentation & Classification</h1>
      
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
            label="User Segment"
            value={segment}
            onChange={handleSegmentChange}
            options={segments.map(s => ({
              value: s.id,
              label: s.name
            }))}
          />
          
          <Select
            label="Sort By"
            value={sortBy}
            onChange={handleSortChange}
            options={sortOptions.map(s => ({
              value: s.id,
              label: s.name
            }))}
          />
          
          <Button>
            Apply Filters
          </Button>
        </div>
      </Card>
      
      <div className="data-grid">
        <Card className="segment-overview">
          <h2>Institutional Users Overview</h2>
          <div className="segment-info">
            <div className="info-section">
              <h3>Segment Statistics</h3>
              <div className="stat-row">
                <span className="stat-label">Number of Entities:</span>
                <span className="stat-value">273</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Monthly Volume:</span>
                <span className="stat-value">$28.7 billion</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Average Transaction Size:</span>
                <span className="stat-value">$22.4 million</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Growth Rate (YoY):</span>
                <span className="stat-value positive">+11.3%</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3>Entity Types</h3>
              <div className="entity-distribution">
                <div className="entity-item">
                  <span className="entity-name">Asset Managers</span>
                  <div className="entity-bar">
                    <div className="entity-fill" style={{ width: '38%' }}></div>
                  </div>
                  <span className="entity-value">38%</span>
                </div>
                <div className="entity-item">
                  <span className="entity-name">Trading Firms</span>
                  <div className="entity-bar">
                    <div className="entity-fill" style={{ width: '27%' }}></div>
                  </div>
                  <span className="entity-value">27%</span>
                </div>
                <div className="entity-item">
                  <span className="entity-name">Banks & Financial Services</span>
                  <div className="entity-bar">
                    <div className="entity-fill" style={{ width: '21%' }}></div>
                  </div>
                  <span className="entity-value">21%</span>
                </div>
                <div className="entity-item">
                  <span className="entity-name">Corporations</span>
                  <div className="entity-bar">
                    <div className="entity-fill" style={{ width: '14%' }}></div>
                  </div>
                  <span className="entity-value">14%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chart-placeholder">
            Chart: Institutional Transaction Volume (Monthly, Last 12 Months)
          </div>
        </Card>
        
        <Card className="segment-distribution">
          <h2>User Segment Distribution</h2>
          <Table
            data={segmentDistribution}
            columns={[
              { header: 'Segment', accessor: 'segment' },
              { header: 'Entity Count', accessor: 'count' },
              { header: 'Monthly Volume', accessor: 'volume' },
              { header: 'Volume Share', accessor: 'share' }
            ]}
          />
        </Card>
      </div>
      
      <Card className="top-entities">
        <h2>Top Institutional Users</h2>
        <Table
          data={userData}
          columns={[
            { header: 'Entity Name', accessor: 'entity' },
            { header: 'Type', accessor: 'type' },
            { header: 'Monthly Volume', accessor: 'volumeLastMonth' },
            { header: 'Avg. Transaction', accessor: 'avgTransactionSize' },
            { header: 'Daily Transactions', accessor: 'avgDailyTransactions' },
            { header: 'Platforms', accessor: 'platforms' },
            { 
              header: 'Growth Rate', 
              accessor: 'growthRate',
              render: (value) => (
                <span className={value.startsWith('+') ? 'positive' : 'negative'}>
                  {value}
                </span>
              )
            }
          ]}
        />
      </Card>
      
      <Card className="geographic-distribution">
        <h2>Geographic Distribution</h2>
        <div className="chart-placeholder" style={{ height: '300px' }}>
          World Map: User Distribution by Region
        </div>
        
        <Table
          data={geographicDistribution}
          columns={[
            { header: 'Region', accessor: 'region' },
            { header: 'Entities', accessor: 'entities' },
            { header: 'Volume', accessor: 'volume' },
            { header: 'Share', accessor: 'share' }
          ]}
        />
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide advanced user segmentation, classification, and profiling based on transaction patterns across all tracked platforms.</p>
      </Card>
    </div>
  );
};

export default UserSegmentation;