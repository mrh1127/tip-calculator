export interface CalculatorState {
  billAmount: string;
  tipPercentage: number;
  customTipPercentage: string;
  numberOfPeople: string;
}

export interface CalculationResults {
  tipAmount: number;
  totalAmount: number;
  tipPerPerson: number;
  totalPerPerson: number;
}
