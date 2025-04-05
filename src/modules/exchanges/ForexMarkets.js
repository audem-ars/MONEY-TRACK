// MONEY_TRACK - Forex Markets Module
// This module tracks foreign exchange market activity

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const ForexMarkets = () => {
  const [activeCurrency, setActiveCurrency] = useState('USD');
  const [timeframe, setTimeframe] = useState('daily');
  
  const currencies = [
    { id: 'USD', name: 'US Dollar (USD)' },
    { id: 'EUR', name: 'Euro (EUR)' },
    { id: 'GBP', name: 'British Pound (GBP)' },
    { id: 'JPY', name: 'Japanese Yen (JPY)' },
    { id: 'CHF', name: 'Swiss Franc (CHF)' },
    { id: 'AUD', name: 'Australian Dollar (AUD)' },
    { id: 'CAD', name: 'Canadian Dollar (CAD)' }
  ];
  
  const timeframes = [
    { id: 'hourly', name: 'Hourly' },
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' }
  ];
  
  // Placeholder forex data
  const forexData = [
    { 
      pair: 'EUR/USD',
      rate: '1.0876',
      dailyChange: '+0.0023 (+0.21%)',
      weeklyChange: '-0.0045 (-0.41%)',
      monthlyChange: '+0.0132 (+1.23%)',
      yearlyChange: '-0.0342 (-3.05%)'
    },
    { 
      pair: 'GBP/USD',
      rate: '1.2745',
      dailyChange: '+0.0034 (+0.27%)',
      weeklyChange: '+0.0123 (+0.97%)',
      monthlyChange: '+0.0245 (+1.96%)',
      yearlyChange: '-0.0165 (-1.28%)'
    },
    { 
      pair: 'USD/JPY',
      rate: '151.34',
      dailyChange: '-0.43 (-0.28%)',
      weeklyChange: '+1.23 (+0.82%)',
      monthlyChange: '+3.45 (+2.33%)',
      yearlyChange: '+10.56 (+7.50%)'
    },
    { 
      pair: 'USD/CHF',
      rate: '0.8976',
      dailyChange: '-0.0045 (-0.50%)',
      weeklyChange: '-0.0087 (-0.96%)',
      monthlyChange: '-0.0134 (-1.47%)',
      yearlyChange: '+0.0231 (+2.64%)'
    },
    { 
      pair: 'AUD/USD',
      rate: '0.6587',
      dailyChange: '+0.0023 (+0.35%)',
      weeklyChange: '-0.0045 (-0.68%)',
      monthlyChange: '-0.0087 (-1.31%)',
      yearlyChange: '-0.0231 (-3.39%)'
    },
    { 
      pair: 'USD/CAD',
      rate: '1.3564',
      dailyChange: '-0.0036 (-0.27%)',
      weeklyChange: '+0.0087 (+0.65%)',
      monthlyChange: '+0.0213 (+1.59%)',
      yearlyChange: '+0.0456 (+3.48%)'
    }
  ];
  
  const handleCurrencyChange = (e) => {
    setActiveCurrency(e.target.value);
  };
  
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="forex-markets">
      <h1>Forex Markets</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Base Currency"
            value={activeCurrency}
            onChange={handleCurrencyChange}
            options={currencies.map(currency => ({
              value: currency.id,
              label: currency.name
            }))}
          />
          
          <Select
            label="Timeframe"
            value={timeframe}
            onChange={handleTimeframeChange}
            options={timeframes.map(tf => ({
              value: tf.id,
              label: tf.name
            }))}
          />
          
          <Button>
            Refresh Data
          </Button>
        </div>
      </Card>
      
      <div className="data-grid">
        <Card className="forex-data-card">
          <h2>Currency Exchange Rates</h2>
          <Table
            data={forexData}
            columns={[
              { header: 'Currency Pair', accessor: 'pair' },
              { header: 'Exchange Rate', accessor: 'rate' },
              { 
                header: 'Daily Change', 
                accessor: 'dailyChange',
                render: (value) => (
                  <span style={{ 
                    color: value.includes('+') ? 'green' : 'red' 
                  }}>
                    {value}
                  </span>
                )
              },
              { 
                header: 'Weekly Change', 
                accessor: 'weeklyChange',
                render: (value) => (
                  <span style={{ 
                    color: value.includes('+') ? 'green' : 'red' 
                  }}>
                    {value}
                  </span>
                )
              },
              { 
                header: 'Monthly Change', 
                accessor: 'monthlyChange',
                render: (value) => (
                  <span style={{ 
                    color: value.includes('+') ? 'green' : 'red' 
                  }}>
                    {value}
                  </span>
                )
              }
            ]}
          />
        </Card>
        
        <Card className="market-info">
          <h2>Forex Market Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>Market Hours</h3>
              <p>The foreign exchange market operates 24 hours a day, five days a week, across major financial centers worldwide.</p>
              <div className="session-status">
                <div className="session">
                  <span className="session-name">Sydney:</span>
                  <span className="session-hours">8:00 AM - 5:00 PM AEST</span>
                  <span className="status open">Open</span>
                </div>
                <div className="session">
                  <span className="session-name">Tokyo:</span>
                  <span className="session-hours">9:00 AM - 6:00 PM JST</span>
                  <span className="status open">Open</span>
                </div>
                <div className="session">
                  <span className="session-name">London:</span>
                  <span className="session-hours">8:00 AM - 4:00 PM GMT</span>
                  <span className="status closed">Closed</span>
                </div>
                <div className="session">
                  <span className="session-name">New York:</span>
                  <span className="session-hours">8:00 AM - 5:00 PM EST</span>
                  <span className="status closed">Closed</span>
                </div>
              </div>
            </div>
            
            <div className="info-item">
              <h3>Major Economic Indicators</h3>
              <div className="indicator-list">
                <div className="indicator">
                  <span className="indicator-name">US Non-Farm Payrolls:</span>
                  <span className="indicator-value">Next release in 5 days</span>
                </div>
                <div className="indicator">
                  <span className="indicator-name">ECB Interest Rate Decision:</span>
                  <span className="indicator-value">Next release in 12 days</span>
                </div>
                <div className="indicator">
                  <span className="indicator-name">UK CPI:</span>
                  <span className="indicator-value">Released yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to forex data providers to offer real-time exchange rates, historical data, central bank announcements, and economic indicators that affect currency values.</p>
      </Card>
    </div>
  );
};

export default ForexMarkets;