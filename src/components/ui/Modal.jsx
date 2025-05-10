import React from 'react';
import { XIcon } from '../icons'; // Assuming XIcon is available for close button

export default function Modal({ isOpen, onClose, title, children, footerContent }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-auto text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
        style={{
          animationName: 'modalAppear',
          animationDuration: '0.3s',
          animationFillMode: 'forwards',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-6">
          {children}
        </div>
        {footerContent && (
          <div className="flex justify-end space-x-3 border-t border-slate-200 dark:border-slate-700 pt-4">
            {footerContent}
          </div>
        )}
      </div>
      {/* Keyframes for modal animation - will be handled by Tailwind config or global CSS */}
      {/* For now, inline style animation or rely on a pre-existing global animation setup */}
    </div>
  );
}

// It might be good to add these keyframes to a global CSS file or tailwind.config.js
// @keyframes modalAppear {
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// }
// .animate-modal-appear {
//   animation: modalAppear 0.3s forwards;
// } 