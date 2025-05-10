import React, { useState, useEffect } from 'react';
import Button from '../ui/Button'; // Adjust path as needed

export default function EditPersonalInfoForm({ initialData, onSave, onCancel, isLoading, formId }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        dateOfBirth: initialData.dateOfBirth || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        address: initialData.address || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
        newErrors.dateOfBirth = 'Date of birth must be YYYY-MM-DD.';
    }
    // Add more validation as needed (phone, address)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-slate-50 text-slate-700 border border-slate-300 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-red-600 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} id={formId} className="space-y-4">
      <div>
        <label htmlFor="fullName" className={labelClass}>Full Name</label>
        <input 
          type="text" 
          name="fullName"
          id="fullName" 
          value={formData.fullName}
          onChange={handleChange}
          className={inputClass}
          disabled={isLoading}
        />
        {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
        <input 
          type="date" // Changed to date type for better UX if supported, otherwise text with YYYY-MM-DD pattern
          name="dateOfBirth"
          id="dateOfBirth" 
          value={formData.dateOfBirth} // Ensure this is in YYYY-MM-DD for date input
          onChange={handleChange}
          className={inputClass}
          disabled={isLoading}
        />
        {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email Address</label>
        <input 
          type="email" 
          name="email"
          id="email" 
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          disabled={isLoading}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
        <input 
          type="tel" 
          name="phoneNumber"
          id="phoneNumber" 
          value={formData.phoneNumber}
          onChange={handleChange}
          className={inputClass}
          disabled={isLoading}
        />
        {/* Add phone validation error if needed */}
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>Address</label>
        <textarea 
          name="address"
          id="address" 
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={inputClass}
          disabled={isLoading}
        />
        {/* Add address validation error if needed */}
      </div>
    </form>
  );
} 