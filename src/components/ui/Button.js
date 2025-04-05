import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  ...props 
}) {
  // Define variant styles
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
  };

  // Define size styles
  const sizeStyles = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  // Combine all styles
  const buttonStyles = `
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    rounded font-medium transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;