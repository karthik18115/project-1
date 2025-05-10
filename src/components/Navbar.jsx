import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Import the CSS for the navbar
import NotificationBell from './dashboard_shared/NotificationBell'; // Import NotificationBell

function Navbar() {
  // Placeholder: in a real app, unreadCount would come from context/state/API
  const unreadNotificationCount = 2; // Example

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Med+Rec Inc.</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {/* We can add conditional links here based on auth state later */}
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link primary-nav-link">Sign Up</Link>
        {/* Placeholder for authenticated user section */}
        <div className="navbar-user-section">
          <NotificationBell unreadCount={unreadNotificationCount} />
          {/* <Link to="/dashboard/patient" className="nav-link">My Dashboard</Link> */}
          {/* Logout button would go here too for logged-in users */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 