import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Layouts & Base Components
import PublicLayout from './components/PublicLayout'; // Assuming a simple layout for public pages (Navbar, Footer)
import HomePage from './pages/HomePage'; // This might be the main app shell after login
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Specific
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardOverview from './pages/admin_dashboard/AdminDashboardOverview';
import AdminUsersPage from './pages/admin_dashboard/AdminUsersPage';
import AdminPendingRequestsPage from './pages/admin_dashboard/AdminPendingRequestsPage';
import AdminLogsPage from './pages/admin_dashboard/AdminLogsPage';
import AdminDoctorPanelPage from './pages/admin_dashboard/AdminDoctorPanelPage';
import AdminEmergencyPanelPage from './pages/admin_dashboard/AdminEmergencyPanelPage';
import AdminLabPanelPage from './pages/admin_dashboard/AdminLabPanelPage';
import AdminPharmacyPanelPage from './pages/admin_dashboard/AdminPharmacyPanelPage';
import AdminSettingsPage from './pages/admin_dashboard/AdminSettingsPage';
// Potentially import other admin pages like AdminUsersPage, AdminPendingRequestsPage etc.

// Patient Dashboard Sub-Pages (examples, assuming they are used within a PatientLayout or HomePage)
import PatientDashboardOverview from './pages/patient_dashboard/PatientDashboardOverview';
import PatientProfile from './pages/patient_dashboard/PatientProfile';
import PatientAppointments from './pages/patient_dashboard/PatientAppointments';
import PatientMedicalRecords from './pages/patient_dashboard/PatientMedicalRecords';
import PatientPrescriptions from './pages/patient_dashboard/PatientPrescriptions';
import DocumentsList from './pages/patient_dashboard/DocumentsList';
import HealthTimeline from './pages/patient_dashboard/HealthTimeline';
import GraphsCharts from './pages/patient_dashboard/GraphsCharts';
import PatientNotificationsHistory from './pages/patient_dashboard/PatientNotificationsHistory';
import PatientMessagesPage from './pages/patient_dashboard/PatientMessagesPage';

// Doctor Dashboard Sub-Pages (examples)
import DoctorDashboardOverview from './pages/doctor_dashboard/DoctorDashboardOverview';
import DoctorPatientQueue from './pages/doctor_dashboard/DoctorPatientQueue';
import DoctorAppointmentsPage from './pages/doctor_dashboard/DoctorAppointmentsPage';
import DoctorCalendarPage from './pages/doctor_dashboard/DoctorCalendarPage';
import DoctorMessagesPage from './pages/doctor_dashboard/DoctorMessagesPage';
import DoctorLabResultsPage from './pages/doctor_dashboard/DoctorLabResultsPage';
import DoctorPrescriptionsLogPage from './pages/doctor_dashboard/DoctorPrescriptionsLogPage';
import DoctorViewPatientProfile from './pages/doctor_dashboard/DoctorViewPatientProfile';
import UserProfilePage from './pages/UserProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import DoctorSettingsPage from './pages/doctor_dashboard/DoctorSettingsPage';
// import DoctorPatientsPage from './pages/doctor_dashboard/DoctorPatientsPage'; // Reverted import

