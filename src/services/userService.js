// Base URL for the API. Adjust if your backend is on a different port or domain.
const API_BASE_URL = '/api'; // Example: 'http://localhost:8080/api' if not proxied

// Helper function to get authorization headers
// This is a placeholder. In a real app, you'd get the token from localStorage, Redux store, etc.
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); // Example: retrieve token
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.data = errorData;
    error.status = response.status;
    throw error;
  }
  // If response is OK but has no content (e.g., for 204 No Content)
  if (response.status === 204) {
    return null; 
  }
  return response.json();
};

/**
 * Fetches all users for the admin.
 * GET /api/admin/users
 */
export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

/**
 * Admin creates a new user.
 * POST /api/admin/users
 * @param {object} userData - The user data to create.
 */
export const adminCreateUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

/**
 * Admin updates an existing user.
 * PUT /api/admin/users/{userId}
 * @param {string} userId - The ID of the user to update.
 * @param {object} userData - The updated user data.
 */
export const adminUpdateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

/**
 * Admin toggles the status of a user (e.g., Active/Inactive).
 * This could also be part of adminUpdateUser by including 'status' in userData.
 * If a dedicated endpoint exists: PUT /api/admin/users/{userId}/status
 * @param {string} userId - The ID of the user.
 * @param {object} statusData - e.g., { status: 'Active' } or { status: 'Inactive' }
 */
export const adminToggleUserStatus = async (userId, statusData) => {
  // Assuming a dedicated endpoint like /api/admin/users/{userId}/status
  // If not, this function might need to call adminUpdateUser with the full user object + new status
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(statusData), 
  });
  return handleResponse(response);
};

// You might also need functions for deleting users if that's a requirement.
// export const adminDeleteUser = async (userId) => {
//   const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
//     method: 'DELETE',
//     headers: getAuthHeaders(),
//   });
//   return handleResponse(response); // Or handle 204 No Content specifically
// }; 