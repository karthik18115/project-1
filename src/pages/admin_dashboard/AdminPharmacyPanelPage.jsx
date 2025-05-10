import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard_shared/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Pill } from 'lucide-react';
import { getPharmacyPanel } from '../../services/adminService';

export default function AdminPharmacyPanelPage() {
  const [stats, setStats] = useState({ prescriptions: 0, pending: 0 });
  useEffect(() => {
    getPharmacyPanel()
      .then(data => setStats({ prescriptions: data.totalInventoryItems, pending: data.lowStockCount }))
      .catch(err => console.error('Failed to fetch pharmacy panel stats:', err));
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Pharmacy Panel</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage prescription queues and dispensing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="Prescriptions"
          value={stats.prescriptions}
          details={<span>Pending: {stats.pending}</span>}
          colorTheme="purple"
          icon={<Pill className="w-6 h-6" />}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Pharmacy Queue</h2>
        <Button variant="primary_dark" size="md">View Queue</Button>
      </Card>
    </div>
  );
} 