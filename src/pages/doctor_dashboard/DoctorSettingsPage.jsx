import React, { useState } from 'react';
import './DoctorSettingsPage.css';
import CustomUICard from '../../components/ui/Card';
import CustomButton from '../../components/ui/Button';
import { BellIcon, ClockIcon, UserCircleIcon, SecurityIcon } from '../../components/icons';

function DoctorSettingsPage() {
  const [notificationPrefs, setNotificationPrefs] = useState({
    newMessages: 'email',
    labResults: 'in-app',
    appointmentReminders: 'sms',
  });

  const handleNotificationChange = (type, value) => {
    setNotificationPrefs(prev => ({ ...prev, [type]: value }));
    console.log(`Notification preference changed: ${type} = ${value}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100">Settings</h1>
      
      <CustomUICard>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
            <UserCircleIcon className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
            Profile & Account
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Manage your personal information and account security.
          </p>
          <div className="space-y-3">
            <CustomButton variant="outline" className="w-full sm:w-auto">Edit Profile Information</CustomButton>
            <CustomButton variant="outline" className="w-full sm:w-auto ml-0 sm:ml-3">Change Password</CustomButton>
          </div>
        </div>
      </CustomUICard>

      <CustomUICard>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
            <BellIcon className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="msgNotif" className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Messages</label>
              <select 
                id="msgNotif" 
                value={notificationPrefs.newMessages}
                onChange={(e) => handleNotificationChange('newMessages', e.target.value)}
                className="mt-1 block w-full sm:w-1/2 rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 py-2 px-3"
              >
                <option value="in-app">In-App</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label htmlFor="labNotif" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Urgent Lab Results</label>
              <select 
                id="labNotif" 
                value={notificationPrefs.labResults}
                onChange={(e) => handleNotificationChange('labResults', e.target.value)}
                className="mt-1 block w-full sm:w-1/2 rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 py-2 px-3"
              >
                <option value="in-app">In-App</option>
                <option value="email">Email</option>
                <option value="sms">SMS (Critical Only)</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label htmlFor="apptNotif" className="block text-sm font-medium text-slate-700 dark:text-slate-300">My Upcoming Appointment Reminders</label>
              <select 
                id="apptNotif" 
                value={notificationPrefs.appointmentReminders}
                onChange={(e) => handleNotificationChange('appointmentReminders', e.target.value)}
                className="mt-1 block w-full sm:w-1/2 rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 py-2 px-3"
              >
                <option value="in-app">In-App</option>
                <option value="email">Email</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <CustomButton onClick={() => console.log('Save Notification Prefs:', notificationPrefs)}>Save Notification Settings</CustomButton>
          </div>
        </div>
      </CustomUICard>

      <CustomUICard>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
            <ClockIcon className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
            Availability Settings
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Manage your working hours and availability for appointments. (Placeholder - requires backend integration)
          </p>
          <CustomButton variant="outline">Set Working Hours</CustomButton>
        </div>
      </CustomUICard>

    </div>
  );
}

export default DoctorSettingsPage; 