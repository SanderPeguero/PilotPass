import { Aircraft } from '../models/Aircraft.js';

export class AircraftService {
  constructor() {
    this.aircraft = [
      new Aircraft(1, 'Cessna 172', 'Single Engine', 150),
      new Aircraft(2, 'Piper PA-28', 'Single Engine', 165),
      new Aircraft(3, 'Beechcraft Baron', 'Twin Engine', 350)
    ];
  }

  getAllAircraft() {
    return this.aircraft;
  }

  getAvailableAircraft() {
    return this.aircraft.filter(aircraft => aircraft.status === 'available');
  }

  getAircraftById(id) {
    return this.aircraft.find(aircraft => aircraft.id === id);
  }
}