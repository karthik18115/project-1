import React from 'react';
import StatsCard from '../../../components/dashboard_shared/StatsCard';

/**
 * StatsSummary displays a grid of statistics cards for the doctor overview.
 * @param {{ stats: Array<{title: string, value: number|string, details: React.ReactNode, colorTheme: string, icon: React.ReactNode}>, isLoading: boolean }} props
 */
export default function StatsSummary({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <StatsCard
          key={idx}
          title={stat.title}
          value={stat.value}
          details={stat.details}
          colorTheme={stat.colorTheme}
          isLoading={isLoading}
          icon={stat.icon}
        />
      ))}
    </div>
  );
} 