import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, // Dashboard Overview
  Users,           // User Management & Pending Signup Requests (can use the same)
  UserCheck,       // Pending Signup Requests (alternative)
  Briefcase,       // Doctor Panel
  ShieldAlert,     // Emergency Panel
  FlaskConical,    // Lab Center Panel
  Pill,            // Pharmacy Panel
  FileText,        // Reports & Logs
  Settings,        // Settings
  LogOut           // Logout (example for bottom)
} from 'lucide-react'; // Example icons from Lucide

const navigationItems = [
  { name: 'Dashboard Overview', href: '/admin/overview', icon: LayoutDashboard },
  { name: 'User Management', href: '/admin/user-management', icon: Users },
  { name: 'Pending Requests', href: '/admin/pending-requests', icon: UserCheck },
  { name: 'Doctor Panel', href: '/admin/doctor-panel', icon: Briefcase },
  { name: 'Emergency Panel', href: '/admin/emergency-panel', icon: ShieldAlert },
  { name: 'Lab Center Panel', href: '/admin/lab-panel', icon: FlaskConical },
  { name: 'Pharmacy Panel', href: '/admin/pharmacy-panel', icon: Pill },
  { name: 'System Logs', href: '/admin/logs', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const baseLinkClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg";
  const inactiveLinkClasses = "text-slate-300 hover:bg-slate-700 hover:text-white";
  const activeLinkClasses = "bg-sky-600 text-white"; // Example active class, Tailwind primary color often sky or blue

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 text-slate-100 p-4 space-y-2 flex flex-col shadow-lg">
      {/* Logo/Branding */}
      <div className="px-4 py-3 mb-4 border-b border-slate-700">
        <h1 className="text-2xl font-semibold text-white flex items-center">
          <span className="text-3xl mr-2" role="img" aria-label="medical">🏥</span>
          MedRec Admin
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) => 
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/Logout (Example) */}
      <div className="mt-auto pt-4 border-t border-slate-700">
        <NavLink
          to="/logout" // Or handle logout via onClick
          className={`${baseLinkClasses} ${inactiveLinkClasses}`}
        >
          <LogOut className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
          Logout
        </NavLink>
      </div>
    </aside>
  );
} 