import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import { getLogs } from '../../services/adminService';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getLogs()
      .then(data => setLogs(data))
      .catch(err => { console.error('Failed to fetch logs:', err); setError(err.message); });
  }, []);
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">System Logs</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">View and search system logs for audit and troubleshooting.</p>
      </header>
      {error && <p className="text-red-500">Error loading logs: {error}</p>}
      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="px-4 py-2 text-left">UUID</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.uuid} className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-sm">{log.uuid}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminLogsPage; 