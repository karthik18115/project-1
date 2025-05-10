import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../ui/Button'; // Assuming Button component is available
import { XIcon, UserCircleIcon, DocumentTextIcon, BeakerIcon, BellAlertIcon, HeartIcon, ClipboardDocumentListIcon, ChatBubbleLeftEllipsisIcon } from '../icons'; // Updated and added icons

function PatientDetailPreviewPanel({ patient, onClose }) {
  if (!patient) return null;

  // Fallback for potentially missing data
  const patientName = patient.name || 'N/A';
  const patientAge = patient.age || 'N/A';
  const patientGender = patient.gender || 'N/A';
  const patientDOB = patient.dob || 'N/A';
  const patientAllergies = patient.allergies && patient.allergies.length > 0 ? patient.allergies : ['None reported'];
  const latestVitals = patient.latestVitals || { hr: 'N/A', bp: 'N/A', temp: 'N/A', spO2: 'N/A' };
  const currentMedications = patient.currentMedications && patient.currentMedications.length > 0 ? patient.currentMedications : ['None prescribed'];
  const recentNotesSummary = patient.recentNotesSummary || 'No recent notes available.';
  const keyDiagnoses = patient.keyDiagnoses && patient.keyDiagnoses.length > 0 ? patient.keyDiagnoses : ['None specified'];

  // Define common text and list styles for dark mode
  const sectionTitleClass = "text-md font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center";
  const textMutedClass = "text-sm text-slate-500 dark:text-slate-400";
  const listClass = "list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300";
  const valueTextClass = "text-slate-800 dark:text-slate-100";

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-75 flex justify-end z-50 transition-opacity duration-300 ease-in-out" 
        onClick={onClose}
    >
      <div 
        className="w-full max-w-md h-full bg-white dark:bg-slate-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{patientName}</h3>
          <CustomButton variant="ghost" size="icon" onClick={onClose} className="dark:text-slate-400 dark:hover:bg-slate-700">
            <XIcon className="w-6 h-6" />
          </CustomButton>
        </div>

        {/* Panel Content - Scrollable */}
        <div className="flex-grow p-6 space-y-5 overflow-y-auto">
            <div className="text-sm text-slate-600 dark:text-slate-300">
                <p><strong className={valueTextClass}>{patientAge}</strong> years old, <strong className={valueTextClass}>{patientGender}</strong></p>
                {patientDOB !== 'N/A' && <p>DOB: <strong className={valueTextClass}>{patientDOB}</strong></p>}
                {patient.room && <p>Room: <strong className={valueTextClass}>{patient.room}</strong></p>}
            </div>

            <div className="panel-section">
                <h4 className={sectionTitleClass}><BellAlertIcon className="w-5 h-5 mr-2 text-red-500 dark:text-red-400"/> Allergies:</h4>
                <ul className={listClass}>
                    {patientAllergies.map((allergy, index) => <li key={index}>{allergy}</li>)}
                </ul>
            </div>

            <div className="panel-section">
                <h4 className={sectionTitleClass}><HeartIcon className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400"/> Latest Vitals:</h4>
                <p className={textMutedClass}>HR: <strong className={valueTextClass}>{latestVitals.hr} bpm</strong>, BP: <strong className={valueTextClass}>{latestVitals.bp}</strong>, SpO2: <strong className={valueTextClass}>{latestVitals.spO2}%</strong>, Temp: <strong className={valueTextClass}>{latestVitals.temp}°C</strong></p>
            </div>

            <div className="panel-section">
                <h4 className={sectionTitleClass}><UserCircleIcon className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" /> Current Medications:</h4>
                <ul className={listClass}>
                    {currentMedications.map((med, index) => <li key={index}>{med}</li>)}
                </ul>
            </div>

            <div className="panel-section">
                <h4 className={sectionTitleClass}><ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" /> Key Diagnoses / Conditions:</h4>
                <ul className={listClass}>
                    {patient.condition && <li>Primary: {patient.condition}</li>} 
                    {keyDiagnoses.map((diag, index) => <li key={index}>{diag}</li>)}
                </ul>
            </div>

            <div className="panel-section">
                <h4 className={sectionTitleClass}><ChatBubbleLeftEllipsisIcon className="w-5 h-5 mr-2 text-yellow-500 dark:text-yellow-400"/> Recent Notes Summary:</h4>
                <p className={`${textMutedClass} italic`}>{recentNotesSummary}</p>
            </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-2">
          <CustomButton 
            as={Link} 
            to={`/doctor/patient/${patient.id}/profile`} // Update path as per routing structure
            variant="primary" 
            className="flex-1 flex items-center justify-center"
            onClick={onClose} // Close panel on navigation
          >
            <UserCircleIcon className="w-5 h-5 mr-2" /> View Full Profile
          </CustomButton>
          <CustomButton variant="outline" className="flex-1 flex items-center justify-center dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            <DocumentTextIcon className="w-5 h-5 mr-2" /> Add Note
          </CustomButton>
          <CustomButton variant="outline" className="flex-1 flex items-center justify-center dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            <BeakerIcon className="w-5 h-5 mr-2" /> Order Test
          </CustomButton>
        </div>
        
        {/* CSS for slide-in animation - will be handled by Tailwind config or global CSS */}
        {/* <style>
          {`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .animate-slide-in {
              animation: slideIn 0.3s ease-out forwards;
            }
          `}
        </style> */}
      </div>
    </div>
  );
}

export default PatientDetailPreviewPanel; 