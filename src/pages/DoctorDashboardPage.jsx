import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarNav from './doctor_dashboard/components/SidebarNav';
import DashboardNavbar from '../components/DashboardNavbar'; // Assuming this is the shared one
import './DoctorDashboardPage.css';

// Placeholder Icons (can be replaced with actual icons later)
const OverviewIcon = () => <span>📊</span>;
const QueueIcon = () => <span>👥</span>;
const AppointmentsIcon = () => <span>🗓️</span>;
const CalendarIcon = () => <span>📅</span>;
const MessagesIcon = () => <span>💬</span>;
const LabsIcon = () => <span>🔬</span>;
const PrescriptionsIcon = () => <span>℞</span>;
const SettingsIcon = () => <span>⚙️</span>;
const MenuIcon = () => <span>☰</span>;
const CloseIcon = () => <span>✕</span>;


function DoctorDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine the title for DashboardNavbar based on the current route
  const getTitle = () => {
    const path = location.pathname;
    if (path.endsWith('/overview')) return 'Dashboard Overview';
    if (path.endsWith('/queue')) return 'Patient Queue';
    if (path.endsWith('/appointments')) return 'My Appointments';
    if (path.endsWith('/calendar')) return 'My Calendar';
    if (path.endsWith('/messages')) return 'Messages & Consults';
    if (path.endsWith('/lab-results')) return 'Lab Results';
    if (path.endsWith('/prescriptions')) return 'Prescriptions Log';
    if (path.endsWith('/settings')) return 'Settings';
    return 'Doctor Dashboard'; // Default title
  };

  const sidebarNavItems = [
    { to: '/app/doctor/overview', label: 'Overview', icon: <OverviewIcon /> },
    { to: '/app/doctor/queue', label: 'Patient Queue', icon: <QueueIcon /> },
    { to: '/app/doctor/appointments', label: 'Appointments', icon: <AppointmentsIcon /> },
    { to: '/app/doctor/calendar', label: 'Calendar', icon: <CalendarIcon /> },
    { to: '/app/doctor/messages', label: 'Messages', icon: <MessagesIcon /> },
    { to: '/app/doctor/lab-results', label: 'Lab Results', icon: <LabsIcon /> },
    { to: '/app/doctor/prescriptions', label: 'Prescriptions', icon: <PrescriptionsIcon /> },
    { to: '/app/doctor/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <div className={`doctor-dashboard-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <DashboardNavbar navTitle={getTitle()} onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <SidebarNav />
      <main className="doctor-dashboard-main-content">
        <Outlet /> 
      </main>
      {isSidebarOpen && <div className="mobile-sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}

export default DoctorDashboardPage; 