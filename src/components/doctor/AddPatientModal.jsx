import React, { useState } from 'react';
import Modal from '../ui/Modal'; // Assuming Modal component exists at this path
import CustomButton from '../ui/Button'; // Assuming Button component exists
import { toast } from 'react-toastify';

export default function AddPatientModal({ isOpen, onClose, onSavePatient }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\S@]+@[\S@]+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required.';
    // Basic mobile format validation (e.g., 10 digits), can be improved
    else if (!/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
        newErrors.mobile = 'Mobile number should be 10 digits.';
    }
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required.';
    // Add more specific date validation if needed, e.g., ensure it's in the past
    if (!password) {
        newErrors.password = 'Temporary password is required.';
    } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      await onSavePatient({
        fullName,
        email,
        mobile,
        dateOfBirth,
        gender,
        password,
        role: 'ROLE_PATIENT', // Hardcoded role
      });
      toast.success('Patient added successfully!');
      onClose(); // Close modal on success
      // Optionally reset form fields here if modal is reused without unmounting
      setFullName(''); setEmail(''); setMobile(''); setDateOfBirth(''); setGender(''); setPassword(''); setConfirmPassword(''); setErrors({});
    } catch (error) {
      toast.error(error.message || 'Failed to add patient. Please try again.');
      // Potentially set a general form error: setErrors(prev => ({ ...prev, form: error.message || '...' }))
    } finally {
      setIsSaving(false);
    }
  };
  
  // Simple helper for form input fields
  const renderInput = (id, label, value, onChange, type = 'text', error) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 
                   ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                           : 'border-slate-300 dark:border-slate-600 focus:ring-teal-500 focus:border-teal-500'}
                   bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <Modal title="Add New Patient" isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4 px-2">
        {renderInput('fullName', 'Full Name*', fullName, setFullName, 'text', errors.fullName)}
        {renderInput('email', 'Email Address*', email, setEmail, 'email', errors.email)}
        {renderInput('mobile', 'Mobile Number*', mobile, setMobile, 'tel', errors.mobile)}
        {renderInput('dateOfBirth', 'Date of Birth*', dateOfBirth, setDateOfBirth, 'date', errors.dateOfBirth)}
        
        <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender (Optional)</label>
            <select 
                id="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200"
            >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
            </select>
        </div>

        {renderInput('password', 'Temporary Password*', password, setPassword, 'password', errors.password)}
        {renderInput('confirmPassword', 'Confirm Temporary Password*', confirmPassword, setConfirmPassword, 'password', errors.confirmPassword)}

        {errors.form && <p className="text-sm text-red-600 mb-2">{errors.form}</p>}

        <div className="flex justify-end space-x-3 pt-3">
          <CustomButton type="button" variant="outline" onClick={onClose} disabled={isSaving} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            Cancel
          </CustomButton>
          <CustomButton type="submit" isLoading={isSaving} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white">
            {isSaving ? 'Saving...' : 'Save Patient'}
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
} 