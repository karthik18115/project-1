import React from 'react';
import { Menu, X } from 'lucide-react';
import UserProfileDropdown from './UserProfileDropdown';

export default function DashboardNavbar({ navTitle, onToggleSidebar, isSidebarOpen, user, onLogout }) {
  return (
    <header className="dashboard-navbar-component flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 shadow h-16 z-40 sticky top-0">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="mr-3 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 focus:outline-none">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{navTitle}</h1>
      </div>
      <div className="flex items-center">
        <UserProfileDropdown user={user} onLogout={onLogout} />
      </div>
    </header>
  );
} 