// Other dashboards
import PharmacyDashboardOverview from './pages/pharmacy_dashboard/PharmacyDashboardOverview';
import PharmacyQueuePage from './pages/pharmacy_dashboard/PharmacyQueuePage';
import PharmacyDispensePage from './pages/pharmacy_dashboard/PharmacyDispensePage';
import PharmacyInventoryPage from './pages/pharmacy_dashboard/PharmacyInventoryPage';
import PharmacyPatientInteractionsPage from './pages/pharmacy_dashboard/PharmacyPatientInteractionsPage';
import PharmacyCommunicationPage from './pages/pharmacy_dashboard/PharmacyCommunicationPage';
import PharmacyReportsPage from './pages/pharmacy_dashboard/PharmacyReportsPage';
import PharmacySettingsPage from './pages/pharmacy_dashboard/PharmacySettingsPage';
import LabCenterOverview from './pages/labcenter_dashboard/LabCenterOverview';
import LabRequestsPage from './pages/labcenter_dashboard/LabRequestsPage';
import LabResultsPage from './pages/labcenter_dashboard/LabResultsPage';
import EmergencyDashboardOverview from './pages/emergency_dashboard/EmergencyDashboardOverview';
import EmergencyTriageQueuePage from './pages/emergency_dashboard/EmergencyTriageQueuePage';
import EmergencyHistoryPage from './pages/emergency_dashboard/EmergencyHistoryPage';
import EmergencyPatientQuickAccessPage from './pages/emergency_dashboard/EmergencyPatientQuickAccessPage';
import EmergencyOrdersPage from './pages/emergency_dashboard/EmergencyOrdersPage';
import EmergencyCollaborationPage from './pages/emergency_dashboard/EmergencyCollaborationPage';
import EmergencyProgressPage from './pages/emergency_dashboard/EmergencyProgressPage';
import UniversalHome from './pages/UniversalHome'; // Your existing universal home

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Routes>
          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}> {/* Wraps UniversalHome, Login, Signup */}
            <Route path="/" element={<UniversalHome />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Admin Routes - Uses AdminLayout, wrapped by PrivateRoute */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute allowedRoles={['ADMIN']}> {/* Ensure PrivateRoute can check roles */}
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AdminDashboardOverview />} />
            <Route path="user-management" element={<AdminUsersPage />} />
            <Route path="pending-requests" element={<AdminPendingRequestsPage />} />
            <Route path="logs" element={<AdminLogsPage />} />
            <Route path="doctor-panel" element={<AdminDoctorPanelPage />} />
            <Route path="emergency-panel" element={<AdminEmergencyPanelPage />} />
            <Route path="lab-panel" element={<AdminLabPanelPage />} />
            <Route path="pharmacy-panel" element={<AdminPharmacyPanelPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            {/* Add other admin routes here, e.g.: */}
            {/* <Route path="user-management" element={<AdminUsersPage />} /> */}
            {/* <Route path="pending-requests" element={<AdminPendingRequestsPage />} /> */}
          </Route>

          {/* Doctor Routes - uses DoctorDashboardPage layout */}
          <Route
            path="/app/doctor"
            element={
              <PrivateRoute allowedRoles={[ 'DOCTOR' ]}>
                <DoctorDashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="patient/:patientUuid/profile" element={<DoctorViewPatientProfile />} />
            <Route path="overview" element={<DoctorDashboardOverview />} />
            <Route path="queue" element={<DoctorPatientQueue />} />
            <Route path="appointments" element={<DoctorAppointmentsPage />} />
            <Route path="calendar" element={<DoctorCalendarPage />} />
            <Route path="messages" element={<DoctorMessagesPage />} />
            <Route path="lab-results" element={<DoctorLabResultsPage />} />
            <Route path="prescriptions" element={<DoctorPrescriptionsLogPage />} />
            <Route path="settings" element={<DoctorSettingsPage />} />
          </Route>

          {/* Protected Routes for other roles (e.g., Patient, Doctor) */}
          <Route 
            path="/app" // Example base path for general app features after login
            element={
              <PrivateRoute allowedRoles={[ 'PATIENT', 'DOCTOR', 'PHARMACY', 'LAB_STAFF', 'LABCENTER', 'EMERGENCY_DOCTOR' ]}>
                <HomePage /> {/* HomePage might be a layout for these roles */}
              </PrivateRoute>
            }
          >
            {/* Patient specific routes, assuming HomePage contains a patient layout/outlet */}
            <Route path="patient/dashboard" element={<PatientDashboardOverview />} />
            <Route path="patient/profile" element={<PatientProfile />} />
            <Route path="patient/settings" element={<AccountSettingsPage />} />
            <Route path="patient/appointments" element={<PatientAppointments />} />
            <Route path="patient/medical-records" element={<PatientMedicalRecords />} />
            <Route path="patient/prescriptions" element={<PatientPrescriptions />} />
            <Route path="patient/documents" element={<DocumentsList />} />
            <Route path="patient/timeline" element={<HealthTimeline />} />
            <Route path="patient/graphs" element={<GraphsCharts />} />
            <Route path="patient/notifications" element={<PatientNotificationsHistory />} />
            <Route path="patient/messages" element={<PatientMessagesPage />} />

            {/* Pharmacy specific routes */}
            <Route path="pharmacy/dashboard" element={<PharmacyDashboardOverview />} />
            <Route path="pharmacy/prescriptions-queue" element={<PharmacyQueuePage />} />
            <Route path="pharmacy/inbox" element={<PharmacyQueuePage />} />
            <Route path="pharmacy/logs" element={<PharmacyDispensePage />} />
            <Route path="pharmacy/inventory" element={<PharmacyInventoryPage />} />
            <Route path="pharmacy/patient-interactions" element={<PharmacyPatientInteractionsPage />} />
            <Route path="pharmacy/communication" element={<PharmacyCommunicationPage />} />
            <Route path="pharmacy/reports" element={<PharmacyReportsPage />} />
            <Route path="pharmacy/settings" element={<PharmacySettingsPage />} />
            <Route path="pharmacy/account-settings" element={<AccountSettingsPage />} />
            <Route path="pharmacy/profile" element={<UserProfilePage />} />

            {/* Lab Center specific routes */}
            <Route path="labcenter/dashboard" element={<LabCenterOverview />} />
            <Route path="labcenter/profile" element={<UserProfilePage />} />
            <Route path="labcenter/settings" element={<AccountSettingsPage />} />
            <Route path="labcenter/requests" element={<LabRequestsPage />} />
            <Route path="labcenter/results" element={<LabResultsPage />} />

            {/* Emergency Doctor specific routes */}
            <Route path="emergency/dashboard" element={<EmergencyDashboardOverview />} />
            <Route path="emergency/progress" element={<EmergencyProgressPage />} />
            <Route path="emergency/triage-queue" element={<EmergencyTriageQueuePage />} />
            <Route path="emergency/history" element={<EmergencyHistoryPage />} />
            <Route path="emergency/patient-access" element={<EmergencyPatientQuickAccessPage />} />
            <Route path="emergency/orders" element={<EmergencyOrdersPage />} />
            <Route path="emergency/collaboration" element={<EmergencyCollaborationPage />} />
            <Route path="emergency/profile" element={<UserProfilePage />} />
            <Route path="emergency/settings" element={<AccountSettingsPage />} />
          </Route>

          {/* Fallback for non-matched routes */}
          <Route path="*" element={<div>404 - Page Not Found (Main)</div>} /> 

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
