// MONEY_TRACK - Reusable Table Component
// This component renders a data table with customizable columns

import React from 'react';
import './Table.css';

const Table = ({ data, columns, onRowClick, className = '' }) => {
  if (!data || !columns || data.length === 0) {
    return (
      <div className="table-empty">
        No data available
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className || ''}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column, colIndex) => {
                const cellValue = column.accessor ? 
                  (typeof column.accessor === 'function' ? 
                    column.accessor(row) : 
                    row[column.accessor]) : 
                  null;
                
                return (
                  <td key={colIndex} className={column.cellClassName || ''}>
                    {column.render ? 
                      column.render(cellValue, row, rowIndex) : 
                      cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;