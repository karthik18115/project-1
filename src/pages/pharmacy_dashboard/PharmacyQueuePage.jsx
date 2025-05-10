import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PrescriptionIcon } from '../../components/icons';
import { SearchIcon } from '../../components/icons';

// Mock inbox data
const mockInbox = [
  { id: 'RX001', patient: 'Alice Johnson', age: 34, doctor: 'Dr. Carter', time: '09:30 AM', status: 'Pending', drugs: ['Amoxicillin 500mg'] },
  { id: 'RX002', patient: 'Bob Smith', age: 62, doctor: 'Dr. Lee', time: '10:15 AM', status: 'Pending', drugs: ['Metformin 500mg', 'Lisinopril 10mg'] }
];

export default function PharmacyQueuePage() {
  const [inbox, setInbox] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const statuses = ['All', 'Pending', 'Dispensed', 'Cancelled'];
  useEffect(() => {
    // TODO: fetch from API
    setInbox(mockInbox);
  }, []);

  const filtered = inbox.filter(rx => {
    const matchesSearch = [rx.patient, rx.doctor].some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'All' || rx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 flex items-center space-x-2">
          <PrescriptionIcon />
          <span>E-Prescriptions Inbox</span>
        </h1>
        <p className="text-slate-600">Review and process incoming prescriptions.</p>
      </header>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        <div className="flex items-center w-full md:w-1/2">
          <SearchIcon className="w-5 h-5 text-slate-500 mr-2" />
          <input
            type="text"
            placeholder="Search patient or doctor..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-3 py-2 border border-slate-300 rounded-md"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Age</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Doctor</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Received</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filtered.map(rx => (
              <tr key={rx.id}>
                <td className="px-4 py-2 text-slate-800">{rx.patient}</td>
                <td className="px-4 py-2 text-slate-800">{rx.age}</td>
                <td className="px-4 py-2 text-slate-800">{rx.doctor}</td>
                <td className="px-4 py-2 text-slate-800">{rx.time}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    rx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>{rx.status}</span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Button size="sm" variant="primary" onClick={() => {/* TODO: dispense */}}>Dispense</Button>
                  <Button size="sm" variant="danger" onClick={() => {/* TODO: flag */}}>Flag</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 