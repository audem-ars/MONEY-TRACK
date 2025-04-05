// MONEY_TRACK - Navigation Component
// This component renders the main navigation menu

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Navigation.css';
import { THEMES } from '../contexts/ThemeContext';

const Navigation = ({ moduleRegistry }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="brand-link" onClick={closeMenu}>
            <span className="brand-icon">💰</span>
            <span className="brand-name">MONEY_TRACK</span>
          </NavLink>
          
          <button 
            className={`menu-toggle ${menuOpen ? 'menu-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
          </button>
        </div>
        
        <div className={`nav-content ${menuOpen ? 'menu-open' : ''}`}>
          {isAuthenticated && (
            <ul className="nav-links">
              {/* Generate main nav links from module registry */}
              {Object.entries(moduleRegistry).map(([key, module]) => (
                <li key={key} className="nav-item">
                  <NavLink 
                    to={module.path}
                    className={({ isActive }) => isActive || location.pathname.startsWith(module.path) ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </NavLink>
                  
                  {/* Display submenu if the parent is active */}
                  {(location.pathname === module.path || location.pathname.startsWith(module.path + '/')) && 
                   module.subModules && Object.keys(module.subModules).length > 0 && (
                    <ul className="sub-menu">
                      {Object.entries(module.subModules).map(([subKey, subModule]) => (
                        <li key={`${key}-${subKey}`} className="sub-menu-item">
                          <NavLink 
                            to={`${module.path}${subModule.path}`}
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={closeMenu}
                          >
                            {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === THEMES.LIGHT ? '🌙' : theme === THEMES.DARK ? '☀️' : '🌓'}
            </button>
            
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-name">{user?.username || 'User'}</span>
                  <span className="user-role">{user?.role || 'Guest'}</span>
                </div>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="login-btn" onClick={closeMenu}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;