import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AlertIcon } from '../../components/icons';
import { toast } from 'react-toastify';

// Initial mock queue with wait times
const mockQueue = [
  { id: 'E001', name: 'Alice Brown', age: 34, vitals: 'HR: 120, BP: 90/60', severity: 'Red', wait: 5 },
  { id: 'E002', name: 'Bob Smith', age: 56, vitals: 'HR: 100, BP: 110/70', severity: 'Orange', wait: 3 },
  { id: 'E003', name: 'Charlie Davis', age: 28, vitals: 'HR: 80, BP: 120/80', severity: 'Yellow', wait: 1 },
];

export default function EmergencyTriageQueuePage() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('severity');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [admissionForm, setAdmissionForm] = useState({ room: '', doctor: '', notes: '' });
  const [assignRoomValue, setAssignRoomValue] = useState('');
  const rooms = ['ER-1','ER-2','Bed-A','Bed-B'];
  const [newPatientForm, setNewPatientForm] = useState({ name: '', age: '', vitals: '', severity: 'Red' });
  const [selectedTemplate, setSelectedTemplate] = useState('General');
  const templates = {
    'General': { room: '', doctor: '', notes: '' },
    'Stroke Protocol': { room: 'ER-1', doctor: 'Dr. Heart', notes: 'Follow stroke admission protocol' },
    'Trauma Protocol': { room: 'ER-2', doctor: 'Dr. Trauma', notes: 'Activate trauma team' }
  };
  const severityStyles = {
    Red: 'border-red-500 bg-red-50',
    Orange: 'border-orange-500 bg-orange-50',
    Yellow: 'border-yellow-500 bg-yellow-50',
  };

  useEffect(() => {
    setQueue(mockQueue);
    setIsLoading(false);
    // Simulate wait time increasing
    const waitInterval = setInterval(() => {
      setQueue(prev => prev.map(item => ({ ...item, wait: item.wait + 1 })));
    }, 60000);
    return () => clearInterval(waitInterval);
  }, []);

  // Filtered and sorted list
  const filtered = queue.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (severityFilter === '' || item.severity === severityFilter)
  );
  const paginated = filtered.slice(0, currentPage * itemsPerPage);
  // Sort based on sortBy
  const severityOrder = { Red: 1, Orange: 2, Yellow: 3 };
  const displayList = [...paginated].sort((a, b) => {
    if (sortBy === 'wait') return b.wait - a.wait;
    if (sortBy === 'severity') return severityOrder[a.severity] - severityOrder[b.severity];
    return 0;
  });
  const canLoadMore = paginated.length < filtered.length;

  const handleLoadMore = () => setCurrentPage(prev => prev + 1);
  const handleActionClick = (item, action) => {
    if (action === 'Records') {
      // Navigate to full patient profile via doctor route
      navigate(`/app/doctor/patient/${item.id}/profile`);
    } else {
      setSelectedItem(item);
      setModalAction(action);
      setIsModalOpen(true);
    }
  };
  const handleAddClick = () => { setSelectedItem(null); setModalAction('Add'); setNewPatientForm({ name:'', age:'', vitals:'', severity:'Red' }); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedItem(null); setModalAction(''); };
  const handleConfirm = () => {
    if (modalAction === 'Admit') {
      setQueue(prev => prev.filter(i => i.id !== selectedItem.id));
      toast.success(`${selectedItem.name} admitted to ${admissionForm.room}.`);
    } else if (modalAction === 'Assign Room') {
      setQueue(prev => prev.map(i => i.id === selectedItem.id ? { ...i, room: assignRoomValue } : i));
      toast.success(`${selectedItem.name} assigned to ${assignRoomValue}.`);
    } else if (modalAction === 'Add') {
      const id = 'E' + Date.now();
      setQueue(prev => [{ id, wait:0, ...newPatientForm }, ...prev]);
      toast.success(`Added new patient ${newPatientForm.name}.`);
    }
    closeModal();
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-800">Triage Queue</h1>
        <Button variant="primary" size="sm" onClick={handleAddClick}>Add Patient</Button>
      </header>
      <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 mb-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          className="flex-1 px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={severityFilter}
          onChange={e => { setSeverityFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Severities</option>
          <option value="Red">Red (Critical)</option>
          <option value="Orange">Orange (Serious)</option>
          <option value="Yellow">Yellow (Stable)</option>
        </select>
        <select
          className="px-3 py-2 border rounded-md"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="severity">Sort: Severity</option>
          <option value="wait">Sort: Wait Time</option>
        </select>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Vitals</th>
              <th className="px-4 py-2 text-left">Severity</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              Array(itemsPerPage).fill(0).map((_, idx) => (
                <tr key={idx}>
                  {Array(6).fill(0).map((_, cidx) => (
                    <td key={cidx} className="px-4 py-2"><Skeleton /></td>
                  ))}
                </tr>
              ))
            ) : (
              displayList.map(item => (
                <tr key={item.id} className={`border-l-4 ${severityStyles[item.severity]}`}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.age}</td>
                  <td className="px-4 py-2">{item.vitals}</td>
                  <td className="px-4 py-2 flex items-center space-x-1">
                    <AlertIcon className="w-4 h-4 text-red-500" />
                    <span>{item.severity}</span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Button size="sm" variant="primary" onClick={() => handleActionClick(item, 'Admit')}>Admit</Button>
                    <Button size="sm" onClick={() => handleActionClick(item, 'Assign Room')}>Assign Room</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleActionClick(item, 'Records')}>Records</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
      {!isLoading && canLoadMore && (
        <div className="text-center mt-4">
          <Button variant="outline" onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalAction === 'Add' ? 'Add New Patient' : `${modalAction} - ${selectedItem?.id || ''}`}>
          {modalAction === 'Admit' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Template</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedTemplate}
                  onChange={e => {
                    const sel = e.target.value;
                    setSelectedTemplate(sel);
                    setAdmissionForm(templates[sel]);
                  }}
                >
                  {Object.keys(templates).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Room</label>
                <select className="w-full px-3 py-2 border rounded-md" value={admissionForm.room} onChange={e => setAdmissionForm(prev => ({ ...prev, room: e.target.value }))}>
                  <option value="">Select Room</option>
                  {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Doctor</label>
                <input className="w-full px-3 py-2 border rounded-md" value={admissionForm.doctor} onChange={e => setAdmissionForm(prev => ({ ...prev, doctor: e.target.value }))} placeholder="Doctor Name" />
              </div>
              <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea className="w-full px-3 py-2 border rounded-md" value={admissionForm.notes} onChange={e => setAdmissionForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="Notes" />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </div>
            </form>
          )}
          {modalAction === 'Assign Room' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium">Room</label>
              <select className="w-full px-3 py-2 border rounded-md" value={assignRoomValue} onChange={e => setAssignRoomValue(e.target.value)}>
                <option value="">Select Room</option>
                {rooms.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}
          {/* Records action now navigates to full patient profile, no modal view here */}
        </Modal>
      )}
    </div>
  );
} 