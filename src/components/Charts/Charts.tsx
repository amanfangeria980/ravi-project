import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Transaction } from '../../data/mockData';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const Charts = ({ transactions }: ChartsProps) => {
  const [activeTab, setActiveTab] = useState<'income' | 'categories'>('income');

  // Process data for income vs expenses by month present in data
  const incomeExpenseData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = { date: monthYear, income: 0, expenses: 0 };
    }
    
    if (transaction.type === 'credit') {
      acc[monthYear].income += transaction.amount;
    } else {
      acc[monthYear].expenses += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { date: string; income: number; expenses: number }>);

  // Sort by date and convert to array for chart
  const chartData = Object.values(incomeExpenseData)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }));

  // Process data for category-wise spending
  const categoryData = transactions
    .filter((t) => t.type === 'debit')
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Financial Charts</h2>
          <p className="text-gray-500 text-xs">Visualize your income, expenses, and spending categories.</p>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('income')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              activeTab === 'income'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
            }`}
          >
            Income vs Expenses
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              activeTab === 'categories'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
            }`}
          >
            Categories
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {activeTab === 'income' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 10 }}
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 10 }}
                tickFormatter={formatCurrency}
                width={60}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  color: '#111827',
                  fontSize: '12px',
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px',
                  paddingTop: '10px'
                }} 
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                name="Income"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 1, r: 2 }}
                activeDot={{ r: 4 }}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                name="Expenses"
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 1, r: 2 }}
                activeDot={{ r: 4 }}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  color: '#111827',
                  fontSize: '12px',
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px',
                  paddingTop: '10px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}; 