'use client';

interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'purple' | 'yellow';
}

export default function ProgressBar({ label, value, max = 100, color = 'blue' }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  const colorClasses = {
    blue: 'bg-linear-to-r from-blue-500 to-blue-600',
    green: 'bg-linear-to-r from-green-500 to-green-600',
    purple: 'bg-linear-to-r from-purple-500 to-purple-600',
    yellow: 'bg-linear-to-r from-yellow-500 to-yellow-600',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
