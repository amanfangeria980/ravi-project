import { useState } from 'react';
import { Charts } from '../components/Charts/Charts';
import { transactionsData } from '../data/mockData';
import SpendingPieChart from '../components/SpendingPieChart';
import ViewToggle from '../components/ViewToggle';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

type ViewType = 'monthly' | 'quarterly' | 'ytd';

export const Analytics = () => {
  const [selectedView, setSelectedView] = useState<ViewType>('monthly');

  // Sample data for financial cards
  const financialData = {
    income: {
      monthly: 85000,
      quarterly: 255000,
      ytd: 1020000,
      trend: 12.5,
    },
    expenses: {
      monthly: 65000,
      quarterly: 195000,
      ytd: 780000,
      trend: -8.3,
    },
    savings: {
      monthly: 20000,
      quarterly: 60000,
      ytd: 240000,
      trend: 15.2,
    },
  };

  const getCurrentValue = (type: keyof typeof financialData) => {
    return financialData[type][selectedView];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTrend = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value}%`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChartBarIcon className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Financial Analytics</h1>
            <p className="text-sm text-gray-500">
              Track your financial performance and insights
            </p>
          </div>
        </div>
        <ViewToggle
          selectedView={selectedView}
          onChange={setSelectedView}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                {formatCurrency(getCurrentValue('income'))}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-sm font-medium text-green-600">
              {formatTrend(financialData.income.trend)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                {formatCurrency(getCurrentValue('expenses'))}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '60%' }} />
            </div>
            <span className="text-sm font-medium text-red-600">
              {formatTrend(financialData.expenses.trend)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Savings</h3>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                {formatCurrency(getCurrentValue('savings'))}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
            </div>
            <span className="text-sm font-medium text-blue-600">
              {formatTrend(financialData.savings.trend)}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Savings Rate</h3>
              <p className="text-base sm:text-lg font-semibold text-gray-900">23.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="h-5 w-5 text-primary-600" />
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Budget Usage</h3>
              <p className="text-base sm:text-lg font-semibold text-gray-900">78%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-primary-600" />
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Avg. Daily Spend</h3>
              <p className="text-base sm:text-lg font-semibold text-gray-900">₹2,167</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ExclamationCircleIcon className="h-5 w-5 text-primary-600" />
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Alerts</h3>
              <p className="text-base sm:text-lg font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Income vs Expenses</h2>
          <div className="h-[300px] sm:h-[400px]">
            <Charts transactions={transactionsData} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Category Analysis</h2>
          <div className="h-[300px] sm:h-[400px]">
            <SpendingPieChart />
          </div>
        </div>
      </div>

      {/* Budget Progress Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Budget Progress</h2>
        <div className="space-y-4 sm:space-y-6">
          {['Food', 'Transport', 'Entertainment', 'Utilities'].map((category) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{category}</span>
                <span className="text-xs sm:text-sm text-gray-600">₹15,000 / ₹20,000</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 