import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// TODO: Replace mock data with API call to fetch pending signup requests
const mockPendingUsers = [
  { id: 'usr_007', name: 'John Patient', email: 'john.patient@example.com', role: 'Patient', requestedAt: '2024-07-30 11:00 AM' },
  { id: 'usr_008', name: 'Dr. New Doctor', email: 'new.doctor@medrec.com', role: 'Doctor', requestedAt: '2024-07-30 11:15 AM' }
];

export default function AdminPendingRequestsPage() {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setPendingUsers(mockPendingUsers);
  }, []);

  const handleApprove = (userId) => {
    // TODO: Call API to approve signup
    setPendingUsers(users => users.filter(u => u.id !== userId));
  };

  const handleReject = (userId) => {
    // TODO: Call API to reject signup
    setPendingUsers(users => users.filter(u => u.id !== userId));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Pending Requests</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Review and approve user signup requests.</p>
      </header>

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-300">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-300">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-300">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-300">Requested At</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
            {pendingUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">No pending requests</td>
              </tr>
            ) : (
              pendingUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{user.name}</td>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{user.email}</td>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{user.role}</td>
                  <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{user.requestedAt}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Button variant="success" size="sm" onClick={() => handleApprove(user.id)}>Approve</Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(user.id)}>Reject</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 