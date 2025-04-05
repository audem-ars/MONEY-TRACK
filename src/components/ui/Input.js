// MONEY_TRACK - Reusable Input Component
// This component renders a styled input element with label

import React from 'react';
import './Input.css';

const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  name,
  required = false,
  disabled = false,
  error = '',
  className = '',
  onBlur,
  onFocus
}) => {
  return (
    <div className={`input-container ${className} ${error ? 'has-error' : ''}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <input
        className="input-element"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        required={required}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;