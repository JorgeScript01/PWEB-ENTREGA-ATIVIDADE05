// src/repositories/EntregasRepository.js
export class EntregasRepository {
  constructor(database) {
    this.database = database;
  }

  listarTodos() {
    return this.database.getEntregas();
  }

  buscarPorId(id) {
    return this.database.getEntregas().find(e => e.id === id);
  }

  criar(dados) {
    const entrega = {
      id: this.database.generateId(),
      ...dados
    };

    this.database.getEntregas().push(entrega);
    return entrega;
  }

  atualizar(id, dados) {
    const entrega = this.buscarPorId(id);
    if (!entrega) return null;

    Object.assign(entrega, dados);
    return entrega;
  }
}
