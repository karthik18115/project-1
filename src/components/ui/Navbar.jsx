import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ links = [], className = '' }) {
  return (
    <nav 
      className={`bg-white shadow-md ${className}`} 
      
      role="navigation"
    >
      <ul className="flex space-x-6 p-4">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `font-semibold text-base tracking-wide ${isActive ? 'text-teal-600' : 'text-slate-600'} hover:text-teal-500`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
} 