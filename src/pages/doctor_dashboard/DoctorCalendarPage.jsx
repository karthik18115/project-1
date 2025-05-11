import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './DoctorCalendarPage.css';
import { getDoctorCalendar, getDoctorPatientsList, postDoctorAppointment } from '../../services/doctorService';
import CustomUICard from '../../components/ui/Card';
import { toast } from 'react-toastify';
import ScheduleAppointmentModal from './components/ScheduleAppointmentModal';
import Skeleton from 'react-loading-skeleton';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function DoctorCalendarPage() {
  const [events, setEvents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [error, setError] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);

  useEffect(() => {
    setLoadingEvents(true);
    getDoctorCalendar()
      .then(data => {
        const formattedEvents = data.map(appt => ({
          id: appt.uuid || appt.id,
          title: `Appt with ${appt.patient?.fullName || appt.patientName || 'Patient'} (${appt.department || 'General'})`,
          start: new Date(appt.appointmentDateTime),
          end: appt.appointmentEndDateTime ? new Date(appt.appointmentEndDateTime) : new Date(new Date(appt.appointmentDateTime).getTime() + 60 * 60 * 1000),
          allDay: appt.allDay || false, 
          notes: appt.notes || '',
          data: appt
        }));
        setEvents(formattedEvents);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch calendar events:", err);
        setError('Failed to load calendar events. Please try again later.');
        toast.error('Failed to load calendar events.');
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  useEffect(() => {
    setLoadingPatients(true);
    getDoctorPatientsList()
        .then(data => setPatients(data || []))
        .catch(err => {
            console.error("Failed to fetch patients for modal:", err);
            toast.error("Could not load patient list for scheduling.");
        })
        .finally(() => setLoadingPatients(false));
  }, []);

  const handleSelectSlot = (slotInfo) => {
    if (loadingPatients || patients.length === 0) {
        toast.warn("Patient list is still loading or empty. Please wait to schedule.");
        return;
    }
    setSelectedSlotInfo(slotInfo);
    setIsScheduleModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    toast.info(
        `Event: ${event.title}\n` +
        `Starts: ${event.start.toLocaleString()}\n` +
        `Ends: ${event.end.toLocaleString()}\n` +
        `Notes: ${event.notes || 'N/A'}`,
        { autoClose: 10000 }
    );
    console.log("Selected event:", event);
  };

  const handleSaveNewAppointment = async (appointmentData) => {
    try {
      const newAppointment = await postDoctorAppointment(appointmentData);
      toast.success('Appointment scheduled successfully!');
      setIsScheduleModalOpen(false);
      setSelectedSlotInfo(null);
      setEvents(prevEvents => [...prevEvents, {
        id: newAppointment.uuid || newAppointment.id,
        title: `Appt with ${newAppointment.patient?.fullName || appointmentData.patientName || 'Patient'} (${newAppointment.department || 'General'})`,
        start: new Date(newAppointment.appointmentDateTime),
        end: newAppointment.appointmentEndDateTime ? new Date(newAppointment.appointmentEndDateTime) : new Date(new Date(newAppointment.appointmentDateTime).getTime() + 60 * 60 * 1000),
        allDay: newAppointment.allDay || false,
        notes: newAppointment.notes || ''
      }]);
    } catch (err) {
      console.error("Failed to schedule appointment:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to schedule appointment. Please try again.");
    }
  };

  if (loadingEvents) {
    return <div className="p-4 text-center">Loading calendar...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 md:p-6 doctor-calendar-page">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6">My Calendar</h1>
      <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
        <div className="p-4 h-[70vh]">
          {loadingPatients && <p className='text-sm text-center text-slate-500 dark:text-slate-400 py-2'>Loading patient list for scheduling...</p>}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100% - 20px)' }}
            views={['month', 'week', 'day', 'agenda']}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </CustomUICard>

      {isScheduleModalOpen && selectedSlotInfo && (
        <ScheduleAppointmentModal
          isOpen={isScheduleModalOpen}
          onClose={() => {
            setIsScheduleModalOpen(false);
            setSelectedSlotInfo(null);
          }}
          onSaveAppointment={handleSaveNewAppointment}
          patients={patients}
          initialData={{ appointmentDateTime: selectedSlotInfo.start.toISOString() }}
        />
      )}
    </div>
  );
}

export default DoctorCalendarPage; 