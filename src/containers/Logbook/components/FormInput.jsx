import React from 'react';

export default function FormInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange,
  step
}) {
  const baseClasses = `
    w-full rounded-lg bg-white/5 border border-white/10 
    text-white placeholder-gray-400
    focus:border-blue-500 focus:ring-1 focus:ring-blue-500
    transition-colors
  `;

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} h-20 resize-none`}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        className={`${baseClasses} h-10 px-3`}
      />
    </div>
  );
}