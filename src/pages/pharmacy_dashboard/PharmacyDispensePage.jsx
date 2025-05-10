import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ClipboardDocumentListIcon, SearchIcon, CalendarDaysIcon } from '../../components/icons';

// Mock dispensing log data
const mockLogs = [
  { id: 'D001', patient: 'Alice Johnson', drugs: ['Amoxicillin 500mg'], date: '2024-07-30', pharmacist: 'Alice Pharmacist' },
  { id: 'D002', patient: 'Bob Smith', drugs: ['Metformin 500mg'], date: '2024-07-29', pharmacist: 'Bob Assistant' }
];

export default function PharmacyDispensePage() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    // TODO: fetch logs from API
    setLogs(mockLogs);
  }, []);

  // Filtering logic
  const filteredLogs = logs.filter(log => {
    const matchesSearch = [log.patient, log.drugs.join(' ')].some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const logDate = new Date(log.date);
    const matchesStart = !startDate || logDate >= new Date(startDate);
    const matchesEnd = !endDate || logDate <= new Date(endDate);
    return matchesSearch && matchesStart && matchesEnd;
  });

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ClipboardDocumentListIcon className="w-6 h-6 text-slate-700" />
          <h1 className="text-3xl font-semibold text-slate-800">Dispensing Logs</h1>
        </div>
        <Button variant="outline" size="sm">Export CSV</Button>
      </header>
      {/* Toolbar: Search & Date Range */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        <div className="flex items-center w-full md:w-1/3">
          <SearchIcon className="w-5 h-5 text-slate-500 mr-2" />
          <input
            type="text"
            placeholder="Search patient or drug..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDaysIcon className="w-5 h-5 text-slate-500" />
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-md" />
          <span className="mx-1 text-slate-600">to</span>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-md" />
        </div>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Drugs</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Pharmacist</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td className="px-4 py-2 text-slate-800">{log.patient}</td>
                <td className="px-4 py-2 text-slate-800">{log.drugs.join(', ')}</td>
                <td className="px-4 py-2 text-slate-800">{log.date}</td>
                <td className="px-4 py-2 text-slate-800">{log.pharmacist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 