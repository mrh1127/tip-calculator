import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  min?: string;
  step?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon: Icon,
  min,
  step,
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          className={`
            w-full px-4 py-3 rounded-lg border-2 border-gray-200
            focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200
            transition-all duration-200 text-lg
            ${Icon ? 'pl-12' : ''}
          `}
        />
      </div>
    </div>
  );
};
