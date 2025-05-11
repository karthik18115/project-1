import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/ui/Button'; // Assuming a general Button component
import { XIcon } from 'lucide-react'; // For the close button

const ScheduleAppointmentModal = ({ isOpen, onClose, onSaveNewAppointment, patientUuid: initialPatientUuid = '' }) => {
  const [patientUuid, setPatientUuid] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [department, setDepartment] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialPatientUuid) {
      setPatientUuid(initialPatientUuid);
    }
    // Reset form when modal is opened/closed or initialPatientUuid changes
    if (!isOpen) {
      setPatientUuid('');
      setAppointmentDateTime('');
      setDepartment('');
      setNotes('');
      setError('');
    } else {
      // If modal is opening with a new initialPatientUuid, set it.
      // Otherwise, if it's just re-opening, don't clear if initialPatientUuid is the same.
      // This handles the case where it's opened from a patient context.
      setPatientUuid(initialPatientUuid);
    }
  }, [isOpen, initialPatientUuid]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!patientUuid || !appointmentDateTime || !department) {
      setError('Patient UUID, Appointment Date/Time, and Department are required.');
      return;
    }

    // Basic validation for date format (YYYY-MM-DDTHH:mm)
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(appointmentDateTime)) {
        setError('Appointment Date/Time must be in YYYY-MM-DDTHH:mm format.');
        return;
    }
    
    // TODO: Add more robust validation as needed (e.g., patient UUID format, department from list)

    onSaveNewAppointment({
      patientUuid,
      appointmentDateTime,
      department,
      notes,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Schedule New Appointment</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <XIcon size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="patientUuid" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Patient UUID
            </label>
            <input
              type="text"
              id="patientUuid"
              value={patientUuid}
              onChange={(e) => setPatientUuid(e.target.value)}
              placeholder="Enter patient UUID"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
            {/* Future enhancement: Searchable patient dropdown */}
          </div>

          <div>
            <label htmlFor="appointmentDateTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Appointment Date & Time
            </label>
            <input
              type="datetime-local"
              id="appointmentDateTime"
              value={appointmentDateTime}
              onChange={(e) => setAppointmentDateTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., Cardiology, General Medicine"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
            {/* Future enhancement: Dropdown with predefined departments */}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="Any additional notes for the appointment"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <CustomButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton type="submit" variant="solid">
              Schedule Appointment
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal; 