import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChartIcon } from '../../components/icons';

const mockProgressData = [
  {
    id: 'E001',
    name: 'Alice Brown',
    progress: [
      { step: 'Triage', done: true, time: '09:00 AM' },
      { step: 'Admit', done: true, time: '09:15 AM' },
      { step: 'Orders', done: false },
      { step: 'Collaboration', done: false },
      { step: 'Discharge', done: false },
    ]
  },
  {
    id: 'E002',
    name: 'Bob Smith',
    progress: [
      { step: 'Triage', done: true, time: '09:20 AM' },
      { step: 'Admit', done: false },
      { step: 'Orders', done: false },
      { step: 'Collaboration', done: false },
      { step: 'Discharge', done: false },
    ]
  },
];

export default function EmergencyProgressPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockProgressData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center space-x-2">
        <ChartIcon className="w-6 h-6 text-slate-600" />
        <h1 className="text-2xl font-semibold text-slate-800">ER Progress List</h1>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {Array(2).fill(0).map((_, idx) => (
            <Skeleton key={idx} height={80} />
          ))}
        </div>
      ) : (
        data.map(patient => (
          <Card key={patient.id} className="p-4">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">{patient.name} ({patient.id})</h2>
            <div className="flex space-x-8">
              {patient.progress.map((p, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${p.done ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {p.done ? '✓' : idx + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{p.step}</span>
                  {p.time && <span className="text-2xs text-slate-400">{p.time}</span>}
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
} 