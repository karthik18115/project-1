import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityItem.css';

// Placeholder for icons based on activity type
const ActivityIcon = ({ type }) => {
  let icon = '📝'; // Default
  if (type === 'APPOINTMENT_BOOKED') icon = '📅';
  if (type === 'LAB_RESULT_UPLOADED') icon = '🔬';
  if (type === 'PRESCRIPTION_REFILLED') icon = '💊';
  return <span className="activity-item-icon" aria-hidden="true">{icon}</span>;
};

function ActivityItem({ activity }) {
  const { type, description, timestamp, link } = activity;

  return (
    <div className="activity-item">
      <ActivityIcon type={type} />
      <div className="activity-item-content">
        <p className="activity-description">
          {link ? <Link to={link}>{description}</Link> : description}
        </p>
        <span className="activity-timestamp">{timestamp}</span>
      </div>
    </div>
  );
}

export default ActivityItem; 