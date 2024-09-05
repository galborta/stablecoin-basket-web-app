export type Stablecoin = 'USDC' | 'USDT' | 'EURD';

export interface PerformanceData {
  name: Stablecoin;
  price: number;
  amount: number;
}
