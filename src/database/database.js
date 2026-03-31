// src/database/database.js
export class Database {
  constructor() {
    this.entregas = [];
    this.nextId = 1;
    this.motoristas = [];
  }

  getEntregas() {
    return this.entregas;
  }

  generateId() {
    return this.nextId++;
  }
}
