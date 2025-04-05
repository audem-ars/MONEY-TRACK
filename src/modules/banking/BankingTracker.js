// MONEY_TRACK - Banking System Tracker Module
// This module tracks banking system activity

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Select } from '../../components/ui';

const BankingTracker = () => {
  const navigate = useNavigate();
  const [activeSystem, setActiveSystem] = useState('swift');
  
  const bankingSystems = [
    { id: 'swift', name: 'SWIFT & Cross-Border' },
    { id: 'domestic', name: 'Domestic Transfers' },
    { id: 'central', name: 'Central Bank Reserves' }
  ];
  
  const handleSystemChange = (e) => {
    setActiveSystem(e.target.value);
  };

  const navigateToSubmodule = (path) => {
    navigate(`/banking${path}`);
  };

  return (
    <div className="banking-tracker">
      <h1>Banking System Tracker</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Banking System"
            value={activeSystem}
            onChange={handleSystemChange}
            options={bankingSystems.map(system => ({
              value: system.id,
              label: system.name
            }))}
          />
          
          <Button 
            onClick={() => navigateToSubmodule(`/${activeSystem}`)}
          >
            View Details
          </Button>
        </div>
      </Card>
      
      <div className="banking-summary">
        <Card className="summary-card">
          <h2>Banking Systems Overview</h2>
          <p>This module allows you to track money flows through various banking systems:</p>
          
          <ul className="feature-list">
            <li>
              <strong>SWIFT & Cross-Border Transactions</strong>
              <p>Monitor international wire transfers, settlement times, and cross-border money flows between financial institutions.</p>
              <Button onClick={() => navigateToSubmodule('/swift')}>
                Go to SWIFT Tracking
              </Button>
            </li>
            
            <li>
              <strong>Domestic Payment Systems</strong>
              <p>Track ACH, Fedwire, CHAPS, SEPA, and other domestic payment networks for interbank transfers and settlements.</p>
              <Button onClick={() => navigateToSubmodule('/domestic')}>
                Go to Domestic Systems
              </Button>
            </li>
            
            <li>
              <strong>Central Bank Reserves</strong>
              <p>Monitor monetary base changes, treasury transactions, and central bank balance sheets across major economies.</p>
              <Button onClick={() => navigateToSubmodule('/central')}>
                Go to Central Bank Data
              </Button>
            </li>
          </ul>
        </Card>
      </div>
      
      <Card className="banking-metrics">
        <h2>Key Banking Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Daily SWIFT Messages</h3>
            <div className="metric-value">42.3 million</div>
            <div className="metric-change positive">+3.2% vs. last month</div>
          </div>
          
          <div className="metric-card">
            <h3>Average Settlement Time</h3>
            <div className="metric-value">1.8 days</div>
            <div className="metric-change negative">+0.3 days vs. last month</div>
          </div>
          
          <div className="metric-card">
            <h3>Global Correspondent Banking</h3>
            <div className="metric-value">$4.3 trillion daily</div>
            <div className="metric-change positive">+$120B vs. last month</div>
          </div>
          
          <div className="metric-card">
            <h3>Fed Balance Sheet</h3>
            <div className="metric-value">$7.8 trillion</div>
            <div className="metric-change negative">-2.1% vs. last month</div>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to various banking data sources to provide insights into global money flows through banking systems.</p>
      </Card>
    </div>
  );
};

export default BankingTracker;