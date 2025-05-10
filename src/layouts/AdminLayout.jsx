import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/layout/Sidebar';
import TopBar from '../components/admin/layout/TopBar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar />

        {/* Page content rendered by React Router */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
} 