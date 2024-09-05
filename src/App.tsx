import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import StablecoinDeposit from './components/StablecoinDeposit';
import BasketManagement from './components/BasketManagement';
import BasketPerformance from './components/BasketPerformance';
import { Stablecoin, PerformanceData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState<Stablecoin | null>(null);
  const [weights, setWeights] = useState<{ [key in Stablecoin]?: number }>({});
  const [allocations, setAllocations] = useState<PerformanceData[]>([]);

  const handleStart = () => setStep(1);

  const handleCoinSelect = (coin: Stablecoin) => {
    setSelectedCoin(coin);
    setStep(2);
  };

  const handleWeightAdjustment = (newWeights: { [key in Stablecoin]?: number }) => {
    setWeights(newWeights);
    const newAllocations = Object.entries(newWeights).map(([coin, percentage]) => ({
      name: coin as Stablecoin,
      price: 1,
      amount: (percentage || 0) / 100 * 1000,
    }));
    setAllocations(newAllocations);
    setStep(3);
  };

  return (
    <div>
      {step === 0 && <LandingPage onStart={handleStart} />}
      {step === 1 && <StablecoinDeposit onCoinSelect={handleCoinSelect} />}
      {step === 2 && selectedCoin && (
        <BasketManagement selectedCoin={selectedCoin} onWeightAdjustment={handleWeightAdjustment} />
      )}
      {step === 3 && <BasketPerformance allocations={allocations} />}
    </div>
  );
};

export default App;
