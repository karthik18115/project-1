import React from 'react';
import Card from '../../components/ui/Card';

export default function EmergencyHistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Emergency History</h1>
      </header>
      <Card>
        <p className="text-slate-600">
          Log of handled emergency cases will be displayed here. Metrics on time-to-treatment, survival rates, and prescription accuracy available.
        </p>
      </Card>
    </div>
  );
} 