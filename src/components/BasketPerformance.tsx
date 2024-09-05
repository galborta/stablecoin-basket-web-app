import React from 'react';
import { PerformanceData } from '../types';
import { formatCurrency, calculateTotalValue } from '../utils/helpers';
import './BasketPerformance.css';

interface BasketPerformanceProps {
  allocations: PerformanceData[];
}

const BasketPerformance: React.FC<BasketPerformanceProps> = ({ allocations }) => {
  const totalValue = calculateTotalValue(allocations);

  return (
    <div className="basket-performance">
      <h2>Basket Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Stablecoin</th>
            <th>Current Price</th>
            <th>Allocated Amount</th>
            <th>Current Value</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((coin) => (
            <tr key={coin.name}>
              <td>{coin.name}</td>
              <td>{formatCurrency(coin.price)}</td>
              <td>{coin.amount.toFixed(2)}</td>
              <td>{formatCurrency(coin.price * coin.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total Basket Value:</td>
            <td>{formatCurrency(totalValue)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BasketPerformance;