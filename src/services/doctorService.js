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