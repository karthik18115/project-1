import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal'; // Assuming a generic Modal component exists
import CustomButton from '../ui/Button';
import { getDoctorPatientsList } from '../../services/doctorService'; // To fetch patients
import { toast } from 'react-toastify';

function AddPrescriptionModal({ isOpen, onClose, onSavePrescription, initialPatientUuid }) {
  const [patients, setPatients] = useState([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [selectedPatientUuid, setSelectedPatientUuid] = useState(initialPatientUuid || '');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoadingPatients(true);
      getDoctorPatientsList()
        .then(data => setPatients(data || []))
        .catch(err => {
          console.error("Failed to fetch patients for modal:", err);
          toast.error("Could not load patient list for prescribing.");
          setPatients([]); // Ensure patients is an array
        })
        .finally(() => setIsLoadingPatients(false));
      
      // Reset form fields when modal opens, unless initialPatientUuid is provided
      if (initialPatientUuid) {
        setSelectedPatientUuid(initialPatientUuid);
      } else {
        setSelectedPatientUuid('');
      }
      setMedication('');
      setDosage('');
      setFrequency('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      setNotes('');
    }
  }, [isOpen, initialPatientUuid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientUuid) {
      toast.warn('Please select a patient.');
      return;
    }
    if (!medication || !dosage || !frequency || !startDate) {
      toast.warn('Patient, Medication, Dosage, Frequency, and Start Date are required.');
      return;
    }
    setIsSaving(true);
    try {
      await onSavePrescription({
        patientUuid: selectedPatientUuid,
        medication,
        dosage,
        frequency,
        startDate,
        endDate: endDate || null, // Send null if empty
        notes
      });
      // onClose(); // The parent component will handle closing on success
    } catch (error) {
      // Error toast is likely handled by onSavePrescription or parent
      console.error("Error in handleSubmit AddPrescriptionModal:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const inputClass = "mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 py-2 px-3 text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Prescription">
      <form onSubmit={handleSubmit} className="space-y-4 p-1">
        <div>
          <label htmlFor="patient" className={labelClass}>Patient:</label>
          {isLoadingPatients ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading patients...</p>
          ) : patients.length > 0 ? (
            <select
              id="patient"
              value={selectedPatientUuid}
              onChange={(e) => setSelectedPatientUuid(e.target.value)}
              className={inputClass}
              required
            >
              <option value="" disabled>Select a patient</option>
              {patients.map(p => (
                <option key={p.uuid} value={p.uuid}>{p.fullName} (ID: {p.uuid.substring(0,8)})</option>
              ))}
            </select>
          ) : (
             <p className="text-sm text-red-500 dark:text-red-400">No patients found or failed to load. Cannot add prescription.</p>
          )}
        </div>

        <div>
          <label htmlFor="medication" className={labelClass}>Medication:</label>
          <input
            id="medication"
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className={inputClass}
            required
            placeholder="e.g., Amoxicillin 250mg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dosage" className={labelClass}>Dosage:</label>
              <input
                id="dosage"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className={inputClass}
                required
                placeholder="e.g., 1 tablet"
              />
            </div>
            <div>
              <label htmlFor="frequency" className={labelClass}>Frequency:</label>
              <input
                id="frequency"
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={inputClass}
                required
                placeholder="e.g., 3 times a day"
              />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className={labelClass}>Start Date:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className={labelClass}>End Date (Optional):</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClass}
                min={startDate} // End date cannot be before start date
              />
            </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>Instructions/Notes (Optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className={inputClass}
            placeholder="e.g., Take with food. Finish entire course."
          />
        </div>

        <div className="pt-3 flex justify-end space-x-3">
          <CustomButton type="button" variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </CustomButton>
          <CustomButton type="submit" isLoading={isSaving} disabled={isSaving || isLoadingPatients || patients.length === 0}>
            {isSaving ? 'Saving...' : 'Save Prescription'}
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
}

export default AddPrescriptionModal;
