import React from 'react';
import CustomUICard from '../../../components/ui/Card';
import CustomButton from '../../../components/ui/Button';
import { UserCircleIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ShieldCheckIcon } from '../../../components/icons';

/**
 * EHRViewer shows patient demographics and key details with an edit action.
 * @param {{ demographics: { contact: any, insurance: any, emergencyContacts: any[] }, onEdit: ()=>void }} props
 */
export default function EHRViewer({ demographics, onEdit }) {
  const { contact = {}, insurance = {}, emergencyContacts = [] } = demographics || {};

  return (
    <CustomUICard className="dark:bg-slate-800 dark:border-slate-700">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center justify-between">
          <span><UserCircleIcon className="w-5 h-5 mr-2 inline-block text-teal-600 dark:text-teal-400"/>Demographics</span>
          <CustomButton variant="ghost" size="xs" onClick={onEdit} className="dark:text-slate-400 dark:hover:bg-slate-700">Edit</CustomButton>
        </h2>
        <div className="space-y-2 text-sm">
          {contact.phone && <p><PhoneIcon className="w-4 h-4 mr-2 inline-block text-slate-400"/> <span className="text-slate-800 dark:text-slate-100">{contact.phone}</span></p>}
          {contact.email && <p><EnvelopeIcon className="w-4 h-4 mr-2 inline-block text-slate-400"/> <span className="text-slate-800 dark:text-slate-100">{contact.email}</span></p>}
          {contact.address && <p><MapPinIcon className="w-4 h-4 mr-2 inline-block text-slate-400"/> <span className="text-slate-800 dark:text-slate-100">{contact.address}</span></p>}
          {insurance.provider && <p><ShieldCheckIcon className="w-4 h-4 mr-2 inline-block text-slate-400"/> Insurance: <span className="text-slate-800 dark:text-slate-100">{insurance.provider} ({insurance.policyNumber})</span></p>}
          {emergencyContacts[0] && <p>Emergency Contact: <span className="text-slate-800 dark:text-slate-100">{emergencyContacts[0].name} ({emergencyContacts[0].relationship}) - {emergencyContacts[0].phone}</span></p>}
        </div>
      </div>
    </CustomUICard>
  );
} 