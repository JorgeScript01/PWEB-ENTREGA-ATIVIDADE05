export class MotoristasRepository {
  constructor(database) {
    this.database = database;
    this.database.motoristas = this.database.motoristas || [];
  }

  listarTodos() {
    return this.database.motoristas;
  }

  buscarPorId(id) {
    return this.database.motoristas.find(m => m.id === id);
  }

  buscarPorCPF(cpf) {
    return this.database.motoristas.find(m => m.cpf === cpf);
  }

  criar(dados) {
    const motorista = {
      id: this.database.generateId(),
      ...dados
    };

    this.database.motoristas.push(motorista);
    return motorista;
  }
}