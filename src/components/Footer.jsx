import React from 'react';
import './Footer.css'; // Import the CSS file

function Footer() {
  return (
    <footer className="site-footer"> {/* Use className */}
      <p>&copy; {new Date().getFullYear()} Med+Rec Inc. All rights reserved.</p>
    </footer>
  );
}

export default Footer; 