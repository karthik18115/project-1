import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function EmergencyOrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Emergency Orders</h1>
      </header>
      <Card className="p-4 space-y-4">
        <p className="text-slate-600">Issue emergency prescriptions, order lab tests, and initiate referrals here.</p>
        <div className="space-x-2">
          <Button>New Prescription</Button>
          <Button variant="outline">Order Lab Test</Button>
          <Button variant="outline">Initiate Referral</Button>
        </div>
      </Card>
    </div>
  );
} 