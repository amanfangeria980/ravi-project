import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Dialog } from '@headlessui/react';

// Types
interface CategoryData {
  name: string;
  value: number;
  color: string;
  subcategories?: CategoryData[];
}

// Sample data
const spendingData: CategoryData[] = [
  {
    name: 'Food',
    value: 3500,
    color: '#FF6384',
    subcategories: [
      { name: 'Groceries', value: 2000, color: '#FF6384' },
      { name: 'Dining Out', value: 1000, color: '#36A2EB' },
      { name: 'Snacks', value: 500, color: '#FFCE56' },
    ],
  },
  {
    name: 'Transport',
    value: 2500,
    color: '#36A2EB',
    subcategories: [
      { name: 'Fuel', value: 1500, color: '#FF6384' },
      { name: 'Bus', value: 500, color: '#36A2EB' },
      { name: 'Cab', value: 500, color: '#FFCE56' },
    ],
  },
  {
    name: 'Entertainment',
    value: 2000,
    color: '#FFCE56',
    subcategories: [
      { name: 'Movies', value: 1000, color: '#FF6384' },
      { name: 'Games', value: 500, color: '#36A2EB' },
      { name: 'Events', value: 500, color: '#FFCE56' },
    ],
  },
  {
    name: 'Utilities',
    value: 1500,
    color: '#4BC0C0',
    subcategories: [
      { name: 'Electricity', value: 800, color: '#FF6384' },
      { name: 'Water', value: 400, color: '#36A2EB' },
      { name: 'Internet', value: 300, color: '#FFCE56' },
    ],
  },
];

const SpendingPieChart: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSpending = spendingData.reduce((sum, category) => sum + category.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalSpending) * 100).toFixed(1);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p className="text-gray-600">₹{data.value.toLocaleString()}</p>
          <p className="text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const handlePieClick = (data: CategoryData) => {
    setSelectedCategory(data);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-[500px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={spendingData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            onClick={handlePieClick}
            animationDuration={1000}
          >
            {spendingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Modal for subcategories */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-[70%] max-w-2xl rounded-lg bg-white p-5">
            <Dialog.Title className="text-lg font-semibold mb-3">
              {selectedCategory?.name} - Subcategories
            </Dialog.Title>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedCategory?.subcategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {selectedCategory?.subcategories?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SpendingPieChart; 