import { motion } from 'framer-motion';

interface OverviewCardProps {
  title: string;
  value: number;
  type: 'balance' | 'income' | 'expense' | 'savings';
  period: 'monthly' | 'quarterly' | 'yearly';
  suffix?: string;
}

const getCardColor = (type: OverviewCardProps['type']) => {
  switch (type) {
    case 'balance':
      return 'bg-blue-50 text-blue-600';
    case 'income':
      return 'bg-green-50 text-green-600';
    case 'expense':
      return 'bg-red-50 text-red-600';
    case 'savings':
      return 'bg-purple-50 text-purple-600';
  }
};

export const OverviewCard = ({ title, value, type, period, suffix = '' }: OverviewCardProps) => {
  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 sm:p-6 rounded-lg shadow-sm ${getCardColor(type)}`}
    >
      <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-xl sm:text-2xl font-bold">
          {type === 'savings' ? `${value}${suffix}` : formattedValue}
        </p>
        <span className="ml-2 text-xs sm:text-sm opacity-75">{period}</span>
      </div>
    </motion.div>
  );
}; 