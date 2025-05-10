import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './ui/Navbar';
import Footer from './Footer';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Sign Up' },
];

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar links={navLinks} />
      <main className="flex flex-1 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
} 