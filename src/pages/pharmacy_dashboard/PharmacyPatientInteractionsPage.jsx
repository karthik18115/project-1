import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock patient logs
const mockInteractions = [
  { id: 1, date: '2024-07-20', notes: 'Allergy to penicillin noted', patient: 'Alice Johnson' },
  { id: 2, date: '2024-07-22', notes: 'Discussed dosage adjustment', patient: 'Bob Smith' },
];

export default function PharmacyPatientInteractionsPage() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // TODO: fetch patient interaction logs
    setInteractions(mockInteractions);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800">Patient Interaction Logs</h1>
        <p className="text-slate-600">Timeline of patient visits, notes, and queries.</p>
      </header>

      <Card>
        <ul className="space-y-4">
          {interactions.map(item => (
            <li key={item.id} className="border-l-4 border-teal-500 bg-teal-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium text-slate-800 dark:text-slate-100">{item.patient}</p>
                <span className="text-sm text-slate-600 dark:text-slate-300">{item.date}</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{item.notes}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Button variant="outline" size="md">Add New Note</Button>
    </div>
  );
} 