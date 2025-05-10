export const APP_NAME = 'MedRecord System';

export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

export const STATUS_TAGS = {
  NORMAL: { label: 'Normal', color: '#27ae60' },
  URGENT: { label: 'Urgent', color: '#e74c3c' },
  ABNORMAL: { label: 'Abnormal', color: '#f39c12' },
  CONFIRMED: { label: 'Confirmed', color: '#27ae60' },
  COMPLETED: { label: 'Completed', color: '#3498db' },
  CANCELLED: { label: 'Cancelled', color: '#7f8c8d' },
};

export const PRIORITY_TAGS = {
  HIGH: { label: 'High Priority', color: '#e74c3c' },
  MEDIUM: { label: 'Medium Priority', color: '#f39c12' },
  LOW: { label: 'Low Priority', color: '#27ae60' },
};

export const FILTER_OPTIONS = {
  DATE_RANGES: [
    { label: 'All Time', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom', value: 'custom' },
  ],
  DEPARTMENTS: [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Neurology',
    'Orthopedics',
    'Gynecology',
    'Ophthalmology',
  ],
  TEST_TYPES: [
    'Blood Test',
    'Urine Analysis',
    'Cholesterol Panel',
    'Blood Glucose',
    'Thyroid Function',
    'Complete Blood Count',
    'X-Ray',
    'MRI',
  ],
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Invalid credentials. Please try again.',
  SIGNUP_SUCCESS: 'Account created successfully!',
  SIGNUP_ERROR: 'Error creating account. Please try again.',
  APPOINTMENT_BOOKED: 'Appointment booked successfully!',
  APPOINTMENT_ERROR: 'Error booking appointment. Please try again.',
  LAB_RESULT_UPLOADED: 'Lab result uploaded successfully!',
  LAB_RESULT_ERROR: 'Error uploading lab result. Please try again.',
  PRESCRIPTION_SAVED: 'Prescription saved successfully!',
  PRESCRIPTION_ERROR: 'Error saving prescription. Please try again.',
  MESSAGE_SENT: 'Message sent successfully!',
  MESSAGE_ERROR: 'Error sending message. Please try again.',
}; 