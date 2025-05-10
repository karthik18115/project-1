import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard_shared/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ShieldAlert } from 'lucide-react';
import { getEmergencyPanel } from '../../services/adminService';

export default function AdminEmergencyPanelPage() {
  const [stats, setStats] = useState({ onDuty: 0, onCall: 0 });
  useEffect(() => {
    getEmergencyPanel()
      .then(data => setStats({ onDuty: data.totalBeds, onCall: data.occupiedBeds }))
      .catch(err => console.error('Failed to fetch emergency panel stats:', err));
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Emergency Panel</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage emergency doctors and response teams.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="On-Duty"
          value={stats.onDuty}
          details={<span>On Call: {stats.onCall}</span>}
          colorTheme="orange"
          icon={<ShieldAlert className="w-6 h-6" />}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Emergency Teams</h2>
        <Button variant="primary_dark" size="md">View Teams</Button>
      </Card>
    </div>
  );
} 