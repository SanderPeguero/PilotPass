import React, { useState } from 'react';
import RentalModal from './RentalModal';
import SuccessMessage from './SuccessMessage';

function AircraftList({ aircraft, onRentalCreated, rentalService, currentUserId }) {
  const [selectedAircraftId, setSelectedAircraftId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRentalComplete = () => {
    setSelectedAircraftId(null);
    setShowSuccess(true);
    onRentalCreated();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircraft.map((aircraft) => (
          <div key={aircraft.id} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50 animate-fade-in hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {aircraft.model}
            </h3>
            <p className="text-gray-400 mt-2">{aircraft.type}</p>
            <p className="text-2xl font-bold text-white mt-3">
              ${aircraft.rate}
              <span className="text-sm text-gray-400">/hour</span>
            </p>
            <button
              onClick={() => setSelectedAircraftId(aircraft.id)}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-lg shadow-blue-500/20"
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>

      {selectedAircraftId && (
        <RentalModal
          aircraftId={selectedAircraftId}
          onClose={() => setSelectedAircraftId(null)}
          onSubmit={handleRentalComplete}
          rentalService={rentalService}
          currentUserId={currentUserId}
        />
      )}

      {showSuccess && (
        <SuccessMessage message="Rental request submitted successfully!" />
      )}
    </>
  );
}

export default AircraftList;