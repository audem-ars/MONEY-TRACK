// MONEY_TRACK - Application Entry Point
// This file bootstraps the React application

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/variables.css';

// Use createRoot API for React 18
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);