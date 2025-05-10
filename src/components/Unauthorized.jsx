import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/login" className="back-link">Back to Login</Link>
    </div>
  );
};

export default Unauthorized; 