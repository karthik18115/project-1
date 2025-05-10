import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { XIcon, PlusIcon } from '../icons'; // Assuming PlusIcon exists or can be added

const ALLERGY_SEVERITIES = ['Mild', 'Medium', 'High', 'Unknown'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

export default function EditMedicalInfoForm({ initialData, onSave, onCancel, isLoading, formId }) {
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [chronicConditions, setChronicConditions] = useState([]);
  
  const [newAllergyName, setNewAllergyName] = useState('');
  const [newAllergySeverity, setNewAllergySeverity] = useState(ALLERGY_SEVERITIES[0]);
  const [newConditionName, setNewConditionName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setBloodGroup(initialData.bloodGroup || BLOOD_GROUPS[BLOOD_GROUPS.length -1]);
      setAllergies(initialData.allergies ? [...initialData.allergies] : []);
      setChronicConditions(initialData.chronicConditions ? [...initialData.chronicConditions] : []);
    }
  }, [initialData]);

  const validateForm = () => {
    // Basic validation, can be expanded
    const newErrors = {};
    if (!bloodGroup) newErrors.bloodGroup = 'Blood group is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ bloodGroup, allergies, chronicConditions });
    }
  };

  // Allergy Handlers
  const handleAddAllergy = () => {
    if (newAllergyName.trim() === '') {
      setErrors(prev => ({...prev, newAllergy: 'Allergy name cannot be empty.'}));
      return;
    }
    setAllergies([...allergies, { id: `new_a_${Date.now()}`, name: newAllergyName, severity: newAllergySeverity }]);
    setNewAllergyName('');
    setNewAllergySeverity(ALLERGY_SEVERITIES[0]);
    setErrors(prev => ({...prev, newAllergy: null}));
  };
  const handleRemoveAllergy = (idToRemove) => {
    setAllergies(allergies.filter(a => a.id !== idToRemove));
  };

  // Condition Handlers
  const handleAddCondition = () => {
    if (newConditionName.trim() === '') {
        setErrors(prev => ({...prev, newCondition: 'Condition name cannot be empty.'}));
        return;
    }
    setChronicConditions([...chronicConditions, { id: `new_c_${Date.now()}`, name: newConditionName }]);
    setNewConditionName('');
    setErrors(prev => ({...prev, newCondition: null}));
  };
  const handleRemoveCondition = (idToRemove) => {
    setChronicConditions(conditions => conditions.filter(c => c.id !== idToRemove));
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-slate-50 text-slate-700 border border-slate-300 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400";
  const listInputClass = "flex-grow px-3 py-1.5 rounded-md bg-slate-50 text-slate-700 border border-slate-300 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-red-600 text-xs mt-1";
  const subHeaderClass = "text-md font-semibold text-slate-700 mb-2 mt-4";

  return (
    <form onSubmit={handleSubmit} id={formId} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div>
        <label htmlFor="bloodGroup" className={labelClass}>Blood Group</label>
        <select 
            name="bloodGroup" 
            id="bloodGroup" 
            value={bloodGroup} 
            onChange={(e) => setBloodGroup(e.target.value)} 
            className={inputClass}
            disabled={isLoading}
        >
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        {errors.bloodGroup && <p className={errorClass}>{errors.bloodGroup}</p>}
      </div>

      <hr className="my-3 border-slate-200"/>
      
      {/* Allergies Section */}
      <div>
        <h3 className={subHeaderClass}>Allergies</h3>
        {allergies.length > 0 && (
          <ul className="space-y-2 mb-3">
            {allergies.map((allergy) => (
              <li key={allergy.id} className="flex items-center justify-between p-2 bg-slate-100 rounded-md border border-slate-200">
                <span className="text-sm text-slate-700">{allergy.name} <span className="text-xs text-slate-500">({allergy.severity})</span></span>
                <Button type="button" onClick={() => handleRemoveAllergy(allergy.id)} variant="danger-outline" size="xs" className="!p-1">
                  <XIcon className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-start gap-2">
          <input 
            type="text" 
            placeholder="Allergy Name" 
            value={newAllergyName} 
            onChange={(e) => setNewAllergyName(e.target.value)} 
            className={listInputClass}
            disabled={isLoading}
          />
          <select 
            value={newAllergySeverity} 
            onChange={(e) => setNewAllergySeverity(e.target.value)} 
            className={`${listInputClass} w-auto`}
            disabled={isLoading}
          >
            {ALLERGY_SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button type="button" onClick={handleAddAllergy} variant="secondary" size="sm" className="!px-3 !py-1.5 whitespace-nowrap" disabled={isLoading}>Add Allergy</Button>
        </div>
        {errors.newAllergy && <p className={errorClass}>{errors.newAllergy}</p>}
      </div>

      <hr className="my-3 border-slate-200"/>

      {/* Chronic Conditions Section */}
      <div>
        <h3 className={subHeaderClass}>Chronic Conditions</h3>
        {chronicConditions.length > 0 && (
          <ul className="space-y-2 mb-3">
            {chronicConditions.map((condition) => (
              <li key={condition.id} className="flex items-center justify-between p-2 bg-slate-100 rounded-md border border-slate-200">
                <span className="text-sm text-slate-700">{condition.name}</span>
                <Button type="button" onClick={() => handleRemoveCondition(condition.id)} variant="danger-outline" size="xs" className="!p-1">
                  <XIcon className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-start gap-2">
          <input 
            type="text" 
            placeholder="Condition Name" 
            value={newConditionName} 
            onChange={(e) => setNewConditionName(e.target.value)} 
            className={listInputClass}
            disabled={isLoading}
          />
          <Button type="button" onClick={handleAddCondition} variant="secondary" size="sm" className="!px-3 !py-1.5 whitespace-nowrap" disabled={isLoading}>Add Condition</Button>
        </div>
        {errors.newCondition && <p className={errorClass}>{errors.newCondition}</p>}
      </div>
    </form>
  );
} 