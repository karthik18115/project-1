import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock compliance data
const mockReports = [
  { id: 1, type: 'Controlled Substances', date: '2024-07-01 to 2024-07-31' },
  { id: 2, type: 'Dispensing Accuracy', date: 'July 2024' }
];

export default function PharmacyReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // TODO: Fetch reports metadata
    setReports(mockReports);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800">Regulatory Reports</h1>
        <p className="text-slate-600">Generate compliance and audit logs.</p>
      </header>

      <Card>
        <ul className="divide-y divide-slate-200">
          {reports.map(r => (
            <li key={r.id} className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium text-slate-800">{r.type}</p>
                <p className="text-sm text-slate-600">Period: {r.date}</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">Download CSV</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
} 