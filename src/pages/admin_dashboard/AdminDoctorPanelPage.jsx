import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard_shared/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Briefcase } from 'lucide-react';
import { getDoctorPanel } from '../../services/adminService';

export default function AdminDoctorPanelPage() {
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 });
  useEffect(() => {
    getDoctorPanel()
      .then(data => setStats({ total: data.totalDoctors, active: data.activeDoctors, pending: data.patientsWaiting }))
      .catch(err => console.error('Failed to fetch doctor panel stats:', err));
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Doctor Panel</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Overview and management tools for doctors.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Doctors"
          value={stats.total}
          details={<><span>Active: {stats.active}</span><span className="ml-2">Pending: {stats.pending}</span></>}
          colorTheme="slate"
          icon={<Briefcase className="w-6 h-6" />}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Manage Doctors</h2>
        <Button variant="primary_dark" size="md">View All Doctors</Button>
      </Card>
    </div>
  );
} 