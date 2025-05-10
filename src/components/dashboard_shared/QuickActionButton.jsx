import React from 'react';
import './QuickActionButton.css';

// Placeholder for icons
const PlaceholderActionIcon = ({label}) => <div className="action-icon-placeholder">{label?.[0] || 'A'}</div>;

function QuickActionButton({ label, onClick, icon, actionType }) {
  // actionType could be 'primary', 'secondary' for different styling
  return (
    <button onClick={onClick} className={`quick-action-button ${actionType || ''}`}>
      {icon || <PlaceholderActionIcon label={label}/>}
      <span>{label}</span>
    </button>
  );
}

export default QuickActionButton; 