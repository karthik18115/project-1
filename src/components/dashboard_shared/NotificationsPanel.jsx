import React from 'react';
import { Link } from 'react-router-dom';
import './NotificationsPanel.css';

function NotificationsPanel({ notifications, onClose, onMarkAsRead, onMarkAllAsRead }) {
  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <div className="notifications-panel" role="dialog" aria-modal="true" aria-labelledby="notifications-panel-title">
      <div className="panel-header">
        <h5 id="notifications-panel-title">Notifications</h5>
        <button onClick={onClose} className="close-panel-button" aria-label="Close notifications panel">&times;</button>
      </div>
      {unreadNotifications.length > 0 && (
        <button onClick={onMarkAllAsRead} className="mark-all-read-button">
          Mark all as read
        </button>
      )}
      <div className="notifications-list">
        {notifications.length === 0 && <p className="no-notifications">No new notifications.</p>}
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
            <Link to={notification.link || '#'} className="notification-link" onClick={() => {!notification.isRead && onMarkAsRead(notification.id); onClose();}}>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-timestamp">{notification.timestamp}</span>
            </Link>
            {!notification.isRead && (
              <button 
                onClick={() => onMarkAsRead(notification.id)} 
                className="mark-as-read-btn"
                aria-label={`Mark notification '${notification.message.substring(0,20)}...' as read`}
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="panel-footer">
        <Link to="/dashboard/patient/notifications_history" onClick={onClose} className="view-all-link">
          View all notifications
        </Link>
      </div>
    </div>
  );
}

export default NotificationsPanel; 