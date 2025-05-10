import { useState, useEffect } from 'react';

// Mock data hook (replace with actual fetching logic later)
const usePatientMedicalData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        // Consistent patient data structure as used by LabResultPdfDocument
        name: "Ms. Jane Doe (Medical Records)",
        patientId: "P7891011",
        dateOfBirth: "1985-08-22",
        gender: "Female",

        allergies: [{id: 'a1', name: "Peanuts", severity: "High"}, {id: 'a2', name: "Penicillin", severity: "Medium"}],
        chronicConditions: [{id: 'c1', name: "Hypertension"}, {id: 'c2', name: "Asthma (Mild)"}],
        medications: [
            {id: 'm1', name: 'Lisinopril 10mg', status: 'Active'},
            {id: 'm2', name: 'Metformin 500mg', status: 'Active'},
            {id: 'm3', name: 'Ventolin Inhaler', status: 'Active (As Needed)'}
        ],
        immunizations: [
            {id: 'i1', name: 'Influenza Vaccine', date: '2023-10-15'},
            {id: 'i2', name: 'COVID-19 Booster (Moderna)', date: '2023-11-01'},
        ],
        procedures: [
            {id: 'p1', name: 'Appendectomy', date: '2015-03-10'},
        ],
        labReports: [
          {
            reportId: "LAB_MR_001",
            reportName: "Lipid Panel (Medical Records)",
            collectionDate: "2024-07-15",
            reportDate: "2024-07-16",
            orderingPhysician: "Dr. Sarah Miller",
            performingLab: "City Central Laboratory",
            specimenType: "Blood, Serum",
            status: "Final",
            tests: [
              { testId: 'chol', name: 'Cholesterol, Total', value: '220', units: 'mg/dL', referenceRange: '<200', flag: 'High' },
              { testId: 'ldl', name: 'LDL Cholesterol', value: '140', units: 'mg/dL', referenceRange: '<100', flag: 'High' },
              { testId: 'hdl', name: 'HDL Cholesterol', value: '55', units: 'mg/dL', referenceRange: '>40', flag: 'Normal' },
            ],
            notes: 'Patient shows elevated LDL cholesterol. Lifestyle adjustments recommended.',
          },
          {
            reportId: "LAB_MR_002",
            reportName: "Thyroid Panel (Medical Records)",
            collectionDate: "2024-06-10",
            reportDate: "2024-06-11",
            orderingPhysician: "Dr. John Davis",
            performingLab: "Precision Diagnostics Inc.",
            specimenType: "Blood, Plasma",
            status: "Final",
            tests: [
              { testId: 'tsh', name: 'TSH', value: '2.5', units: 'mIU/L', referenceRange: '0.4 - 4.0', flag: 'Normal' },
              { testId: 'vitd', name: 'Vitamin D', value: '35', units: 'ng/mL', referenceRange: '30 - 100', flag: 'Normal' },
            ],
            notes: 'All results within normal limits.',
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};

export default usePatientMedicalData; 