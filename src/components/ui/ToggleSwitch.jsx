import React from 'react';

const ToggleSwitch = ({ id, label, checked, onChange, disabled = false }) => {
  return (
    <label htmlFor={id} className={`flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <span className="text-sm font-medium text-slate-700 mr-4">{label}</span>
      <div className="relative">
        <input 
          id={id}
          type="checkbox" 
          className="sr-only peer" // Hide default checkbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        {/* Track */}
        <div className={`w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-teal-400`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch; 