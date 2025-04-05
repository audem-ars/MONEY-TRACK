import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div 
      className={`pb-2 mb-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h2 
      className={`text-xl font-semibold text-gray-800 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div 
      className={`pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;