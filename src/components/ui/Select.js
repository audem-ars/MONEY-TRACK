import React from 'react';

export function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  required = false,
  error = null,
  label = null,
  id = `select-${Math.random().toString(36).substr(2, 9)}`,
  ...props
}) {
  const selectClasses = `
    block w-full px-4 py-2 mt-1
    border border-gray-300 dark:border-gray-600
    rounded-md shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export default Select;