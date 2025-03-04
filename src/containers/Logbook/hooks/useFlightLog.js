import { useState } from 'react';

const initialFlightLog = {
  date: '',
  aircraftType: '',
  aircraftIdent: '',
  from: '',
  to: '',
  numInstrumentApproaches: 0,
  remarks: '',
  numTakeoffs: 0,
  numLandings: 0,
  singleEngineHours: 0,
  multiEngineHours: 0,
  nightHours: 0,
  instrumentHours: 0,
  crossCountryHours: 0,
  instructorHours: 0,
  dualReceivedHours: 0,
  picHours: 0,
  totalFlightHours: 0
};

export function useFlightLog() {
  const [flightLog, setFlightLog] = useState(initialFlightLog);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightLog(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving flight log:', flightLog);
    // Here you would typically save to a backend
    setFlightLog(initialFlightLog);
  };

  return {
    flightLog,
    handleInputChange,
    handleSubmit
  };
}