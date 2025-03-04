import React from 'react';
import FormInput from '../FormInput';

export default function FlightHoursStep({ flightLog, onChange }) {
  const hourFields = [
    { name: 'singleEngineHours', label: 'Single Engine Land' },
    { name: 'multiEngineHours', label: 'Multi Engine Land' },
    { name: 'nightHours', label: 'Night' },
    { name: 'instrumentHours', label: 'Instrument' },
    { name: 'simulatedInstrumentHours', label: 'Simulated Instrument' },
    { name: 'flightSimulatorHours', label: 'Flight Simulator' },
    { name: 'crossCountryHours', label: 'Cross Country' },
    { name: 'instructorHours', label: 'Flight Instructor' },
    { name: 'dualReceivedHours', label: 'Dual Received' },
    { name: 'picHours', label: 'PIC' },
    { name: 'totalFlightHours', label: 'Total Duration' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Flight Hours</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hourFields.map(field => (
          <FormInput
            key={field.name}
            label={field.label}
            type="number"
            step="0.1"
            name={field.name}
            value={flightLog[field.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}