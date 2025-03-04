import React from 'react';
import { format } from 'date-fns';

function UserRentals({ rentals, aircraft }) {
  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        Your Rentals
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
              <div className="mt-4 flex items-center">
                <span className="text-gray-400 mr-2">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rental.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                  rental.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserRentals;