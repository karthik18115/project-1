import React from 'react';

const TabSwitcher = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 border-b border-slate-300 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={[
            'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none',
            activeTab === tab.id 
              ? 'border-b-2 border-teal-500 text-teal-600' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          ].join(' ')}
          onClick={() => onTabChange(tab.id)}
          aria-pressed={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher; 