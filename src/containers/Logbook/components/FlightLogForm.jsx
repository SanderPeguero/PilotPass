import React, { useState } from 'react';
import FormSection from './FormSection';
import { useFlightLog } from '../hooks/useFlightLog';
import { 
  BasicInfoFields, 
  FlightDetailsFields,
  HoursFields 
} from './FormFields';

function FlightLogForm() {
  const { flightLog, handleInputChange, handleSubmit } = useFlightLog();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <FormSection title="Basic Information">
          <BasicInfoFields flightLog={flightLog} onChange={handleInputChange} />
        </FormSection>

        <FormSection title="Flight Details">
          <FlightDetailsFields flightLog={flightLog} onChange={handleInputChange} />
        </FormSection>

        <FormSection title="Flight Hours" className="md:col-span-2">
          <HoursFields flightLog={flightLog} onChange={handleInputChange} />
        </FormSection>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 
                     transform transition hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Flight Log
        </button>
      </div>
    </form>
  );
}