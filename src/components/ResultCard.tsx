interface ResultCardProps {
  label: string;
  amount: string;
  isHighlight?: boolean;
}

export const ResultCard = ({ label, amount, isHighlight = false }: ResultCardProps) => {
  return (
    <div
      className={`
        p-6 rounded-xl transition-all duration-300
        ${
          isHighlight
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl'
            : 'bg-white border-2 border-gray-200'
        }
      `}
    >
      <div className={`text-sm font-medium mb-2 ${isHighlight ? 'text-emerald-100' : 'text-gray-600'}`}>
        {label}
      </div>
      <div className={`text-3xl font-bold ${isHighlight ? 'text-white' : 'text-gray-900'}`}>
        {amount}
      </div>
    </div>
  );
};
