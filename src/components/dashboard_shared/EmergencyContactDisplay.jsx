import React from 'react';
import './EmergencyContactDisplay.css';

function EmergencyContactDisplay({ contacts }) {
  if (!contacts || contacts.length === 0) {
    return <p>No emergency contacts listed.</p>;
  }

  return (
    <div className="emergency-contact-card">
      <h4>Emergency Contacts</h4>
      {contacts.map((contact, index) => (
        <div key={index} className="contact-entry">
          <p><strong>{contact.name}</strong> ({contact.relationship})</p>
          <p>Phone: {contact.phone}</p>
        </div>
      ))}
      {/* Button to edit would typically link to profile edit section */}
    </div>
  );
}

export default EmergencyContactDisplay; 