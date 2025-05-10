import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock permissions
const mockStaff = [
  { id: 1, name: 'Alice Pharmacist', role: 'Pharmacist', active: true },
  { id: 2, name: 'Bob Assistant', role: 'Assistant', active: false },
];

export default function PharmacySettingsPage() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // TODO: Fetch staff permissions
    setStaff(mockStaff);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800">Settings</h1>
        <p className="text-slate-600">Manage staff permissions and preferences.</p>
      </header>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Staff Permissions</h2>
        <table className="min-w-full divide-y divide-slate-200 mb-6">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {staff.map(u => (
              <tr key={u.id}>
                <td className="px-4 py-2 text-slate-800">{u.name}</td>
                <td className="px-4 py-2 text-slate-800">{u.role}</td>
                <td className="px-4 py-2 text-slate-800">
                  <input type="checkbox" checked={u.active} onChange={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button variant="primary" size="md">Add Staff</Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="autoApprove" />
            <label htmlFor="autoApprove" className="text-slate-700">Auto-approve prescriptions from trusted doctors</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="darkMode" />
            <label htmlFor="darkMode" className="text-slate-700">Enable dark mode</label>
          </div>
        </div>
      </Card>

      <Button variant="primary" size="md">Save Settings</Button>
    </div>
  );
} 