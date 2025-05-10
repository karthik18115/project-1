import React, { useState } from 'react';
import { Search, Bell, UserCircle, ChevronDown, LogOut, Settings, User } from 'lucide-react'; // Example icons

export default function TopBar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* Search Bar - Placeholder */}
      <div className="flex items-center">
        <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-2" />
        <input 
          type="search" 
          placeholder="Search anything..." 
          className="bg-transparent focus:outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>

      {/* Right-side icons and profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell - Placeholder */}
        <button 
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800"
          aria-label="View notifications"
        >
          <Bell className="w-6 h-6" />
          {/* Add a badge for notification count if needed */}
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
          >
            <UserCircle className="w-8 h-8 text-slate-600 dark:text-slate-300" /> 
            {/* <img src="/path-to-admin-avatar.jpg" alt="Admin" className="w-8 h-8 rounded-full" /> */}
            <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-200">Admin Name</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div 
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 dark:ring-slate-600 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <a href="#profile" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600" role="menuitem">
                <User className="w-4 h-4 mr-2" /> Profile
              </a>
              <a href="#settings" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600" role="menuitem">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </a>
              <hr className="border-slate-200 dark:border-slate-600 my-1" />
              <a href="#logout" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600" role="menuitem">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 