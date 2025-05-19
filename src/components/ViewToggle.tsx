import React from 'react';

export type ViewType = 'monthly' | 'quarterly' | 'ytd';

interface ViewToggleProps {
  selectedView: ViewType;
  onChange: (view: ViewType) => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ selectedView, onChange, className = '' }) => {
  const views: { value: ViewType; label: string }[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'ytd', label: 'YTD' },
  ];

  return (
    <div className={`inline-flex rounded-lg bg-gray-100 p-1 ${className}`}>
      {views.map((view) => (
        <button
          key={view.value}
          onClick={() => onChange(view.value)}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
            ${
              selectedView === view.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
          `}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle; 