import { useState, useEffect } from 'react';

function usePatientQueue() {
  const [patientQueue, setPatientQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientQueue = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/doctor/patient-queue');
        if (!response.ok) {
          throw new Error('Failed to fetch patient queue');
        }
        const data = await response.json();
        setPatientQueue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientQueue();
  }, []);

  return { patientQueue, isLoading, error };
}

export default usePatientQueue;