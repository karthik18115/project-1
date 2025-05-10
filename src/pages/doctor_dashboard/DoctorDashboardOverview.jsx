import React, { useState, useEffect } from 'react';
import CustomUICard from '../../components/ui/Card';
import CustomButton from '../../components/ui/Button';
import { CalendarIcon, PatientsIcon, NotesIcon } from '../../components/icons';
import { getDoctorDashboard } from '../../services/doctorService';
import { toast } from 'react-toastify';

// Import the new components
import StatsSummary from './components/StatsSummary';
import QuickActions from './components/QuickActions';

function DoctorDashboardOverview() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctorDashboard()
      .then(res => setData(res))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Prepare stats for StatsSummary
  const summaryStats = [
    {
      title: "Today's Appointments",
      value: data?.todayAppointments || 0,
      details: <><span className="text-inherit">{data?.todayCompleted || 0} Completed</span><span className="ml-2 text-inherit">{data?.todayPending || 0} Pending</span></>,
      colorTheme: "blue",
      icon: <CalendarIcon className="w-6 h-6" />
    },
    {
      title: "This Week",
      value: `${data?.weekTotalPatients || 0} Patients`,
      details: <span className="text-inherit">{data?.weekNoShow || 0} No-shows</span>,
      colorTheme: "blue",
      icon: <PatientsIcon className="w-6 h-6" />
    }
    // QuickActions will be a separate component, not part of summaryStats
  ];

  const appointments = data?.upcomingAppointments || [];
  const recentPatients = data?.recentPatients || [];

  // Placeholder handlers for QuickActions
  const handleAddPatient = () => {
    toast.info("Add Patient clicked (Not Implemented)");
  };
  const handleSchedule = () => {
    toast.info("Schedule clicked (Not Implemented)");
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400">
        Error loading dashboard: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Doctor Dashboard</h2>

      {/* Use StatsSummary and QuickActions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsSummary stats={summaryStats.slice(0, 2)} isLoading={isLoading} /> {/* Pass first two stats */}
        <CustomUICard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 border-l-4 border-blue-500 dark:border-blue-400">
          <div className="p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Quick Actions</h3>
            <QuickActions onAddPatient={handleAddPatient} onSchedule={handleSchedule} />
          </div>
        </CustomUICard>
      </div>

      {/* Upcoming Appointments */}
      <CustomUICard className="overflow-hidden border border-blue-100 dark:border-slate-700">
        <div className="bg-blue-500 dark:bg-blue-600 px-4 py-2">
          <h3 className="text-lg font-medium text-white flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" /> Today's Schedule
          </h3>
        </div>
        <div className="p-4">
          {appointments.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-slate-700">
              {appointments.map(appt => (
                <div key={appt.uuid || appt.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{appt.patientName || `Appointment ${appt.uuid?.substring(0,8)}`}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{appt.department || 'General'} • {new Date(appt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300' : 
                      appt.status === 'Checked In' ? 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300' : 
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300'
                    }`}>
                      {appt.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No appointments scheduled for today.</p>
          )}
        </div>
        <div className="bg-blue-50 dark:bg-slate-700/50 px-4 py-2 text-right">
          <CustomButton variant="text" size="sm" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" to="/app/doctor/appointments">
            View Full Schedule
          </CustomButton>
        </div>
      </CustomUICard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <CustomUICard className="border border-blue-100 dark:border-slate-700">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center">
              <PatientsIcon className="w-5 h-5 mr-2" /> Recent Patients
            </h3>
            {recentPatients.length > 0 ? (
              <ul className="space-y-3">
                {recentPatients.map(patient => (
                  <li key={patient.id} className="p-3 bg-blue-50 dark:bg-slate-700/70 rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium text-slate-800 dark:text-slate-100">{patient.name}, {patient.age}</p>
                      <span className="text-xs text-blue-700 dark:text-blue-400">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{patient.condition}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No recent patients.</p>
            )}
          </div>
          <div className="bg-blue-50 dark:bg-slate-700/50 px-4 py-2 text-right">
            <CustomButton variant="text" size="sm" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" to="/app/doctor/queue">
              View Patient Queue
            </CustomButton>
          </div>
        </CustomUICard>

        {/* Notes / Tasks */}
        <CustomUICard className="border border-blue-100 dark:border-slate-700">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center">
              <NotesIcon className="w-5 h-5 mr-2" /> Personal Notes
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md border-l-4 border-yellow-400 dark:border-yellow-600">
                <p className="text-sm text-slate-700 dark:text-slate-200">Follow up with John Doe about lab results</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md border-l-4 border-blue-400 dark:border-blue-600">
                <p className="text-sm text-slate-700 dark:text-slate-200">Research new treatment options for Patient #2468</p>
              </div>
            </div>
            <div className="mt-3">
              <CustomButton variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-slate-700 w-full" onClick={() => toast.info("Add New Note Clicked (Not Implemented)")}>
                + Add New Note
              </CustomButton>
            </div>
          </div>
        </CustomUICard>
      </div>
    </div>
  );
}

export default DoctorDashboardOverview; 