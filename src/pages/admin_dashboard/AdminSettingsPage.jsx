import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getSettings, updateSettings } from '../../services/adminService';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ maintenanceMode: false, supportEmail: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputClass = "w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  useEffect(() => {
    getSettings()
      .then(data => setSettings({ maintenanceMode: data.maintenanceMode, supportEmail: data.supportEmail }))
      .catch(err => setError(err.message || 'Failed to load settings.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    updateSettings(settings)
      .then(updated => {
        setSettings(updated);
        alert('Settings saved successfully.');
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Failed to save settings.');
      });
  };

  if (loading) return <p className="p-6 text-center text-slate-500">Loading settings...</p>;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Admin Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure global application settings.</p>
      </header>

      {error && (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="maintenanceMode" className={labelClass}>
              <input
                id="maintenanceMode"
                name="maintenanceMode"
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              Maintenance Mode
            </label>
          </div>

          <div>
            <label htmlFor="supportEmail" className={labelClass}>Support Email</label>
            <input
              id="supportEmail"
              name="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="text-right">
            <Button variant="primary" size="md" type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 