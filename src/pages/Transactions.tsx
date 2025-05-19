import { useState } from 'react';
import { TransactionsTable } from '../components/TransactionsTable/TransactionsTable';
import { transactionsData } from '../data/mockData';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowPathIcon,
  WalletIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export const Transactions = () => {
  const [dateRange, setDateRange] = useState('all');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredTransactions = () => {
    let filtered = [...transactionsData];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query)
      );
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '7days':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(now.getDate() - 30);
          break;
        case '3months':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case '6months':
          startDate.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(transaction => 
        new Date(transaction.date) >= startDate && 
        new Date(transaction.date) <= now
      );
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(transaction => 
        transaction.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleResetFilters = () => {
    setDateRange('all');
    setCategory('all');
    setSortBy('newest');
    setSearchQuery('');
  };

  const getTotalAmount = (type: 'credit' | 'debit') => {
    return getFilteredTransactions()
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WalletIcon className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500">
              View and manage your transaction history
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
            <ArrowUpIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              ₹{getTotalAmount('credit').toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
            <ArrowDownIcon className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-700">
              ₹{getTotalAmount('debit').toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </button>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Reset</span>
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <label htmlFor="dateRange" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    Date Range
                  </label>
                  <select
                    id="dateRange"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Time</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sortBy" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <TransactionsTable transactions={getFilteredTransactions()} />
      </div>
    </div>
  );
}; 