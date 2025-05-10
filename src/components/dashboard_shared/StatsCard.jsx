import React from 'react';
import CustomUICard from '../ui/Card'; // Assuming path is correct
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Helper function to get theme classes
const getThemeClasses = (theme) => {
  switch (theme) {
    case 'blue':
      return {
        gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50',
        border: 'border-blue-500 dark:border-blue-400',
        titleColor: 'text-blue-800 dark:text-blue-300',
        valueColor: 'text-blue-700 dark:text-blue-200',
        detailsColor: 'text-blue-600 dark:text-blue-400',
      };
    case 'red':
      return {
        gradient: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50',
        border: 'border-red-500 dark:border-red-400',
        titleColor: 'text-red-800 dark:text-red-300',
        valueColor: 'text-red-700 dark:text-red-200',
        detailsColor: 'text-red-600 dark:text-red-400',
      };
    case 'orange': // For Emergency (e.g., warnings, bay availability)
      return {
        gradient: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50',
        border: 'border-orange-500 dark:border-orange-400',
        titleColor: 'text-orange-800 dark:text-orange-300',
        valueColor: 'text-orange-700 dark:text-orange-200',
        detailsColor: 'text-orange-600 dark:text-orange-400',
      };
    case 'teal': // For Lab Center
      return {
        gradient: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50',
        border: 'border-teal-500 dark:border-teal-400',
        titleColor: 'text-teal-800 dark:text-teal-300',
        valueColor: 'text-teal-700 dark:text-teal-200',
        detailsColor: 'text-teal-600 dark:text-teal-400',
      };
    case 'purple': // For Pharmacy
      return {
        gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50',
        border: 'border-purple-500 dark:border-purple-400',
        titleColor: 'text-purple-800 dark:text-purple-300',
        valueColor: 'text-purple-700 dark:text-purple-200',
        detailsColor: 'text-purple-600 dark:text-purple-400',
      };
    case 'slate': // For Admin (using dark theme)
      return {
        gradient: 'bg-gradient-to-br from-slate-700 to-slate-600 dark:from-slate-800 dark:to-slate-700', // Slightly adjust for dark mode consistency
        border: 'border-slate-500 dark:border-slate-500',
        titleColor: 'text-slate-300 dark:text-slate-300',
        valueColor: 'text-white dark:text-white',
        detailsColor: 'text-slate-400 dark:text-slate-400',
      };
    default: // Default theme (e.g., gray or neutral)
      return {
        gradient: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800',
        border: 'border-gray-500 dark:border-gray-400',
        titleColor: 'text-gray-800 dark:text-gray-300',
        valueColor: 'text-gray-700 dark:text-gray-200',
        detailsColor: 'text-gray-600 dark:text-gray-400',
      };
  }
};

function StatsCard({ title, value, details, icon, colorTheme = 'gray', isLoading }) {
  const themeClasses = getThemeClasses(colorTheme);

  if (isLoading) {
    return (
      <CustomUICard className={`${themeClasses.gradient} border-l-4 ${themeClasses.border}`}>
        <div className="p-4">
          <h3 className={`text-sm font-medium ${themeClasses.titleColor} mb-1`}><Skeleton width={100} /></h3>
          <p className={`text-2xl font-bold ${themeClasses.valueColor}`}><Skeleton width={60} /></p>
          {details && (
            <div className={`mt-1 text-xs ${themeClasses.detailsColor}`}>
              <Skeleton width={120} />
            </div>
          )}
        </div>
      </CustomUICard>
    );
  }

  return (
    <CustomUICard className={`${themeClasses.gradient} border-l-4 ${themeClasses.border} flex flex-col`}>
      <div className="p-4 flex-grow">
        {icon && <div className={`mb-2 ${themeClasses.valueColor}`}>{React.cloneElement(icon, { className: `${icon.props.className || ''} w-6 h-6`})}</div>} {/* Optional Icon */} 
        <h3 className={`text-sm font-medium ${themeClasses.titleColor} mb-1`}>{title}</h3>
        <p className={`text-2xl font-bold ${themeClasses.valueColor}`}>{value}</p>
        {details && (
          <div className={`mt-1 text-xs ${themeClasses.detailsColor}`}>{details}</div>
        )}
      </div>
      {/* Can add a footer section here later if needed */}
    </CustomUICard>
  );
}

export default StatsCard; 