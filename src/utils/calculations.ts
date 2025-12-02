import { CalculationResults } from '../types/calculator';

export const calculateTip = (
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number
): CalculationResults => {
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = numberOfPeople > 0 ? tipAmount / numberOfPeople : tipAmount;
  const totalPerPerson = numberOfPeople > 0 ? totalAmount / numberOfPeople : totalAmount;

  return {
    tipAmount,
    totalAmount,
    tipPerPerson,
    totalPerPerson,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
