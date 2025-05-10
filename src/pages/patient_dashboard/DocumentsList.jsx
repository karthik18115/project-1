import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
// import './DocumentsList.css'; // Removed CSS import

// TODO: Replace with proper SVG icons from components/icons
import { UploadIcon, FilterIcon, SearchIcon, DocumentTextIcon as FileIcon, DownloadIcon, EyeIcon as ViewIcon, TrashIcon as DeleteIcon } from '../../components/icons';
import LabReportDownloadButton from '../../components/LabReportDownloadButton'; // Import the download button
import LabReportViewButton from '../../components/LabReportViewButton'; // Import the View button

// Use the same hook as PatientMedicalRecords for mock data consistency
// In a real app, this might fetch a combined list of documents and lab reports
import usePatientMedicalData from '../../hooks/usePatientMedicalData'; 

export default function DocumentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  // Use the hook to get patient data, including lab reports
  const { data: patientData, isLoading } = usePatientMedicalData(); 

  // Combine documents and lab reports into a single list for display
  // Add a property to distinguish lab reports for rendering the correct download button
  const combinedDocuments = React.useMemo(() => {
    if (isLoading || !patientData) return [];
    
    // Example: Assuming non-lab documents might come from a different source in a real app
    const otherDocuments = [
      // { id: 'doc2', name: 'Cardiology_Consult_Summary_2024-05-10.pdf', type: 'Visit Summary', date: '2024-05-10', tags: ['cardiology', 'consultation'], doctor: "Dr. Carter", size: "850KB", uploader: "System", isLabReport: false },
      // { id: 'doc3', name: 'Chest_XRay_Report_2024-04-15.dicom', type: 'Imaging Report', date: '2024-04-15', tags: ['imaging', 'x-ray'], doctor: "Dr. Miller", size: "21.5MB", uploader: "System", isLabReport: false },
      // { id: 'doc4', name: 'Insurance_Card_Front_Scan.jpg', type: 'Insurance Card', date: '2024-01-10', tags: ['insurance'], uploader: "Patient", size: "512KB", isLabReport: false },
      // { id: 'doc5', name: 'Medical_History_Form_2024.pdf', type: 'Patient Form', date: '2024-01-05', tags: ['intake'], uploader: "Patient", size: "300KB", isLabReport: false },
    ];

    const formattedLabReports = patientData.labReports.map(report => ({
      id: report.reportId,
      name: `${report.reportName || 'Lab Report'}_${report.reportDate}.pdf`, // Construct a name
      type: 'Lab Report',
      date: report.reportDate,
      tags: ['lab', ...(report.reportName?.toLowerCase().split(' ') || [])], // Basic tags
      doctor: report.orderingPhysician,
      size: 'N/A', // Size not available in mock data
      uploader: 'System',
      isLabReport: true,
      labReportData: report, // Keep the original lab report data
    }));

    // Combine and sort
    return [...otherDocuments, ...formattedLabReports].sort((a,b) => new Date(b.date) - new Date(a.date));

  }, [patientData, isLoading]);

  const filteredDocuments = React.useMemo(() => isLoading ? [] : combinedDocuments.filter(doc => 
    !searchTerm ||
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  ), [isLoading, combinedDocuments, searchTerm]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 bg-slate-100 min-h-full">
      {/* Header Section - Converted to Tailwind */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">Documents</h1>
          <p className="text-lg text-slate-600 mt-1">Manage and view all your medical documents and uploaded files.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => alert('Upload modal placeholder')} 
          className="mt-4 sm:mt-0 flex items-center space-x-2 py-2.5 px-5">
          <UploadIcon className="w-5 h-5" /> 
          <span>Upload Document</span>
        </Button>
      </header>

      {/* Search and Filter Controls - Converted to Tailwind */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 py-4">
        <div className="relative flex-grow w-full md:w-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <SearchIcon className="w-5 h-5" />
          </span>
          <input 
            type="search" 
            placeholder="Search documents by name, type, tag..." 
            aria-label="Search documents" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-colors duration-200 ease-in-out"
          />
        </div>
        <Button 
          variant="outline" 
          size="md"
          onClick={() => alert('Filter options placeholder')} 
          className="flex items-center space-x-2 flex-shrink-0 py-2.5 px-5">
          <FilterIcon className="w-5 h-5"/> 
          <span>Filters</span>
        </Button>
      </div>

      {/* Document List Section - Refactored */}
      <div className="space-y-4">
        {isLoading ? (
           Array(3).fill(0).map((_, index) => (
            <Card key={index} className="p-5 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="w-3/4">
                  <Skeleton height={24} width="80%" className="mb-2" />
                  <Skeleton height={16} width="60%" className="mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton height={20} width={70} />
                    <Skeleton height={20} width={50} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end gap-2">
                  <Skeleton height={36} width={90} />
                  <Skeleton height={36} width={100} />
                </div>
              </div>
            </Card>
          ))
        ) : filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <Card key={doc.id} className="p-4 sm:p-5 hover:shadow-lg transition-shadow duration-200 border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                {/* Left Side: Icon, Name, Metadata */}
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  <FileIcon className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0">
                    <h2 
                      className="text-base sm:text-lg font-semibold text-slate-800 hover:text-teal-700 cursor-pointer truncate"
                      onClick={() => alert(`Placeholder: Viewing ${doc.name}`)} 
                      title={doc.name}
                    >
                      {doc.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 space-x-2 flex flex-wrap">
                       {doc.type && <span className="whitespace-nowrap"><span className="font-medium">Type:</span> {doc.type}</span>}
                       {doc.date && <span className="whitespace-nowrap"><span className="font-medium">Date:</span> {new Date(doc.date).toLocaleDateString()}</span>}
                       {doc.size && <span className="whitespace-nowrap"><span className="font-medium">Size:</span> {doc.size}</span>} 
                       {doc.doctor && <span className="whitespace-nowrap"><span className="font-medium">Provider:</span> {doc.doctor}</span>}
                       {doc.uploader && <span className="whitespace-nowrap"><span className="font-medium">Source:</span> {doc.uploader}</span>}
                    </p>
                    {doc.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {doc.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Side: Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto flex-shrink-0 pt-2 md:pt-0 border-t border-slate-100 md:border-none">
                  
                  {/* Conditional View Button */}
                  {doc.isLabReport ? (
                    <LabReportViewButton 
                      patientData={patientData} 
                      labReport={doc.labReportData} 
                      className="flex-grow sm:flex-grow-0"
                    />
                  ) : (
                    <Button variant="outline" size="sm" className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-1.5" onClick={() => alert(`View for ${doc.name} - Not Implemented Yet`)} disabled>
                      <ViewIcon className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                  )}
                  
                  {/* Conditional Download Button */}
                  {doc.isLabReport ? (
                    <LabReportDownloadButton 
                      patientData={patientData} 
                      labReport={doc.labReportData}
                      className="flex-grow sm:flex-grow-0"
                    />
                  ) : (
                    <Button variant="primary" size="sm" className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-1.5" onClick={() => alert(`Download for ${doc.name} - Not Implemented Yet`)} disabled>
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  )}

                  {doc.uploader === 'Patient' && (
                    <Button variant="danger-outline" size="sm" className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-1.5" onClick={() => alert(`Delete ${doc.name}`)}>
                      <DeleteIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-center border border-slate-200">
            <p className="text-slate-500 text-lg">No documents found{searchTerm ? ' matching your search' : ''}.</p>
          </Card>
        )}
      </div>

      {/* TODO: Add Pagination component if needed */}
    </div>
  );
} 