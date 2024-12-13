import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addHours, isAfter } from 'date-fns';

function RentalModal({ aircraftId, onClose, onSubmit, rentalService, currentUserId }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addHours(new Date(), 2));
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAfter(endDate, startDate)) {
      setError('End time must be after start time');
      return;
    }

    rentalService.createRental(
      aircraftId,
      currentUserId,
      startDate.toISOString(),
      endDate.toISOString()
    );

    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 p-8 rounded-xl w-96 border border-gray-700/50 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Book Aircraft
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date and Time
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setError('');
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              calendarClassName="datepicker-custom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date and Time
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setError('');
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={startDate}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              calendarClassName="datepicker-custom"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-lg shadow-blue-500/20"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RentalModal;