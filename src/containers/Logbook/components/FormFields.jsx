import React from 'react';
import FormInput from './FormInput';

export function BasicInfoFields({ flightLog, onChange }) {
  return (
    <>
      <FormInput
        label="Date"
        type="date"
        name="date"
        value={flightLog.date}
        onChange={onChange}
      />
      <FormInput
        label="Aircraft Type"
        name="aircraftType"
        value={flightLog.aircraftType}
        onChange={onChange}
      />
      <FormInput
        label="Aircraft Ident"
        name="aircraftIdent"
        value={flightLog.aircraftIdent}
        onChange={onChange}
      />
    </>
  );
}

export function FlightDetailsFields({ flightLog, onChange }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="From"
          name="from"
          value={flightLog.from}
          onChange={onChange}
        />
        <FormInput
          label="To"
          name="to"
          value={flightLog.to}
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Takeoffs"
          type="number"
          name="numTakeoffs"
          value={flightLog.numTakeoffs}
          onChange={onChange}
        />
        <FormInput
          label="Landings"
          type="number"
          name="numLandings"
          value={flightLog.numLandings}
          onChange={onChange}
        />
      </div>
      <FormInput
        label="Remarks"
        type="textarea"
        name="remarks"
        value={flightLog.remarks}
        onChange={onChange}
      />
    </>
  );
}

export function HoursFields({ flightLog, onChange }) {
  const hourFields = [
    { name: 'singleEngineHours', label: 'Single Engine' },
    { name: 'multiEngineHours', label: 'Multi Engine' },
    { name: 'nightHours', label: 'Night' },
    { name: 'instrumentHours', label: 'Instrument' },
    { name: 'crossCountryHours', label: 'Cross Country' },
    { name: 'picHours', label: 'PIC' },
    { name: 'instructorHours', label: 'Instructor' },
    { name: 'dualReceivedHours', label: 'Dual Received' },
    { name: 'totalFlightHours', label: 'Total Flight' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  );
}