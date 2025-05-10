import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomButton from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import AddNoteForm from '../../components/doctor/AddNoteForm';
import { 
    ArrowLeftIcon, PencilIcon, DocumentPlusIcon, BeakerIcon, // Actions
    BellAlertIcon, ClipboardDocumentListIcon, HeartIcon, // Medical Summary (part of patientDetails)
    DocumentTextIcon // Clinical Notes icon
} from '../../components/icons';
import usePatientDetailsForDoctor from '../../hooks/usePatientDetailsForDoctor';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

// Import EHRViewer
import EHRViewer from './components/EHRViewer';
import CustomUICard from '../../components/ui/Card'; // Keep for other cards

// Helper to format DOB for display
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString();
    } catch (e) {
        return dateString; // Return original if formatting fails
    }
};

function DoctorViewPatientProfile() {
  const { patientId } = useParams();
  const { patientDetails, isLoading, error, addClinicalNote } = usePatientDetailsForDoctor(patientId);

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  const handleActionClick = (action) => {
    // Keep Edit Demographics for EHRViewer, others are separate buttons
    if (action === 'New Prescription' || action === 'Order Lab') {
      toast.info(`Action: ${action} clicked for patient ${patientId} (Not Implemented)`);
    }
    if (action === 'Edit Demographics') {
      toast.info(`Edit Demographics clicked for patient ${patientId} (Not Implemented)`);
    }
  };

  const handleOpenAddNoteModal = () => {
    setIsAddNoteModalOpen(true);
  };

  const handleCloseNoteModal = () => {
    setIsAddNoteModalOpen(false);
  };

  const handleSaveNote = (noteContent) => {
    if (addClinicalNote(patientId, noteContent)) {
      toast.success('Clinical note added successfully!');
    } else {
      toast.error('Failed to add clinical note.');
    }
    handleCloseNoteModal();
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-slate-100 dark:bg-slate-900 min-h-full animate-pulse">
        <header className="flex items-center justify-between mb-6">
          <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
              <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-64"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-9 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-9 w-32 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-9 w-28 bg-slate-300 dark:bg-slate-600 rounded"></div>
          </div>
        </header>
        <CustomUICard className="dark:bg-slate-800"><div className="p-6"><Skeleton count={5} /></div></CustomUICard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomUICard className="dark:bg-slate-800"><div className="p-6"><Skeleton count={4} /></div></CustomUICard>
            <CustomUICard className="dark:bg-slate-800"><div className="p-6"><Skeleton count={4} /></div></CustomUICard>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-4 md:p-6 bg-slate-100 dark:bg-slate-900 min-h-full">
        <Link to="/app/doctor/queue" className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:underline mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Patient Queue
        </Link>
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error || 'Could not fetch patient details.'}</span>
        </div>
      </div>
    );
  }

  // Success State - Render Patient Details
  const { name, dateOfBirth, gender, contact, insurance, emergencyContacts, allergies, chronicConditions, currentMedications, recentVitals, clinicalNotes, labResults } = patientDetails || {};
  const sectionTitleClass = "text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center justify-between";
  const mutedTextClass = "text-sm text-slate-500 dark:text-slate-400";
  const valueTextClass = "text-slate-800 dark:text-slate-100";

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-100 dark:bg-slate-900 min-h-full">
      {/* Header with Back Button and Actions */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
            <CustomButton 
                variant="ghost" 
                to="/app/doctor/queue" 
                className="flex items-center text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 mb-2 pl-0"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Patient Queue
            </CustomButton>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100">
                {name || `Patient: ${patientId}`}
            </h1>
             {dateOfBirth && gender && <p className={mutedTextClass}>DOB: {formatDate(dateOfBirth)} ({gender})</p>}
        </div>
        <div className="flex space-x-2 flex-wrap gap-2 sm:gap-0">
           <CustomButton variant="outline" size="sm" onClick={handleOpenAddNoteModal} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                <DocumentPlusIcon className="w-4 h-4 mr-1.5"/> Add Note
            </CustomButton>
            <CustomButton variant="outline" size="sm" onClick={() => handleActionClick('New Prescription')} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                <PencilIcon className="w-4 h-4 mr-1.5"/> New Rx
            </CustomButton>
            <CustomButton variant="outline" size="sm" onClick={() => handleActionClick('Order Lab')} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                <BeakerIcon className="w-4 h-4 mr-1.5"/> Order Lab
            </CustomButton>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Demographics, Medical Summary) */}
        <div className="lg:col-span-1 space-y-6">
            {/* Use EHRViewer for Demographics */}
            <EHRViewer 
              demographics={{ contact, insurance, emergencyContacts }} 
              onEdit={() => handleActionClick('Edit Demographics')} 
            />

            {/* Medical Summary Card */}
            <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
                 <div className="p-4 sm:p-6">
                    <h2 className={sectionTitleClass}>Medical Summary</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center"><BellAlertIcon className="w-4 h-4 mr-1.5 text-red-500 dark:text-red-400"/> Allergies</h3>
                            <ul className={`${mutedTextClass} list-disc list-inside ml-1`}>
                                {allergies?.map(a => <li key={a.id}>{a.name} ({a.severity})</li>) || <li>None reported</li>}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center"><ClipboardDocumentListIcon className="w-4 h-4 mr-1.5 text-purple-500 dark:text-purple-400"/> Chronic Conditions</h3>
                            <ul className={`${mutedTextClass} list-disc list-inside ml-1`}>
                                {chronicConditions?.map(c => <li key={c.id}>{c.name}</li>) || <li>None reported</li>}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center"><HeartIcon className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400"/> Recent Vitals</h3>
                            {recentVitals?.[0] ? (
                                <p className={mutedTextClass}> 
                                    {new Date(recentVitals[0].date).toLocaleString()}: HR {recentVitals[0].hr}, BP {recentVitals[0].bp}, SpO2 {recentVitals[0].spO2}% 
                                </p>
                            ) : <p className={mutedTextClass}>No recent vitals recorded.</p>}
                        </div>
                    </div>
                </div>
            </CustomUICard>
        </div>

        {/* Right Column (Medications, Notes, Labs/Activity) */}
        <div className="lg:col-span-2 space-y-6">
            {/* Medications Card */}
            <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
                 <div className="p-4 sm:p-6">
                    <h2 className={sectionTitleClass}>
                        <span><UserCircleIcon className="w-5 h-5 mr-2 inline-block text-green-500 dark:text-green-400" /> Medications</span>
                         <CustomButton variant="ghost" size="xs" onClick={() => handleActionClick('New Prescription')} className="dark:text-slate-400 dark:hover:bg-slate-700">+ New Rx</CustomButton>
                    </h2>
                    <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300 mt-3 mb-1">Active</h3>
                    {currentMedications && currentMedications.length > 0 ? (
                        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                            {currentMedications.map(med => (
                                <li key={med.id} className="py-2 text-sm">
                                    <p className={valueTextClass}>{med.name} ({med.status})</p>
                                    <p className={mutedTextClass}>Prescribed by {med.prescriber} on {formatDate(med.startDate)}</p>
                                </li>
                            ))}
                        </ul>
                    ) : <p className={mutedTextClass}>No active medications.</p>}
                </div>
            </CustomUICard>

            {/* Clinical Notes Card */}
            <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
                 <div className="p-4 sm:p-6">
                    <h2 className={sectionTitleClass}>
                        <span><DocumentTextIcon className="w-5 h-5 mr-2 inline-block text-yellow-500 dark:text-yellow-400"/> Clinical Notes</span>
                         <CustomButton variant="ghost" size="xs" onClick={handleOpenAddNoteModal} className="dark:text-slate-400 dark:hover:bg-slate-700">+ Add Note</CustomButton>
                    </h2>
                    {clinicalNotes && clinicalNotes.length > 0 ? (
                        <ul className="divide-y divide-slate-100 dark:divide-slate-700 max-h-60 overflow-y-auto">
                            {clinicalNotes.map(note => (
                                <li key={note.id} className="py-3">
                                    <p className={`${valueTextClass} font-medium`}>{note.title} <span className={`${mutedTextClass} text-xs`}>({formatDate(note.date)} by {note.author})</span></p>
                                    <p className={`${mutedTextClass} mt-1 text-xs`}>{note.summary}</p>
                                </li>
                            ))}
                        </ul>
                    ) : <p className={mutedTextClass}>No clinical notes found.</p>}
                 </div>
            </CustomUICard>

            {/* Lab Results / Recent Activity Card */}
            <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
                 <div className="p-4 sm:p-6">
                     <h2 className={sectionTitleClass}>
                        <span><BeakerIcon className="w-5 h-5 mr-2 inline-block text-indigo-500 dark:text-indigo-400"/> Lab Results</span>
                        <CustomButton variant="ghost" size="xs" onClick={() => handleActionClick('Order Lab')} className="dark:text-slate-400 dark:hover:bg-slate-700">+ Order Lab</CustomButton>
                    </h2>
                    {labResults && labResults.length > 0 ? (
                         <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                            {labResults.map(lab => (
                                <li key={lab.id} className="py-2 text-sm flex justify-between items-center">
                                    <div>
                                        <p className={valueTextClass}>{lab.testName} ({formatDate(lab.date)})</p>
                                        <p className={mutedTextClass}>Status: {lab.status}</p>
                                    </div>
                                    {lab.link && lab.status === 'Completed' && (
                                        <CustomButton as={Link} to={lab.link} target="_blank" size="xs" variant="outline" className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">View PDF</CustomButton>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : <p className={mutedTextClass}>No lab results found.</p>}
                 </div>
            </CustomUICard>

        </div>
      </div>

      {/* Add Note Modal */}
      {isAddNoteModalOpen && (
        <Modal isOpen={isAddNoteModalOpen} onClose={handleCloseNoteModal} title="Add Clinical Note">
          <AddNoteForm 
            patientId={patientId} 
            onSave={handleSaveNote} 
            onCancel={handleCloseNoteModal} 
          />
        </Modal>
      )}

    </div>
  );
}

export default DoctorViewPatientProfile; 