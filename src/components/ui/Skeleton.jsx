import React from 'react';

export default function Skeleton({ count = 1, height = 20, width = '100%', className = '', style = {} }) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      <span
        key={i}
        className={`inline-block bg-slate-200 rounded animate-pulse ${className}`}
        style={{
          height: `${height}px`,
          width: typeof width === 'number' ? `${width}px` : width,
          ...style,
        }}
        aria-busy="true"
        aria-live="polite"
      >
        &nbsp; {/* Ensure content for screen readers */}
      </span>
    );
  }

  // If count is 1, return single span, else wrap in a div for spacing (or let parent handle spacing)
  return count === 1 ? items[0] : <div className="space-y-2">{items}</div>;
} 