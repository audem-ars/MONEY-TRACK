// MONEY_TRACK - Analytics Hub Module
// This module provides centralized analytics and insights across all tracked systems

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Select } from '../../components/ui';

const AnalyticsHub = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('users');
  
  const analyticsCategories = [
    { id: 'users', name: 'User Segmentation' },
    { id: 'transactions', name: 'Transaction Types' },
    { id: 'fraud', name: 'Fraud Detection' }
  ];
  
  const handleCategoryChange = (e) => {
    setActiveCategory(e.target.value);
  };

  const navigateToSubmodule = (path) => {
    navigate(`/analytics${path}`);
  };

  return (
    <div className="analytics-hub">
      <h1>Analytics Hub</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Analytics Category"
            value={activeCategory}
            onChange={handleCategoryChange}
            options={analyticsCategories.map(category => ({
              value: category.id,
              label: category.name
            }))}
          />
          
          <Button 
            onClick={() => navigateToSubmodule(`/${activeCategory}`)}
          >
            View Detailed Analysis
          </Button>
        </div>
      </Card>
      
      <div className="analytics-summary">
        <Card className="summary-card">
          <h2>Analytics & User Classification</h2>
          <p>This module provides advanced analytics and insights across all money tracking systems:</p>
          
          <ul className="feature-list">
            <li>
              <strong>User Segmentation</strong>
              <p>Classify and track users from large institutional players to individual traders based on transaction patterns, volume, and frequency.</p>
              <Button onClick={() => navigateToSubmodule('/users')}>
                Go to User Segmentation
              </Button>
            </li>
            
            <li>
              <strong>Transaction Types</strong>
              <p>Analyze transaction types including spot trades, futures, options, swaps, OTC trades, and settlements across various platforms.</p>
              <Button onClick={() => navigateToSubmodule('/transactions')}>
                Go to Transaction Types
              </Button>
            </li>
            
            <li>
              <strong>Fraud Detection</strong>
              <p>Monitor for potential fraudulent activities including rapid fund movements, layering techniques, wash trading, and other suspicious patterns.</p>
              <Button onClick={() => navigateToSubmodule('/fraud')}>
                Go to Fraud Detection
              </Button>
            </li>
          </ul>
        </Card>
      </div>
      
      <div className="dashboard-grid">
        <Card className="global-insights">
          <h2>Cross-Platform Insights</h2>
          <div className="insights-content">
            <div className="chart-placeholder">
              Chart: Global Money Flow Sankey Diagram
            </div>
            <p>This visualization maps money flows between different platforms and systems, showing how funds move from exchanges to banks, payment platforms, and blockchain networks.</p>
          </div>
        </Card>
        
        <Card className="analytics-metrics">
          <h2>Key Analytics Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Total Tracked Volume</h3>
              <div className="metric-value">$12.8 trillion</div>
              <div className="metric-source">Across all platforms</div>
            </div>
            
            <div className="metric-card">
              <h3>Tracked Entities</h3>
              <div className="metric-value">437,892</div>
              <div className="metric-source">Users, addresses & institutions</div>
            </div>
            
            <div className="metric-card">
              <h3>Daily Transactions</h3>
              <div className="metric-value">96.4 million</div>
              <div className="metric-source">Across all systems</div>
            </div>
            
            <div className="metric-card">
              <h3>Fraud Alerts</h3>
              <div className="metric-value">327</div>
              <div className="metric-change negative">+18% vs. last month</div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="recent-analytics">
        <h2>Recent Analytics Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-item">
            <h3>Large Institutional Movement</h3>
            <p>Detected $1.2B movement from centralized exchanges to self-custody wallets by institutional players over the past 72 hours, potentially indicating a shift to long-term holding strategy.</p>
            <div className="highlight-meta">
              <span className="highlight-source">Source: Blockchain Analysis</span>
              <span className="highlight-time">2 hours ago</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <h3>Cross-Border Payment Surge</h3>
            <p>SWIFT transactions between East Asian banks and European financial institutions have increased by 37% compared to the monthly average, primarily in EUR/USD pairs.</p>
            <div className="highlight-meta">
              <span className="highlight-source">Source: Banking Systems</span>
              <span className="highlight-time">6 hours ago</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <h3>Payment Processor Trend</h3>
            <p>Stripe and Adyen are gaining market share in e-commerce payment processing, with combined transaction volume up 14.3% QoQ while traditional processor volume remains flat.</p>
            <div className="highlight-meta">
              <span className="highlight-source">Source: Fintech Analysis</span>
              <span className="highlight-time">1 day ago</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <h3>Potential Wash Trading Alert</h3>
            <p>Detected circular trading patterns on multiple exchange platforms involving $43M in assets, potentially indicating market manipulation attempts.</p>
            <div className="highlight-meta">
              <span className="highlight-source">Source: Fraud Detection</span>
              <span className="highlight-time">1 day ago</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will provide comprehensive analytics across all money tracking systems, using advanced algorithms to identify patterns, segment users, classify transactions, and detect potential fraud.</p>
      </Card>
    </div>
  );
};

export default AnalyticsHub;