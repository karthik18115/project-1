import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/ui/Button';
import CustomUICard from '../../components/ui/Card';
import { CalendarIcon, ClockIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon } from '../../components/icons'; // Assuming these icons exist
import Modal from '../../components/ui/Modal'; // For potential "Add Appointment" modal
import { toast } from 'react-toastify';
import { getDoctorAppointments, postDoctorAppointment } from '../../services/doctorService';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add state for new appointment form if implementing add functionality

  const filteredAppointments = appointments.filter(appt => {
    const appointmentDate = new Date(`${appt.date} ${appt.time}`);
    const now = new Date();
    
    let matchesFilter = true;
    if (filter === 'upcoming') {
      matchesFilter = appointmentDate >= now && appt.status !== 'Cancelled' && appt.status !== 'Completed';
    } else if (filter === 'past') {
      matchesFilter = appointmentDate < now || appt.status === 'Completed';
    } else if (filter === 'cancelled') {
      matchesFilter = appt.status === 'Cancelled';
    }

    const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appt.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appt.type.toLowerCase().includes(searchTerm.toLowerCase());
                          
    return matchesFilter && matchesSearch;
  }).sort((a, b) => new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time));

  // Fetch appointments from API on mount
  useEffect(() => {
    setIsLoading(true);
    getDoctorAppointments()
      .then(data => setAppointments(data))
      .catch(err => { console.error('Failed to fetch appointments:', err); setError(err.message); })
      .finally(() => setIsLoading(false));
  }, []);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddAppointment = (newApptData) => {
    // Create appointment via API
    postDoctorAppointment(newApptData)
      .then(created => {
        setAppointments(prev => [created, ...prev]);
        toast.success('New appointment scheduled successfully!');
        handleCloseModal();
      })
      .catch(err => {
        console.error('Failed to schedule appointment:', err);
        toast.error(err.message || 'Could not schedule appointment.');
      });
  };

  if (isLoading) return (
    <div className="p-6 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-teal-500" role="status" />
      <p className="mt-2 text-slate-500 dark:text-slate-400">Loading appointments...</p>
    </div>
  );
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100">Manage Appointments</h1>
        <CustomButton 
            variant="primary" 
            onClick={handleOpenModal} 
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

          {filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Patient</th>
                    <th scope="col" className="px-6 py-3">Date & Time</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appt) => (
                    <tr key={appt.id || appt.uuid} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                        <div className="flex items-center">
                           <UserCircleIcon className="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" />
                           <div>
                                {appt.patientName}
                                <div className="text-xs text-slate-500 dark:text-slate-400">ID: {appt.patientId}</div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" /> {new Date(appt.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-xs mt-0.5">
                            <ClockIcon className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" /> {appt.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">{appt.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(appt.status)}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {appt.status === 'Confirmed' && (
                          <CustomButton variant="outline" size="xs" onClick={() => alert(`Marking ${appt.patientName} as completed... (mock)`)} className="dark:border-green-500 dark:text-green-400 dark:hover:bg-green-700/50">
                            <CheckCircleIcon className="w-4 h-4 mr-1" /> Complete
                          </CustomButton>
                        )}
                        {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                          <CustomButton variant="danger-outline" size="xs" onClick={() => alert(`Cancelling appointment for ${appt.patientName}... (mock)`)} className="dark:border-red-500 dark:text-red-400 dark:hover:bg-red-700/50">
                             <XCircleIcon className="w-4 h-4 mr-1" /> Cancel
                          </CustomButton>
                        )}
                        {/* Could add View/Edit details button here */} 
                      </td>
                    </tr>
                  ))}
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

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Schedule New Appointment">
          {/* Basic form for new appointment - to be expanded */}
          <form onSubmit={(e) => { e.preventDefault(); 
                const formData = new FormData(e.target);
                handleAddAppointment({
                    patientName: formData.get('patientName'),
                    patientId: formData.get('patientId'),
                    date: formData.get('date'),
                    time: formData.get('time'),
                    type: formData.get('type'),
                }); 
            }} className="space-y-4">
            <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient Name</label>
                <input type="text" name="patientName" id="patientName" required className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient ID</label>
                <input type="text" name="patientId" id="patientId" required className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                    <input type="date" name="date" id="date" required className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"/>
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                    <input type="time" name="time" id="time" required className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"/>
                </div>
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Appointment Type</label>
                <input type="text" name="type" id="type" placeholder="e.g., Consultation, Follow-up" required className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div className="flex justify-end pt-4">
                <CustomButton type="button" variant="ghost" onClick={handleCloseModal} className="mr-2 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</CustomButton>
                <CustomButton type="submit" variant="primary">Schedule Appointment</CustomButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default DoctorAppointmentsPage; 