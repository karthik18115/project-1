// Base URL for the API
const API_BASE_URL = '/api';

// Helper to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred.' }));
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.data = errorData;
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
};

/**
 * Fetch doctor dashboard overview
 * GET /api/doctor/dashboard
 */
export const getDoctorDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/dashboard`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch patient queue
 * GET /api/doctor/queue
 */
export const getDoctorQueue = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/queue`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch appointments
 * GET /api/doctor/appointments
 */
export const getDoctorAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/appointments`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Create a new appointment
 * POST /api/doctor/appointments
 */
export const postDoctorAppointment = async (apptData) => {
  const response = await fetch(`${API_BASE_URL}/doctor/appointments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(apptData),
  });
  return handleResponse(response);
};

/**
 * Fetch messages
 * GET /api/doctor/messages
 */
export const getDoctorMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/messages`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch calendar events
 * GET /api/doctor/calendar
 */
export const getDoctorCalendar = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/calendar`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch lab results
 * GET /api/doctor/lab-results
 */
export const getDoctorLabResults = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/lab-results`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch prescriptions log
 * GET /api/doctor/prescriptions
 */
export const getDoctorPrescriptionsLog = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/prescriptions`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Create a new prescription
 * POST /api/doctor/prescriptions
 * @param {object} prescriptionData - Data for the new prescription
 */
export const createPrescription = async (prescriptionData) => {
  const response = await fetch(`${API_BASE_URL}/doctor/prescriptions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(prescriptionData),
  });
  return handleResponse(response);
};

/**
 * Fetch all patients for a doctor
 * GET /api/doctor/patients
 */
export const getDoctorPatientsList = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/patients`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch a specific patient's profile for doctor view
 * GET /api/doctor/patients/{patientUuid}
 */
export const getPatientProfileForDoctor = async (patientUuid) => {
  const response = await fetch(`${API_BASE_URL}/doctor/patients/${patientUuid}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Add a new patient by a doctor.
 * This uses the general signup endpoint but with role hardcoded to ROLE_PATIENT.
 * POST /api/auth/signup
 * @param {object} patientData - Object containing patient details (fullName, email, mobile, dateOfBirth, gender, password)
 */
export const addPatientByDoctor = async (patientData) => {
  const payload = {
    ...patientData,
    role: 'ROLE_PATIENT', // Ensure role is correctly set
    // twoFactorPreference will default to false if not sent, which is fine for doctor-created patients.
  };
  const response = await fetch(`${API_BASE_URL}/auth/signup`, { // Corrected endpoint
    method: 'POST',
    headers: getAuthHeaders(), // Auth header might not be strictly needed for public signup, but good practice if endpoint is secured
    body: JSON.stringify(payload),
  });
  return handleResponse(response); // Assuming signup returns a success/error message similar to other endpoints
};

/**
 * Mark an appointment as completed.
 * POST /api/doctor/appointments/{appointmentId}/complete
 * @param {string} appointmentId - The UUID of the appointment.
 */
export const markAppointmentAsComplete = async (appointmentId) => {
  const response = await fetch(`${API_BASE_URL}/doctor/appointments/${appointmentId}/complete`, {
    method: 'POST',
    headers: getAuthHeaders(),
    // No body needed for this request as per current backend design
  });
  return handleResponse(response);
};

/**
 * Cancel an appointment.
 * POST /api/doctor/appointments/{appointmentId}/cancel
 * @param {string} appointmentId - The UUID of the appointment.
 */
export const cancelAppointment = async (appointmentId) => {
  const response = await fetch(`${API_BASE_URL}/doctor/appointments/${appointmentId}/cancel`, {
    method: 'POST',
    headers: getAuthHeaders(),
    // No body needed for this request
  });
  return handleResponse(response);
};

// Messaging Service Functions

/**
 * Fetch message contacts for the doctor
 * GET /api/doctor/messages/contacts
 */
export const getDoctorMessageContacts = async () => {
  const response = await fetch(`${API_BASE_URL}/doctor/messages/contacts`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch messages for a specific contact/thread
 * GET /api/doctor/messages/contact/{contactId}
 */
export const getMessagesForContact = async (contactId) => {
  const response = await fetch(`${API_BASE_URL}/doctor/messages/contact/${contactId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Post a new message to a contact
 * POST /api/doctor/messages/contact/{contactId}
 * @param {string} contactId - The UUID of the contact (recipient).
 * @param {object} messageData - Object containing message details, e.g., { content: "Hello!" }.
 */
export const postDoctorMessage = async (contactId, messageData) => {
  const response = await fetch(`${API_BASE_URL}/doctor/messages/contact/${contactId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(messageData),
  });
  return handleResponse(response);
};

/**
 * Update an existing prescription
 * PUT /api/doctor/prescriptions/{prescriptionId}
 * @param {string} prescriptionId - The UUID of the prescription to update.
 * @param {object} prescriptionData - Data for updating the prescription.
 */
export const updatePrescription = async (prescriptionId, prescriptionData) => {
  const response = await fetch(`${API_BASE_URL}/doctor/prescriptions/${prescriptionId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(prescriptionData),
  });
  return handleResponse(response);
};

/**
 * Add a clinical note for a patient
 * POST /api/doctor/patients/{patientUuid}/notes 
 * @param {string} patientUuid - The UUID of the patient.
 * @param {object} noteData - Object containing note details, e.g., { content: "Patient reported feeling better." }.
 */
export const addClinicalNoteForPatient = async (patientUuid, noteData) => {
  const response = await fetch(`${API_BASE_URL}/doctor/patients/${patientUuid}/notes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(noteData),
  });
  return handleResponse(response);
};