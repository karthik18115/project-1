import React from 'react';
import './DoctorCalendarPage.css';

function DoctorCalendarPage() {
  return (
    <div className="doctor-calendar-page">
      <h2 className="page-title">Calendar</h2>
      <section className="calendar-section">
        <h3>Schedule Overview</h3>
        <div className="calendar-grid-container">
          <div className="calendar-placeholder">
            <p>Calendar view will be displayed here.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DoctorCalendarPage; 