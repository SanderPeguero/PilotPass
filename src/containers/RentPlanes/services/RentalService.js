import { Rental } from '../models/Rental.js';

export class RentalService {
  constructor() {
    this.rentals = [];
  }

  createRental(aircraftId, userId, startDate, endDate) {
    const rental = new Rental(
      this.rentals.length + 1,
      aircraftId,
      userId,
      startDate,
      endDate
    );
    this.rentals.push(rental);
    return rental;
  }

  getRentalsByUser(userId) {
    return this.rentals.filter(rental => rental.userId === userId);
  }

  getAllRentals() {
    return this.rentals;
  }

  updateRentalStatus(rentalId, status) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (rental) {
      rental.status = status;
    }
    return rental;
  }
}