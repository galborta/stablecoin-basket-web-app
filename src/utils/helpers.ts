export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const calculateTotalValue = (allocations: { price: number; amount: number }[]): number => {
  return allocations.reduce((total, allocation) => total + allocation.price * allocation.amount, 0);
};
