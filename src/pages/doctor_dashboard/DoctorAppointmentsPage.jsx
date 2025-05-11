import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/ui/Button';
import CustomUICard from '../../components/ui/Card';
import { CalendarIcon, ClockIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon, EyeIcon } from '../../components/icons'; // Added EyeIcon
import ScheduleAppointmentModal from './components/ScheduleAppointmentModal'; // Import the new modal
import { toast } from 'react-toastify';
import { getDoctorAppointments, postDoctorAppointment, markAppointmentAsComplete, cancelAppointment } from '../../services/doctorService';
import { useNavigate } from 'react-router-dom'; // Add useNavigate hook

// Helper to get status styles
const getStatusStyles = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300';
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300';
    case 'Cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300';
    case 'Pending Confirmation':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  }
};

function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past', 'cancelled'
  const [searchTerm, setSearchTerm] = useState('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add useNavigate hook
  // Add state for new appointment form if implementing add functionality

  const fetchAppointments = () => {
    setIsLoading(true);
    getDoctorAppointments()
      .then(data => {
        // Ensure data is an array before setting
        setAppointments(Array.isArray(data) ? data : []);
        setError(null); // Clear previous errors on success
      })
      .catch(err => {
        console.error('Failed to fetch appointments:', err);
        setError(err.message || 'Could not fetch appointments.');
        setAppointments([]); // Clear appointments on error
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appt => {
    // Assuming appt.appointmentDateTime is a full ISO string from backend after DTO change.
    // If appt.date and appt.time are still separate, this part needs adjustment.
    // For now, let's assume appt.appointmentDateTime exists and is a string.
    const appointmentDate = appt.appointmentDateTime ? new Date(appt.appointmentDateTime) : new Date();
    const now = new Date();
    
    let matchesFilter = true;
    if (filter === 'upcoming') {
      matchesFilter = appointmentDate >= now && appt.status !== 'Cancelled' && appt.status !== 'Completed';
    } else if (filter === 'past') {
      matchesFilter = appointmentDate < now || appt.status === 'Completed';
    } else if (filter === 'cancelled') {
      matchesFilter = appt.status === 'Cancelled';
    }

    // Assuming patient info might be nested in a 'patient' object in appt after backend update
    const patientName = appt.patient?.fullName || appt.patientName || '';
    const patientId = appt.patient?.uuid || appt.patientId || ''; // Using uuid if available
    const appointmentType = appt.department || appt.type || ''; // Using department if available

    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointmentType.toLowerCase().includes(searchTerm.toLowerCase());
                          
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    const dateA = a.appointmentDateTime ? new Date(a.appointmentDateTime) : 0;
    const dateB = b.appointmentDateTime ? new Date(b.appointmentDateTime) : 0;
    return dateA - dateB;
  });

  const handleOpenScheduleModal = () => setIsScheduleModalOpen(true);
  const handleCloseScheduleModal = () => setIsScheduleModalOpen(false);

  const handleSaveNewAppointment = (newAppointmentData) => {
    // newAppointmentData comes from ScheduleAppointmentModal
    // It should be { patientUuid, appointmentDateTime, department, notes }
    postDoctorAppointment(newAppointmentData)
      .then(createdAppointment => {
        // Add the newly created appointment to the list
        // The backend should return the full appointment object including its new ID/UUID
        setAppointments(prev => [createdAppointment, ...prev]); 
        toast.success('New appointment scheduled successfully!');
        handleCloseScheduleModal();
        fetchAppointments(); // Re-fetch to ensure list is up-to-date with all server-side transformations
      })
      .catch(err => {
        console.error('Failed to schedule appointment:', err);
        toast.error(err.data?.message || err.message || 'Could not schedule appointment.');
        // Optionally, keep the modal open or pass error to modal to display
      });
  };

  const handleUpdateAppointmentStatus = (appointmentId, newStatus) => {
    const action = newStatus === 'Completed' ? markAppointmentAsComplete : cancelAppointment;
    const successMessage = `Appointment ${newStatus.toLowerCase()} successfully.`;
    const errorMessage = `Could not mark appointment as ${newStatus.toLowerCase()}.`;

    action(appointmentId)
      .then(updatedAppointment => {
        // Update the specific appointment in the local state
        setAppointments(prevAppointments => 
          prevAppointments.map(appt => 
            appt.uuid === appointmentId ? updatedAppointment : appt
          )
        );
        toast.success(successMessage);
        // fetchAppointments(); // Or re-fetch the whole list if preferred
      })
      .catch(err => {
        console.error(`Failed to ${newStatus.toLowerCase()} appointment:`, err);
        toast.error(err.data?.message || err.message || errorMessage);
      });
  };

  if (isLoading) return (
    <div className="p-6 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-teal-500" role="status" />
      <p className="mt-2 text-slate-500 dark:text-slate-400">Loading appointments...</p>
    </div>
  );
  if (error && appointments.length === 0) return <div className="p-6 text-red-500">Error: {error}</div>;
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100">Manage Appointments</h1>
        <CustomButton 
            variant="solid" // Changed to solid for primary action
            onClick={handleOpenScheduleModal} 
            className="flex items-center"
        >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Schedule New Appointment
        </CustomButton>
      </header>

      <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input 
              type="text"
              placeholder="Search by patient name, ID, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past/Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {error && appointments.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400 rounded-md">
                <p>Error fetching updates: {error}. Displaying potentially stale data.</p>
            </div>
          )}

          {filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Patient</th>
                    <th scope="col" className="px-6 py-3">Date & Time</th>
                    <th scope="col" className="px-6 py-3">Department/Type</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appt) => {
                    const appointmentDate = appt.appointmentDateTime ? new Date(appt.appointmentDateTime) : null;
                    const patientName = appt.patient?.fullName || appt.patientName || 'N/A';
                    const patientId = appt.patient?.uuid || appt.patientId || 'N/A';
                    const displayDepartment = appt.department || appt.type || 'N/A';

                    return (
                    <tr key={appt.uuid} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                        <div className="flex items-center">
                           <UserCircleIcon className="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" />
                           <div>
                                {patientName}
                                <div className="text-xs text-slate-500 dark:text-slate-400">ID: {patientId}</div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {appointmentDate ? (
                            <>
                                <div className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" /> {appointmentDate.toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-xs mt-0.5">
                                    <ClockIcon className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" /> {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </>
                        ) : 'Date/Time N/A'}
                      </td>
                      <td className="px-6 py-4">{displayDepartment}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(appt.status)}`}>
                          {appt.status || 'Pending Confirmation'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-1">
                        <CustomButton 
                          variant="link"
                          size="xs"
                          onClick={() => appt.patient?.uuid && navigate(`/app/doctor/patient/${appt.patient.uuid}/profile`)}
                          disabled={!appt.patient?.uuid}
                          title="View Patient Profile"
                          className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 p-1"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </CustomButton>
                        
                        {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                          <CustomButton 
                            variant="outline"
                            size="xs" 
                            onClick={() => handleUpdateAppointmentStatus(appt.uuid, 'Completed')} 
                            title="Mark as Completed"
                            className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-700/50 p-1"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </CustomButton>
                        )}
                        
                        {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                          <CustomButton 
                            variant="danger-outline"
                            size="xs" 
                            onClick={() => handleUpdateAppointmentStatus(appt.uuid, 'Cancelled')} 
                            title="Cancel Appointment"
                            className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-700/50 p-1"
                          >
                             <XCircleIcon className="w-5 h-5" />
                          </CustomButton>
                        )}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">No Appointments Found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Adjust your filters or search term, or schedule a new appointment.</p>
            </div>
          )}
        </div>
      </CustomUICard>

      {/* Use the new ScheduleAppointmentModal */}
      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onSaveNewAppointment={handleSaveNewAppointment}
        // We could pass a patientUuid here if scheduling from a patient-specific context
      />
    </div>
  );
}

export default DoctorAppointmentsPage; 