export class Aircraft {
  constructor(id, model, type, rate, status = 'available') {
    this.id = id;
    this.model = model;
    this.type = type;
    this.rate = rate;
    this.status = status;
  }
}