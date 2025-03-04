import React from 'react';
import { format } from 'date-fns';

function OwnerDashboard({ rentals, aircraft, onUpdateRentalStatus }) {
  const handleStatusUpdate = (rentalId, newStatus) => {
    onUpdateRentalStatus(rentalId, newStatus);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        Manage Rentals
      </h2>
      <div className="space-y-4">
        {rentals.map(rental => {
          const aircraftDetails = aircraft.find(a => a.id === rental.aircraftId);
          return (
            <div key={rental.id} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white">{aircraftDetails.model}</h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-300 flex items-center">
                  <span className="w-16 text-gray-400">From:</span>
                  {format(new Date(rental.startDate), 'PPP p')}
                </p>
                <p className="text-gray-300 flex items-center">
                  <span className="w-16 text-gray-400">To:</span>
                  {format(new Date(rental.endDate), 'PPP p')}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rental.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                  rental.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                </span>
                {rental.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(rental.id, 'approved')}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 shadow-lg shadow-emerald-500/20"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(rental.id, 'cancelled')}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 shadow-lg shadow-red-500/20"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OwnerDashboard;