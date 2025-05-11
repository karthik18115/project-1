import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // Assuming you have Heroicons

export default function UserProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    // Or some other placeholder/loading state if user is being fetched
    return (
      <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400">
        Login
      </Link>
    );
  }

  const userInitial = user.fullName ? user.fullName.charAt(0).toUpperCase() : <UserCircleIcon className="w-5 h-5" />;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-teal-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="User avatar" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-sm font-semibold">{userInitial}</span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
              {user.fullName || 'User Name'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email || 'user@example.com'}
            </p>
          </div>
          {/* Optional: Add links to profile or settings if applicable for the role */}
          {/* <Link
            to={user.role === 'PATIENT' ? "/app/patient/profile" : "/app/doctor/settings"} // Example
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link> */}
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
            role="menuitem"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 