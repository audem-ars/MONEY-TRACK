// MONEY_TRACK - Stock Markets Module
// This module tracks stock market activity

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const StockMarkets = () => {
  const [activeMarket, setActiveMarket] = useState('nyse');
  const [activeSector, setActiveSector] = useState('technology');
  
  const markets = [
    { id: 'nyse', name: 'NYSE' },
    { id: 'nasdaq', name: 'NASDAQ' },
    { id: 'lse', name: 'London Stock Exchange' },
    { id: 'tse', name: 'Tokyo Stock Exchange' },
    { id: 'sse', name: 'Shanghai Stock Exchange' }
  ];
  
  const sectors = [
    { id: 'technology', name: 'Technology' },
    { id: 'finance', name: 'Finance' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'energy', name: 'Energy' },
    { id: 'consumer', name: 'Consumer Goods' }
  ];
  
  // Placeholder market data
  const stockData = [
    { 
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '$182.63',
      volume: '72.4M',
      change: '+1.23%',
      marketCap: '$2.87T'
    },
    { 
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: '$415.32',
      volume: '23.6M',
      change: '+0.85%',
      marketCap: '$3.09T'
    },
    { 
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: '$165.78',
      volume: '18.2M',
      change: '-0.32%',
      marketCap: '$2.08T'
    },
    { 
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: '$178.35',
      volume: '31.9M',
      change: '+1.45%',
      marketCap: '$1.86T'
    },
    { 
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: '$485.92',
      volume: '15.7M',
      change: '+2.13%',
      marketCap: '$1.24T'
    }
  ];
  
  const handleMarketChange = (e) => {
    setActiveMarket(e.target.value);
  };
  
  const handleSectorChange = (e) => {
    setActiveSector(e.target.value);
  };

  return (
    <div className="stock-markets">
      <h1>Stock Markets</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Market"
            value={activeMarket}
            onChange={handleMarketChange}
            options={markets.map(market => ({
              value: market.id,
              label: market.name
            }))}
          />
          
          <Select
            label="Sector"
            value={activeSector}
            onChange={handleSectorChange}
            options={sectors.map(sector => ({
              value: sector.id,
              label: sector.name
            }))}
          />
          
          <Button>
            Refresh Data
          </Button>
        </div>
      </Card>
      
      <Card className="market-summary">
        <h2>Market Summary</h2>
        <div className="market-indicators">
          <div className="indicator">
            <span className="indicator-label">S&P 500</span>
            <span className="indicator-value">5,234.56</span>
            <span className="indicator-change positive">+34.56 (+0.67%)</span>
          </div>
          <div className="indicator">
            <span className="indicator-label">Dow Jones</span>
            <span className="indicator-value">38,765.32</span>
            <span className="indicator-change positive">+123.45 (+0.32%)</span>
          </div>
          <div className="indicator">
            <span className="indicator-label">NASDAQ</span>
            <span className="indicator-value">16,543.21</span>
            <span className="indicator-change positive">+78.91 (+0.48%)</span>
          </div>
          <div className="indicator">
            <span className="indicator-label">VIX</span>
            <span className="indicator-value">15.32</span>
            <span className="indicator-change negative">-0.87 (-5.37%)</span>
          </div>
        </div>
      </Card>
      
      <Card className="stocks-card">
        <h2>Top Technology Stocks on NYSE</h2>
        <Table
          data={stockData}
          columns={[
            { header: 'Symbol', accessor: 'symbol' },
            { header: 'Name', accessor: 'name' },
            { header: 'Price', accessor: 'price' },
            { header: 'Volume', accessor: 'volume' },
            { 
              header: 'Change', 
              accessor: 'change',
              render: (value) => (
                <span style={{ 
                  color: value.startsWith('+') ? 'green' : 'red' 
                }}>
                  {value}
                </span>
              )
            },
            { header: 'Market Cap', accessor: 'marketCap' }
          ]}
        />
      </Card>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to stock market data providers to offer real-time quotes, historical data, institutional holdings information, and SEC filings analysis.</p>
      </Card>
    </div>
  );
};

export default StockMarkets;