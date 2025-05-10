import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar'; // Assuming you have or will create a Navbar for public pages
// import Footer from './Footer'; // Assuming you have or will create a Footer for public pages

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1">
        {/* Public page content will be rendered here by Outlet */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
} 