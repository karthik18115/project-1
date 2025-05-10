import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './DoctorPrescriptionsLogPage.css';

function DoctorPrescriptionsLogPage() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patientName: 'John Doe', medication: 'Aspirin 81mg', dosage: '1 tablet daily', date: '2023-05-15', notes: 'Take with food.' },
    { id: 2, patientName: 'Jane Smith', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', date: '2023-05-10', notes: 'Monitor blood pressure.' },
    { id: 3, patientName: 'Mike Johnson', medication: 'Metformin 500mg', dosage: '1 tablet twice daily', date: '2023-05-05', notes: 'Take with meals.' },
    { id: 4, patientName: 'Sarah Williams', medication: 'Ibuprofen 200mg', dosage: '1-2 tablets every 6 hours as needed', date: '2023-04-28', notes: 'Do not exceed 6 tablets in 24 hours.' },
    { id: 5, patientName: 'Tom Brown', medication: 'Levothyroxine 50mcg', dosage: '1 tablet daily', date: '2023-04-20', notes: 'Take on an empty stomach.' },
    { id: 6, patientName: 'Lisa Davis', medication: 'Atorvastatin 20mg', dosage: '1 tablet daily at bedtime', date: '2023-04-15', notes: 'Monitor cholesterol levels.' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const startEditing = (prescription) => {
    setEditingId(prescription.id);
    setEditValues({ ...prescription });
  };

  const handleEditChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const saveEdit = () => {
    const updatedPrescriptions = prescriptions.map(p => 
      p.id === editingId ? { ...p, ...editValues } : p
    );
    setPrescriptions(updatedPrescriptions);
    setEditingId(null);
    setEditValues({});
    toast.success('Prescription saved successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
    <div className="doctor-prescriptions-log-page">
      <h2>Prescriptions Log</h2>
      <div className="prescriptions-container">
        {prescriptions.length > 0 ? (
          prescriptions.map(prescription => (
            <div key={prescription.id} className="prescription-card">
              <div className="prescription-header">
                <h3>{prescription.patientName}</h3>
                <span className="prescription-date">{prescription.date}</span>
              </div>
              <div className="prescription-body">
                {editingId === prescription.id ? (
                  <>
                    <div className="editable-field">
                      <label><strong>Medication:</strong></label>
                      <input 
                        type="text" 
                        value={editValues.medication} 
                        onChange={(e) => handleEditChange(e, 'medication')} 
                      />
                    </div>
                    <div className="editable-field">
                      <label><strong>Dosage:</strong></label>
                      <input 
                        type="text" 
                        value={editValues.dosage} 
                        onChange={(e) => handleEditChange(e, 'dosage')} 
                      />
                    </div>
                    <div className="editable-field">
                      <label><strong>Notes:</strong></label>
                      <textarea 
                        value={editValues.notes} 
                        onChange={(e) => handleEditChange(e, 'notes')} 
                        rows="3"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Medication:</strong> {prescription.medication}</p>
                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                    <p><strong>Notes:</strong> {prescription.notes}</p>
                  </>
                )}
              </div>
              <div className="prescription-actions">
                {editingId === prescription.id ? (
                  <>
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button className="edit-btn" onClick={() => startEditing(prescription)}>Edit</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-prescriptions-message">No prescriptions found.</div>
        )}
      </div>
    </div>
  );
}

export default DoctorPrescriptionsLogPage; 