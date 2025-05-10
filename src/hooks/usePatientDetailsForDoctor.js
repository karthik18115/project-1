import { useState, useEffect } from 'react';

// --- MOCK DATA for Doctor View ---
const MOCK_PATIENT_DETAILS = {
  P001: {
    id: 'P001',
    name: 'John Doe',
    dateOfBirth: '1980-05-15',
    gender: 'Male',
    contact: {
      phone: '555-123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, Anytown, USA'
    },
    primaryCarePhysician: 'Dr. Smith', // Assuming current doctor is PCP
    insurance: { provider: 'MediCare Plus', policyNumber: 'MC123456789' },
    emergencyContacts: [{id: 'ec1', name: 'Jane Doe', relationship: 'Spouse', phone: '555-987-6543'}],
    allergies: [{id: 'a1', name: "Peanuts", severity: "High"}, {id: 'a2', name: "Codeine", severity: "Medium"}],
    chronicConditions: [{id: 'c1', name: "Hypertension"}, {id: 'c2', name: "Type 2 Diabetes"}],
    currentMedications: [
        {id: 'm1', name: 'Lisinopril 10mg', status: 'Active', startDate: '2022-01-10', prescriber: 'Dr. Smith'},
        {id: 'm2', name: 'Metformin 500mg', status: 'Active', startDate: '2021-11-20', prescriber: 'Dr. endocrinologist'},
    ],
    pastMedications: [
        {id: 'pm1', name: 'Amoxicillin 500mg', status: 'Completed', startDate: '2023-05-01', endDate: '2023-05-10', reason: 'Infection'}
    ],
    immunizations: [
        {id: 'i1', name: 'Influenza Vaccine', date: '2023-10-15'},
        {id: 'i2', name: 'COVID-19 Booster', date: '2023-11-01'},
    ],
    recentVitals: [
      { date: '2024-08-15 10:00', hr: 75, bp: '135/85', temp: 98.6, spO2: 97 },
      { date: '2024-07-20 14:30', hr: 72, bp: '130/82', temp: 98.4, spO2: 98 },
    ],
    clinicalNotes: [
      { id: 'n1', date: '2024-08-15', title: 'Check-up Visit', author: 'Dr. Smith', summary: 'Routine check-up. BP slightly elevated, continue Lisinopril. Discussed diet and exercise. Follow up in 3 months.', content: '<p>Routine check-up. BP slightly elevated, continue Lisinopril. Discussed diet and exercise. Follow up in 3 months.</p>' },
      { id: 'n2', date: '2024-05-10', title: 'Follow-up', author: 'Dr. Smith', summary: 'Reviewed lab results. A1C improved. Continue Metformin.', content: '<p>Reviewed lab results. A1C improved. Continue Metformin.</p>' }
    ],
    labResults: [
      { id: 'lab1', date: '2024-05-05', testName: 'Comprehensive Metabolic Panel', status: 'Completed', link: '/path/to/lab1.pdf' },
      { id: 'lab2', date: '2024-08-16', testName: 'Lipid Panel', status: 'Pending', link: null },
    ],
  },
  P002: {
    id: 'P002',
    name: 'Jane Smith',
    dateOfBirth: '1990-02-20',
    gender: 'Female',
    contact: { phone: '555-111-2222', email: 'jane.smith@email.com', address: '456 Oak Ave, Anytown, USA' },
    primaryCarePhysician: 'Dr. Smith',
    insurance: { provider: 'BlueCross Shield', policyNumber: 'BCBS98765' },
    emergencyContacts: [{id: 'ec1', name: 'Robert Smith', relationship: 'Father', phone: '555-333-4444'}],
    allergies: [{id: 'a1', name: "Penicillin", severity: "High"}],
    chronicConditions: [{id: 'c1', name: "Asthma (Mild)"}],
    currentMedications: [
      {id: 'm3', name: 'Ventolin Inhaler', status: 'Active (As Needed)', startDate: '2020-01-01', prescriber: 'Dr. Smith'}
    ],
    pastMedications: [],
    immunizations: [
      {id: 'i1', name: 'Influenza Vaccine', date: '2023-10-20'},
    ],
    recentVitals: [
      { date: '2024-08-10 09:30', hr: 80, bp: '120/75', temp: 98.7, spO2: 99 },
    ],
    clinicalNotes: [
      { id: 'n3', date: '2024-08-10', title: 'Acute Visit - Cough', author: 'Dr. Smith', summary: 'Patient presented with cough. Lungs clear. Suspect viral URI. Recommended rest and fluids.', content: '<p>Patient presented with cough. Lungs clear. Suspect viral URI. Recommended rest and fluids.</p>' }
    ],
    labResults: [],
  },
  // Add more mock patients as needed
  P003: { id: 'P003', name: 'Robert Brown', dateOfBirth: '1955-11-01', gender: 'Male', /* ... add more details */ },
  P004: { id: 'P004', name: 'Emily White', dateOfBirth: '1995-07-12', gender: 'Female', /* ... add more details */ },
  P005: { id: 'P005', name: 'Michael Green', dateOfBirth: '1973-03-25', gender: 'Male', /* ... add more details */ }, 
};

function usePatientDetailsForDoctor(patientId) {
  const [patientDetails, setPatientDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchPatientDetails = () => {
      setTimeout(() => {
        // To make updates persist across re-renders of the hook for the same patient,
        // we should always refer to the MOCK_PATIENT_DETAILS as the source of truth
        // and then set local state from it.
        const details = MOCK_PATIENT_DETAILS[patientId] ? { ...MOCK_PATIENT_DETAILS[patientId] } : null;
        if (details) {
          setPatientDetails(details);
          setIsLoading(false);
        } else {
          setError('Patient not found');
          setPatientDetails(null); // Clear details if not found
          setIsLoading(false);
        }
      }, 300); // Reduced delay for quicker updates
    };

    if (patientId) {
      fetchPatientDetails();
    } else {
      setError('No patient ID provided');
      setPatientDetails(null);
      setIsLoading(false);
    }
  }, [patientId]);

  const addClinicalNote = (pId, noteContent) => {
    // Update the MOCK_PATIENT_DETAILS first so changes are "persistent" for this mock setup
    if (MOCK_PATIENT_DETAILS[pId]) {
      const newNote = {
        id: `note-${Date.now()}`,
        title: noteContent.substring(0, 50).replace(/<[^>]+>/g, '') + '...',
        summary: noteContent.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
        content: noteContent,
        date: new Date().toISOString(),
        author: 'Dr. CurrentUser' // Placeholder
      };
      
      // Ensure clinicalNotes array exists
      if (!MOCK_PATIENT_DETAILS[pId].clinicalNotes) {
        MOCK_PATIENT_DETAILS[pId].clinicalNotes = [];
      }
      MOCK_PATIENT_DETAILS[pId].clinicalNotes.unshift(newNote); // Add to the beginning

      // Now update the local state for the component using the hook
      setPatientDetails(prevDetails => ({
        ...prevDetails, // This should be the current state for THIS patientId
        clinicalNotes: [newNote, ...(prevDetails?.clinicalNotes || [])]
      }));
      return true; // Indicate success
    } else {
      console.error("Attempted to add note to non-existent patient in mock:", pId);
      return false; // Indicate failure
    }
  };

  return { patientDetails, isLoading, error, addClinicalNote }; // Return the new function
}

export default usePatientDetailsForDoctor; 