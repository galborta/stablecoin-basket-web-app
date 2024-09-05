import React, { useState, useEffect } from 'react';
import { Stablecoin } from '../types';
import './BasketManagement.css';

// Interface for the structure of each basket weight entry
interface BasketWeight {
  coin: Stablecoin;
  percentage: number;
}

interface Props {
  selectedCoin: Stablecoin;
  onWeightAdjustment: (weights: { [key in Stablecoin]?: number }) => void;
}

const BasketManagement: React.FC<Props> = ({ selectedCoin, onWeightAdjustment }) => {
  // State to hold the basket weights for each stablecoin
  const [basketWeights, setBasketWeights] = useState<BasketWeight[]>([
    { coin: 'USDC', percentage: 33 },
    { coin: 'USDT', percentage: 33 },
    { coin: 'EURD', percentage: 34 },
  ]);

  // State to track if the total percentage is valid (equals 100%)
  const [isValid, setIsValid] = useState(true);

  // Effect to validate total percentage whenever basketWeights changes
  useEffect(() => {
    const total = basketWeights.reduce((sum, weight) => sum + weight.percentage, 0);
    setIsValid(total === 100);
  }, [basketWeights]);

  // Handler for updating individual coin percentages
  const handlePercentageChange = (coin: Stablecoin, value: string) => {
    const newPercentage = parseInt(value) || 0;
    setBasketWeights(prevWeights =>
      prevWeights.map(weight =>
        weight.coin === coin ? { ...weight, percentage: newPercentage } : weight
      )
    );
  };

  // Handler for saving the basket
  const handleSaveBasket = () => {
    if (isValid) {
      const weights = basketWeights.reduce((acc, { coin, percentage }) => {
        acc[coin] = percentage;
        return acc;
      }, {} as { [key in Stablecoin]?: number });
      onWeightAdjustment(weights);
    } else {
      alert('Total percentage must equal 100%');
    }
  };

  return (
    <div className="basket-management">
      <h2>Set Basket Weights for {selectedCoin}</h2>
      {/* Render input fields for each stablecoin */}
      {basketWeights.map(({ coin, percentage }) => (
        <div key={coin}>
          <label htmlFor={`${coin}-weight`}>{coin}:</label>
          <input
            id={`${coin}-weight`}
            type="number"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => handlePercentageChange(coin, e.target.value)}
          />
          %
        </div>
      ))}
      {/* Display total percentage and validation message */}
      <div>
        Total: {basketWeights.reduce((sum, weight) => sum + weight.percentage, 0)}%
        {!isValid && <span style={{ color: 'red' }}> (Must equal 100%)</span>}
      </div>
      {/* Save button, disabled if percentages are invalid */}
      <button onClick={handleSaveBasket} disabled={!isValid}>
        Save Basket
      </button>
    </div>
  );
};

export default BasketManagement;
