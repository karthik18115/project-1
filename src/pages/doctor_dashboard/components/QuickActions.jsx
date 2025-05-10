import React from 'react';
import CustomButton from '../../../components/ui/Button';

/**
 * QuickActions renders primary action buttons in the doctor overview.
 * @param {{ onAddPatient: ()=>void, onSchedule: ()=>void }} props
 */
export default function QuickActions({ onAddPatient, onSchedule }) {
  return (
    <div className="flex mt-2 space-x-2">
      <CustomButton
        variant="outline"
        size="xs"
        onClick={onAddPatient}
        className="text-blue-700 border-blue-300 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-slate-700"
      >
        Add Patient
      </CustomButton>
      <CustomButton
        variant="outline"
        size="xs"
        onClick={onSchedule}
        className="text-blue-700 border-blue-300 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-slate-700"
      >
        Schedule
      </CustomButton>
    </div>
  );
} 