import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function EmergencyPatientQuickAccessPage() {
  // Mock patient data
  const patient = {
    name: 'John Doe',
    allergies: 'Penicillin',
    conditions: 'Diabetes, Hypertension',
    bloodType: 'O+',
    emergencyContact: 'Jane Doe (Spouse) - 555-1234',
    notes: 'History of chest pain, previous stent placement.'
  };

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Patient Quick Access</h1>
      </header>
      <Card className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">{patient.name}</h2>
        <p><strong>Allergies:</strong> {patient.allergies}</p>
        <p><strong>Chronic Conditions:</strong> {patient.conditions}</p>
        <p><strong>Blood Type:</strong> {patient.bloodType}</p>
        <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
        <p><strong>Notes:</strong> {patient.notes}</p>
        <Button variant="outline">View Full Record</Button>
      </Card>
    </div>
  );
} 