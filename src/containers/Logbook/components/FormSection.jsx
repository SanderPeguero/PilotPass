import React from 'react';

function FormSection({ title, children, className = '' }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}