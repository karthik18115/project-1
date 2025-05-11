import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../../components/ui/Button';
import { ChartIcon, CalendarIcon, PatientsIcon, NotesIcon, LabIcon, PrescriptionIcon, CogIcon } from '../../../components/icons';

const navItems = [
  { to: '/app/doctor/overview', label: 'Overview', icon: <ChartIcon /> },
  { to: '/app/doctor/appointments', label: 'Appointments', icon: <CalendarIcon /> },
  { to: '/app/doctor/queue', label: 'Patient Queue', icon: <PatientsIcon /> },
  // { to: '/app/doctor/patients', label: 'Patients', icon: <PatientsIcon /> }, // Reverted new item
  { to: '/app/doctor/calendar', label: 'Calendar', icon: <CalendarIcon /> },
  { to: '/app/doctor/messages', label: 'Messages', icon: <NotesIcon /> },
  { to: '/app/doctor/lab-results', label: 'Lab Results', icon: <LabIcon /> },
  { to: '/app/doctor/prescriptions', label: 'Prescriptions', icon: <PrescriptionIcon /> },
];

export default function SidebarNav() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 shadow-lg p-6 space-y-6 hidden md:flex md:flex-col">
      {/* Logo/Brand */}
      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        <Link to="/app/doctor/overview">MedRec</Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.to}>
              <CustomButton
                to={item.to}
                variant="ghost"
                className="w-full flex items-center justify-start space-x-3 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400"
                activeClassName="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-200 font-semibold"
              >
                {React.cloneElement(item.icon, { className: 'w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400' })}
                <span>{item.label}</span>
              </CustomButton>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto">
        <CustomButton
          to="/app/doctor/settings"
          variant="ghost"
          className="w-full flex items-center justify-start space-x-3 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400"
          activeClassName="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-200 font-semibold"
        >
          <CogIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
          <span>Settings</span>
        </CustomButton>
      </div>
    </aside>
  );
} 