// MONEY_TRACK - Crypto Exchanges Module
// This module tracks cryptocurrency exchange activity

import React, { useState } from 'react';
import { Card, Button, Select, Table } from '../../components/ui';

const CryptoExchanges = () => {
  const [activeExchange, setActiveExchange] = useState('binance');
  const [activeCurrency, setActiveCurrency] = useState('BTC-USDT');
  
  const exchanges = [
    { id: 'binance', name: 'Binance' },
    { id: 'coinbase', name: 'Coinbase' },
    { id: 'kraken', name: 'Kraken' },
    { id: 'kucoin', name: 'KuCoin' },
    { id: 'ftx', name: 'FTX' }
  ];
  
  const currencyPairs = [
    { id: 'BTC-USDT', name: 'BTC/USDT' },
    { id: 'ETH-USDT', name: 'ETH/USDT' },
    { id: 'SOL-USDT', name: 'SOL/USDT' },
    { id: 'ADA-USDT', name: 'ADA/USDT' },
    { id: 'XRP-USDT', name: 'XRP/USDT' }
  ];
  
  // Placeholder market data
  const marketData = [
    { 
      exchange: 'Binance',
      pair: 'BTC/USDT',
      price: '$43,215.67',
      volume24h: '$1,432,567,890',
      change24h: '+2.34%',
      marketCap: '$825,678,945,123'
    },
    { 
      exchange: 'Coinbase',
      pair: 'BTC/USD',
      price: '$43,245.21',
      volume24h: '$923,456,789',
      change24h: '+2.41%',
      marketCap: '$825,678,945,123'
    },
    { 
      exchange: 'Kraken',
      pair: 'BTC/USD',
      price: '$43,198.45',
      volume24h: '$734,567,890',
      change24h: '+2.29%',
      marketCap: '$825,678,945,123'
    }
  ];
  
  const handleExchangeChange = (e) => {
    setActiveExchange(e.target.value);
  };
  
  const handleCurrencyChange = (e) => {
    setActiveCurrency(e.target.value);
  };

  return (
    <div className="crypto-exchanges">
      <h1>Cryptocurrency Exchanges</h1>
      
      <Card className="controls-card">
        <div className="control-row">
          <Select
            label="Exchange"
            value={activeExchange}
            onChange={handleExchangeChange}
            options={exchanges.map(exchange => ({
              value: exchange.id,
              label: exchange.name
            }))}
          />
          
          <Select
            label="Currency Pair"
            value={activeCurrency}
            onChange={handleCurrencyChange}
            options={currencyPairs.map(pair => ({
              value: pair.id,
              label: pair.name
            }))}
          />
          
          <Button>
            Refresh Data
          </Button>
        </div>
      </Card>
      
      <div className="data-grid">
        <Card className="market-data-card">
          <h2>Market Overview</h2>
          <Table
            data={marketData}
            columns={[
              { header: 'Exchange', accessor: 'exchange' },
              { header: 'Pair', accessor: 'pair' },
              { header: 'Price', accessor: 'price' },
              { header: '24h Volume', accessor: 'volume24h' },
              { 
                header: '24h Change', 
                accessor: 'change24h',
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
        
        <Card className="exchange-info-card">
          <h2>Exchange Information</h2>
          <div className="exchange-details">
            <div className="detail-row">
              <span className="label">API Status:</span>
              <span className="value status-good">Operational</span>
            </div>
            <div className="detail-row">
              <span className="label">Trading Pairs:</span>
              <span className="value">395</span>
            </div>
            <div className="detail-row">
              <span className="label">24h Volume:</span>
              <span className="value">$12,456,789,012</span>
            </div>
            <div className="detail-row">
              <span className="label">Last Updated:</span>
              <span className="value">A few seconds ago</span>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="implementation-note">
        <h3>Implementation Note</h3>
        <p>This module is currently a placeholder. When fully implemented, it will connect to cryptocurrency exchange APIs to provide real-time market data, order book information, and trading analytics.</p>
      </Card>
    </div>
  );
};

export default CryptoExchanges;