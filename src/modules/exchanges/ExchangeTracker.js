// MONEY_TRACK - Exchange Market Tracker Module
// This module tracks and analyzes cryptocurrency, stock, and forex markets

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Select } from '../../components/ui';

const ExchangeTracker = () => {
  const navigate = useNavigate();
  const [activeExchangeType, setActiveExchangeType] = useState('crypto');
  
  const exchangeTypes = [
    { id: 'crypto', name: 'Cryptocurrency Exchanges' },
    { id: 'stock', name: 'Stock Markets' },
    { id: 'forex', name: 'Forex Markets' }
  ];
  
  const handleExchangeTypeChange = (e) => {
    setActiveExchangeType(e.target.value);
  };

  const navigateToSubmodule = (path) => {
    navigate(`/exchanges${path}`);
  };

  return (
    <div className="exchange-tracker">
      <h1>Exchange Market Tracker</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Exchange Type"
            value={activeExchangeType}
            onChange={handleExchangeTypeChange}
            options={exchangeTypes.map(type => ({
              value: type.id,
              label: type.name
            }))}
          />
          
          <Button 
            onClick={() => navigateToSubmodule(`/${activeExchangeType}`)}
          >
            View Details
          </Button>
        </div>
      </Card>
      
      <div className="exchange-summary">
        <Card className="summary-card">
          <h2>Exchange Markets Overview</h2>
          <p>This module allows you to track activity across various exchange markets:</p>
          
          <ul className="feature-list">
            <li>
              <strong>Cryptocurrency Exchanges</strong>
              <p>Monitor trading volumes, liquidity, whale movements, and market depth across major crypto exchanges.</p>
              <Button onClick={() => navigateToSubmodule('/crypto')}>
                Go to Crypto Exchanges
              </Button>
            </li>
            
            <li>
              <strong>Stock Markets</strong>
              <p>Track equity markets, institutional holdings, dark pools, and high-frequency trading activities.</p>
              <Button onClick={() => navigateToSubmodule('/stock')}>
                Go to Stock Markets
              </Button>
            </li>
            
            <li>
              <strong>Forex Markets</strong>
              <p>Follow currency pair movements, central bank interventions, and cross-border capital flows.</p>
              <Button onClick={() => navigateToSubmodule('/forex')}>
                Go to Forex Markets
              </Button>
            </li>
          </ul>
        </Card>
      </div>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to various exchange APIs to provide real-time data, analytics, and tracking capabilities.</p>
      </Card>
    </div>
  );
};

export default ExchangeTracker;