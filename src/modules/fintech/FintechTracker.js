// MONEY_TRACK - Fintech Tracker Module
// This module tracks payment platforms and fintech companies

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Select } from '../../components/ui';

const FintechTracker = () => {
  const navigate = useNavigate();
  const [activeSystem, setActiveSystem] = useState('payment');
  
  const fintechSystems = [
    { id: 'payment', name: 'Payment Platforms' },
    { id: 'bnpl', name: 'Buy Now Pay Later Services' }
  ];
  
  const handleSystemChange = (e) => {
    setActiveSystem(e.target.value);
  };

  const navigateToSubmodule = (path) => {
    navigate(`/fintech${path}`);
  };

  return (
    <div className="fintech-tracker">
      <h1>Fintech Payment Platforms</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Fintech Category"
            value={activeSystem}
            onChange={handleSystemChange}
            options={fintechSystems.map(system => ({
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
      
      <div className="fintech-summary">
        <Card className="summary-card">
          <h2>Fintech Platforms Overview</h2>
          <p>This module monitors financial technology platforms that process payments and offer financial services:</p>
          
          <ul className="feature-list">
            <li>
              <strong>Payment Platforms</strong>
              <p>Track transaction volumes, settlement rates, and money flows across major payment processors like PayPal, Stripe, Square, and others.</p>
              <Button onClick={() => navigateToSubmodule('/payment')}>
                Go to Payment Platforms
              </Button>
            </li>
            
            <li>
              <strong>Buy Now Pay Later (BNPL) Services</strong>
              <p>Monitor BNPL providers like Affirm, Klarna, and Afterpay, tracking installment payment flows and consumer credit trends.</p>
              <Button onClick={() => navigateToSubmodule('/bnpl')}>
                Go to BNPL Services
              </Button>
            </li>
          </ul>
        </Card>
      </div>
      
      <Card className="fintech-metrics">
        <h2>Global Fintech Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Payment Processing Volume</h3>
            <div className="metric-value">$12.8 trillion</div>
            <div className="metric-change positive">+14.3% YoY</div>
          </div>
          
          <div className="metric-card">
            <h3>Digital Wallet Users</h3>
            <div className="metric-value">4.4 billion</div>
            <div className="metric-change positive">+12.7% YoY</div>
          </div>
          
          <div className="metric-card">
            <h3>BNPL Market Size</h3>
            <div className="metric-value">$157 billion</div>
            <div className="metric-change positive">+25.5% YoY</div>
          </div>
          
          <div className="metric-card">
            <h3>Cross-Border Payments</h3>
            <div className="metric-value">$156 trillion</div>
            <div className="metric-change positive">+8.9% YoY</div>
          </div>
        </div>
      </Card>
      
      <Card className="fintech-trends">
        <h2>Market Trends & Analysis</h2>
        <div className="trends-grid">
          <div className="trend-item">
            <h3>Digital Payment Adoption</h3>
            <div className="trend-chart">
              <div className="chart-placeholder">Chart: Digital Payment Adoption by Region</div>
            </div>
            <p>Digital payment adoption continues to accelerate globally, with Asia Pacific leading growth at 26.2% annually. Mobile payment users now exceed 2.7 billion worldwide.</p>
          </div>
          
          <div className="trend-item">
            <h3>Real-Time Payment Growth</h3>
            <div className="trend-chart">
              <div className="chart-placeholder">Chart: Real-Time Payment Transaction Growth</div>
            </div>
            <p>Real-time payment systems processed over 195 billion transactions globally in 2023, with India's UPI leading at 73 billion transactions annually.</p>
          </div>
        </div>
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to fintech platform APIs to track payment processing, settlement times, transaction volumes, and other key metrics across the global fintech ecosystem.</p>
      </Card>
    </div>
  );
};

export default FintechTracker;