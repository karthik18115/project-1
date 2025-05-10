// Base URL for the API
const API_BASE_URL = '/api'; // Adjust if backend uses different base path

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
 * Fetch system logs
 * GET /api/admin/logs
 */
export const getLogs = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/logs`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch doctor panel metrics
 * GET /api/admin/doctor-panel
 */
export const getDoctorPanel = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/doctor-panel`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch emergency panel metrics
 * GET /api/admin/emergency-panel
 */
export const getEmergencyPanel = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/emergency-panel`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch lab panel metrics
 * GET /api/admin/lab-panel
 */
export const getLabPanel = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/lab-panel`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch pharmacy panel metrics
 * GET /api/admin/pharmacy-panel
 */
export const getPharmacyPanel = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/pharmacy-panel`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Fetch admin settings
 * GET /api/admin/settings
 */
export const getSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/settings`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Update admin settings
 * PUT /api/admin/settings
 */
export const updateSettings = async (settingsData) => {
  const response = await fetch(`${API_BASE_URL}/admin/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(settingsData),
  });
  return handleResponse(response);
}; 