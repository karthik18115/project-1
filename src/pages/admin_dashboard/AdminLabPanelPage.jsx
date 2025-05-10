import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard_shared/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FlaskConical } from 'lucide-react';
import { getLabPanel } from '../../services/adminService';

export default function AdminLabPanelPage() {
  const [stats, setStats] = useState({ requests: 0, pending: 0 });
  useEffect(() => {
    getLabPanel()
      .then(data => setStats({ requests: data.processedResults + data.pendingRequests, pending: data.pendingRequests }))
      .catch(err => console.error('Failed to fetch lab panel stats:', err));
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Lab Center Panel</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage lab requests and results.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="Test Requests"
          value={stats.requests}
          details={<span>Pending: {stats.pending}</span>}
          colorTheme="teal"
          icon={<FlaskConical className="w-6 h-6" />}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Lab Requests</h2>
        <Button variant="primary_dark" size="md">View Requests</Button>
      </Card>
    </div>
  );
} 