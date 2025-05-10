import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

// Mock data placeholder
const mockInventory = [
  { id: 1, drugName: 'Amoxicillin 500mg', batchId: 'AMX123', expiryDate: '2024-09-30', quantity: 25 },
  { id: 2, drugName: 'Metformin 500mg', batchId: 'MTF456', expiryDate: '2024-12-15', quantity: 10 },
];

export default function PharmacyInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState({ drugName: '', batchId: '', expiryDate: '', quantity: '' });
  const inputClass = 'w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpiring, setFilterExpiring] = useState(false);
  const today = new Date();

  useEffect(() => {
    // TODO: Fetch inventory from API
    setInventory(mockInventory);
  }, []);

  // filter logic
  const filtered = inventory.filter(item => {
    const matchesSearch = item.drugName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpiry = !filterExpiring || (new Date(item.expiryDate) - today) / (1000*60*60*24) <= 30;
    return matchesSearch && matchesExpiry;
  });

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setForm({ drugName: '', batchId: '', expiryDate: '', quantity: '' });
  };
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleAdd = () => {
    const newItem = { id: Date.now(), ...form };
    setInventory(prev => [...prev, newItem]);
    closeAddModal();
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Medicine Inventory</h1>
          <p className="text-sm text-slate-600">Manage stock levels and batches.</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="md">Import CSV</Button>
          <Button size="md" onClick={openAddModal}>Add Entry</Button>
        </div>
      </header>

      {/* Add Entry Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Inventory Entry"
        footerContent={(
          <>
            <Button variant="outline" onClick={closeAddModal}>Cancel</Button>
            <Button onClick={handleAdd}>Save</Button>
          </>
        )}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Drug Name</label>
            <input name="drugName" value={form.drugName} onChange={handleFormChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Batch ID</label>
            <input name="batchId" value={form.batchId} onChange={handleFormChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
            <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleFormChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
            <input name="quantity" type="number" value={form.quantity} onChange={handleFormChange} className={inputClass} />
          </div>
        </form>
      </Modal>

      {/* Toolbar: Search & Expiring filter */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        <input
          type="text"
          placeholder="Search drug name..."
          className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-md"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filterExpiring}
            onChange={e => setFilterExpiring(e.target.checked)}
          />
          <span className="text-sm text-slate-700">Expiring in 30 days</span>
        </label>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Drug Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Batch ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Expiry Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filtered.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-slate-800">{item.drugName}</td>
                <td className="px-4 py-2 text-slate-800">{item.batchId}</td>
                <td className="px-4 py-2 text-slate-800">{item.expiryDate}</td>
                <td className="px-4 py-2 text-slate-800">{item.quantity}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button variant="secondary" size="sm">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 