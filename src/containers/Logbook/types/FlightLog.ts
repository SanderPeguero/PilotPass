export interface FlightLog {
  id: string;
  date: string;
  aircraftType: string;
  aircraftIdent: string;
  from: string;
  to: string;
  numInstrumentApproaches: number;
  remarks: string;
  numTakeoffs: number;
  numLandings: number;
  singleEngineHours: number;
  multiEngineHours: number;
  class: string;
  nightHours: number;
  instrumentHours: number;
  simulatedInstrumentHours: number;
  flightSimulatorHours: number;
  crossCountryHours: number;
  instructorHours: number;
  dualReceivedHours: number;
  picHours: number;
  totalFlightHours: number;
}