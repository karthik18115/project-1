import React from 'react';

export default function Card({ className = '', children, ...props }) {
  return (
    <div className={`rounded-2xl shadow-md bg-white p-4 dark:bg-slate-800 dark:border dark:border-slate-700 ${className}`} {...props}>
      {children}
    </div>
  );
} 