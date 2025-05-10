import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function EmergencyCollaborationPage() {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Doctor Collaboration</h1>
      </header>
      <Card className="p-4 space-y-4">
        <p className="text-slate-600">Assign cases to co-doctors, request consults, and tag specialists here.</p>
      </Card>
    </div>
  );
} 