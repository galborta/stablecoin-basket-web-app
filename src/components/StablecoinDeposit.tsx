import React, { useState } from 'react';
import './StablecoinDeposit.css';

type Stablecoin = 'USDC' | 'USDT' | 'EURD';

interface Props {
  onCoinSelect: (coin: Stablecoin) => void;
}

const StablecoinDeposit: React.FC<Props> = ({ onCoinSelect }) => {
  const [selectedCoin, setSelectedCoin] = useState<Stablecoin>('USDC');

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value as Stablecoin);
  };

  const handleSubmit = () => {
    onCoinSelect(selectedCoin);
  };

  return (
    <div className="deposit-page">
      <h2>Select Stablecoin to Deposit</h2>
      <div>
        <label htmlFor="coin-select">Select Stablecoin:</label>
        <select id="coin-select" value={selectedCoin} onChange={handleCoinChange}>
          <option value="USDC">USDC</option>
          <option value="USDT">USDT</option>
          <option value="EURD">EURD</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default StablecoinDeposit;
