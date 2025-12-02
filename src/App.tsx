import { useState, useMemo } from 'react';
import { Calculator, DollarSign, Users, Percent, RotateCcw } from 'lucide-react';
import { CalculatorState } from './types/calculator';
import { calculateTip, formatCurrency } from './utils/calculations';
import { TipButton } from './components/TipButton';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';

const TIP_PRESETS = [10, 15, 18, 20, 25];

function App() {
  const [state, setState] = useState<CalculatorState>({
    billAmount: '',
    tipPercentage: 18,
    customTipPercentage: '',
    numberOfPeople: '1',
  });

  const results = useMemo(() => {
    const bill = parseFloat(state.billAmount) || 0;
    const tip = state.customTipPercentage
      ? parseFloat(state.customTipPercentage) || 0
      : state.tipPercentage;
    const people = parseInt(state.numberOfPeople) || 1;

    return calculateTip(bill, tip, people);
  }, [state.billAmount, state.tipPercentage, state.customTipPercentage, state.numberOfPeople]);

  const handleTipSelect = (percentage: number) => {
    setState({ ...state, tipPercentage: percentage, customTipPercentage: '' });
  };

  const handleCustomTipChange = (value: string) => {
    setState({ ...state, customTipPercentage: value, tipPercentage: 0 });
  };

  const handleReset = () => {
    setState({
      billAmount: '',
      tipPercentage: 18,
      customTipPercentage: '',
      numberOfPeople: '1',
    });
  };

  const activeTipPercentage = state.customTipPercentage
    ? parseFloat(state.customTipPercentage) || 0
    : state.tipPercentage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Calculator className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Matt's Tip Calculator</h1>
          <p className="text-gray-600 text-lg">Calculate tips and split bills with ease</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bill Total</h2>

              <div className="space-y-6">
                <InputField
                  label="Bill Amount"
                  value={state.billAmount}
                  onChange={(value) => setState({ ...state, billAmount: value })}
                  type="number"
                  placeholder="0.00"
                  icon={DollarSign}
                  min="0"
                  step="0.01"
                />

                <InputField
                  label="Number of People"
                  value={state.numberOfPeople}
                  onChange={(value) => setState({ ...state, numberOfPeople: value })}
                  type="number"
                  placeholder="1"
                  icon={Users}
                  min="1"
                  step="1"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tip Percentage</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {TIP_PRESETS.map((percentage) => (
                  <TipButton
                    key={percentage}
                    percentage={percentage}
                    isSelected={!state.customTipPercentage && state.tipPercentage === percentage}
                    onClick={() => handleTipSelect(percentage)}
                  />
                ))}
              </div>

              <InputField
                label="Custom Tip Percentage"
                value={state.customTipPercentage}
                onChange={handleCustomTipChange}
                type="number"
                placeholder="Enter custom %"
                icon={Percent}
                min="0"
                step="0.1"
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-200"
            >
              <RotateCcw size={20} />
              Reset Calculator
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>

              <div className="space-y-4">
                <ResultCard
                  label="Total per Person"
                  amount={formatCurrency(results.totalPerPerson)}
                  isHighlight
                />

                <ResultCard
                  label="Tip per Person"
                  amount={formatCurrency(results.tipPerPerson)}
                />

                <ResultCard
                  label="Total Tip Amount"
                  amount={formatCurrency(results.tipAmount)}
                />

                <ResultCard
                  label="Grand Total"
                  amount={formatCurrency(results.totalAmount)}
                />
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Percent className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-1">Current Tip Rate</h3>
                  <p className="text-2xl font-bold text-emerald-700">{activeTipPercentage.toFixed(1)}%</p>
                  <p className="text-sm text-emerald-600 mt-2">
                    {activeTipPercentage >= 20 ? 'Excellent service!' :
                     activeTipPercentage >= 15 ? 'Standard service' :
                     'Basic service'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
