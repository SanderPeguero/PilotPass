import React from 'react';
import FormInput from '../FormInput';

export default function FlightDetailsStep({ flightLog, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Flight Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Nr Inst. App."
          type="number"
          name="numInstrumentApproaches"
          value={flightLog.numInstrumentApproaches}
          onChange={onChange}
        />
        <FormInput
          label="Nr T/O"
          type="number"
          name="numTakeoffs"
          value={flightLog.numTakeoffs}
          onChange={onChange}
        />
        <FormInput
          label="Nr LDG"
          type="number"
          name="numLandings"
          value={flightLog.numLandings}
          onChange={onChange}
        />
        <div className="md:col-span-2">
          <FormInput
            label="Remarks and Endorsements"
            type="textarea"
            name="remarks"
            value={flightLog.remarks}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}