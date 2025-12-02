interface TipButtonProps {
  percentage: number;
  isSelected: boolean;
  onClick: () => void;
}

export const TipButton = ({ percentage, isSelected, onClick }: TipButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200
        ${
          isSelected
            ? 'bg-emerald-600 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border-2 border-gray-200'
        }
      `}
    >
      {percentage}%
    </button>
  );
};
