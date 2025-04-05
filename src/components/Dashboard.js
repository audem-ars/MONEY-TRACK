// MONEY_TRACK - Dashboard Component
// This component renders the main dashboard with summaries from all modules

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components/ui';
import './Dashboard.css';

const Dashboard = ({ moduleRegistry }) => {
  const navigate = useNavigate();
  const { user = { username: 'User' } } = useAuth();
  const { 
    trackedAddresses = {}, 
    privateNetworks = [], 
    lastUpdated = {} 
  } = useData();
  
  const [summaryData, setSummaryData] = useState({
    totalAssetsTracked: 0,
    recentActivity: [],
    alerts: []
  });
  
  // Calculate summary data on component mount
  useEffect(() => {
    // Calculate total tracked addresses across all blockchains
    const addressCount = Object.values(trackedAddresses)
      .reduce((sum, addresses = []) => sum + addresses.length, 0);
      
    // Total number of private networks
    const networkCount = privateNetworks.length;
    
    // Total assets tracked
    const totalAssetsTracked = addressCount + networkCount;
    
    // Mock recent activity (would be pulled from actual data in production)
    const recentActivity = [
      { 
        id: 'activity-1', 
        type: 'transaction', 
        description: 'Large ETH transfer detected',
        value: '45.23 ETH',
        time: '10 minutes ago',
        source: 'ethereum'
      },
      { 
        id: 'activity-2', 
        type: 'alert', 
        description: 'Unusual activity on BTC address',
        value: '2.5 BTC',
        time: '1 hour ago',
        source: 'bitcoin'
      },
      { 
        id: 'activity-3', 
        type: 'system', 
        description: 'Added new tracked address',
        value: '',
        time: '3 hours ago',
        source: 'system'
      }
    ];
    
    // Mock alerts (would be generated from analysis in production)
    const alerts = [
      {
        id: 'alert-1',
        level: 'high',
        description: 'Significant wallet drain detected',
        source: 'blockchain',
        time: '45 minutes ago'
      },
      {
        id: 'alert-2',
        level: 'medium',
        description: 'Unusual exchange activity',
        source: 'exchanges',
        time: '2 hours ago'
      }
    ];
    
    setSummaryData({
      totalAssetsTracked,
      recentActivity,
      alerts
    });
  }, [trackedAddresses, privateNetworks]);
  
  // Navigate to a module
  const navigateToModule = (path) => {
    navigate(path);
  };
  
  // Format last updated time
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const lastUpdated = new Date(timestamp);
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="welcome-message">
          Welcome back, <span className="user-name">{user?.username || 'User'}</span>
        </div>
      </div>
      
      <div className="dashboard-summary">
        <Card className="summary-card">
          <h2>Assets Tracked</h2>
          <div className="summary-value">{summaryData.totalAssetsTracked}</div>
          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Blockchain Addresses:</span>
              <span className="detail-value">
                {Object.values(trackedAddresses)
                  .reduce((sum, addresses = []) => sum + addresses.length, 0)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Private Networks:</span>
              <span className="detail-value">{privateNetworks.length}</span>
            </div>
          </div>
        </Card>
        
        <Card className="alert-card">
          <h2>Active Alerts</h2>
          {summaryData.alerts.length > 0 ? (
            <ul className="alert-list">
              {summaryData.alerts.map(alert => (
                <li key={alert.id} className={`alert-item alert-${alert.level}`}>
                  <div className="alert-indicator"></div>
                  <div className="alert-content">
                    <div className="alert-description">{alert.description}</div>
                    <div className="alert-meta">
                      <span className="alert-source">{alert.source}</span>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">No active alerts</div>
          )}
        </Card>
      </div>
      
      <div className="module-grid">
        {Object.entries(moduleRegistry).map(([key, module]) => (
          <Card 
            key={key} 
            className="module-card"
            onClick={() => navigateToModule(module.path)}
          >
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <div className="module-meta">
              <div className="last-updated">
                Last updated: {formatLastUpdated(lastUpdated[key])}
              </div>
            </div>
            <div className="module-actions">
              <Button 
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToModule(module.path);
                }}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {summaryData.recentActivity.length > 0 ? (
          <ul className="activity-list">
            {summaryData.recentActivity.map(activity => (
              <li key={activity.id} className={`activity-item activity-${activity.type}`}>
                <div className="activity-icon"></div>
                <div className="activity-content">
                  <div className="activity-description">{activity.description}</div>
                  {activity.value && (
                    <div className="activity-value">{activity.value}</div>
                  )}
                  <div className="activity-meta">
                    <span className="activity-source">{activity.source}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;