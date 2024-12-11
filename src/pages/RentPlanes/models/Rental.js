export class Rental {
  constructor(id, aircraftId, userId, startDate, endDate, status = 'pending') {
    this.id = id;
    this.aircraftId = aircraftId;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}