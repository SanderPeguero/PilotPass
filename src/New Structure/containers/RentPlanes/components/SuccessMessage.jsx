import React from 'react';

function SuccessMessage({ message }) {
  return (
    <div className="fixed top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-500/20 animate-fade-in">
      {message}
    </div>
  );
}

export default SuccessMessage;