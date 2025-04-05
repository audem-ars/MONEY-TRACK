// MONEY_TRACK - Comprehensive Money Tracking Application
// Main application file that defines the core structure and modules

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

// Core Components
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Placeholder component for modules that aren't implemented yet
const PlaceholderModule = ({ name }) => (
  <div style={{ padding: "2rem" }}>
    <h1>{name} Module</h1>
    <p>This module is under development and will be available soon.</p>
  </div>
);

// Module Registry - All tracking "arms" of the application
const ModuleRegistry = {
  // Blockchain Tracking Modules
  blockchain: {
    path: '/blockchain',
    component: React.lazy(() => import('./modules/blockchain/BlockchainTracker')),
    subModules: {
      public: { 
        path: '/public', 
        component: () => <PlaceholderModule name="Public Blockchains" />
      },
      private: { 
        path: '/private', 
        component: () => <PlaceholderModule name="Private Blockchains" />
      },
      analysis: { 
        path: '/analysis', 
        component: () => <PlaceholderModule name="Blockchain Analysis" />
      }
    }
  },
  
  // Exchange Market Tracking Modules
  exchanges: {
    path: '/exchanges',
    component: () => <PlaceholderModule name="Exchange Tracker" />,
    subModules: {
      crypto: { path: '/crypto', component: () => <PlaceholderModule name="Crypto Exchanges" /> },
      stock: { path: '/stock', component: () => <PlaceholderModule name="Stock Markets" /> },
      forex: { path: '/forex', component: () => <PlaceholderModule name="Forex Markets" /> }
    }
  },
  
  // Banking System Tracking Modules
  banking: {
    path: '/banking',
    component: () => <PlaceholderModule name="Banking Tracker" />,
    subModules: {
      swift: { path: '/swift', component: () => <PlaceholderModule name="Swift Transactions" /> },
      domestic: { path: '/domestic', component: () => <PlaceholderModule name="Domestic Transfers" /> },
      centralBank: { path: '/central', component: () => <PlaceholderModule name="Central Bank Reserves" /> }
    }
  },
  
  // Fintech Payment Platform Tracking Modules
  fintech: {
    path: '/fintech',
    component: () => <PlaceholderModule name="Fintech Tracker" />,
    subModules: {
      payment: { path: '/payment', component: () => <PlaceholderModule name="Payment Platforms" /> },
      bnpl: { path: '/bnpl', component: () => <PlaceholderModule name="BNPL Services" /> }
    }
  },
  
  // User Classification and Filtering Modules
  analytics: {
    path: '/analytics',
    component: () => <PlaceholderModule name="Analytics Hub" />,
    subModules: {
      users: { path: '/users', component: () => <PlaceholderModule name="User Segmentation" /> },
      transactions: { path: '/transactions', component: () => <PlaceholderModule name="Transaction Types" /> },
      fraud: { path: '/fraud', component: () => <PlaceholderModule name="Fraud Detection" /> }
    }
  }
};

// App Component
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <BrowserRouter>
            <div className="app-container">
              <Navigation moduleRegistry={ModuleRegistry} />
              <main className="content">
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Dashboard moduleRegistry={ModuleRegistry} />} />
                    
                    {/* Dynamically generate routes from module registry */}
                    {Object.entries(ModuleRegistry).map(([key, module]) => (
                      <React.Fragment key={key}>
                        <Route path={module.path} element={<module.component />} />
                        
                        {/* Generate sub-module routes */}
                        {Object.entries(module.subModules || {}).map(([subKey, subModule]) => (
                          <Route 
                            key={`${key}-${subKey}`}
                            path={`${module.path}${subModule.path}`}
                            element={<subModule.component />}
                          />
                        ))}
                      </React.Fragment>
                    ))}
                  </Routes>
                </React.Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Export module structure for easy module generation
export { ModuleRegistry };

// Export the App component as default
export default App;