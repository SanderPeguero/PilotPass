import React from 'react';
import FormInput from '../FormInput';

export default function BasicInfoStep({ flightLog, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Basic Flight Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
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
    </div>
  );
}