import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ title = '', links = [], className = '' }) {
  return (
    <aside 
      className={`bg-white shadow-md w-64 p-4 space-y-4 ${className}`} 
      
      role="complementary"
    >
      {title && <h2 className="text-xl font-semibold tracking-wide text-slate-700">{title}</h2>}
      <nav>
        <ul className="space-y-2">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-lg font-semibold ${isActive ? 'bg-teal-100 text-teal-600' : 'text-slate-700 hover:bg-teal-50'}`
                }
              >
                {icon && <span className="text-lg">{icon}</span>}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 