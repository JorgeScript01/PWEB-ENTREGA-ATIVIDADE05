// src/services/EntregasService.js
export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  criar({ descricao, origem, destino }) {
    if (origem === destino) {
      throw new Error("Origem e destino não podem ser iguais");
    }

    const duplicada = this.repository.listarTodos().find(e =>
      e.descricao === descricao &&
      e.origem === origem &&
      e.destino === destino &&
      !["ENTREGUE", "CANCELADA"].includes(e.status)
    );

    if (duplicada) {
      throw new Error("Entrega duplicada em aberto");
    }

    const entrega = this.repository.criar({
      descricao,
      origem,
      destino,
      status: "CRIADA",
      historico: []
    });

    this._addEvento(entrega, "Entrega criada");

    return entrega;
  }

  listar(status) {
    const entregas = this.repository.listarTodos();
    if (status) {
      return entregas.filter(e => e.status === status);
    }
    return entregas;
  }

  buscarPorId(id) {
    const entrega = this.repository.buscarPorId(id);
    if (!entrega) throw new Error("Entrega não encontrada");
    return entrega;
  }

  avancar(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === "CRIADA") {
      entrega.status = "EM_TRANSITO";
      this._addEvento(entrega, "Saiu para entrega");
    } else if (entrega.status === "EM_TRANSITO") {
      entrega.status = "ENTREGUE";
      this._addEvento(entrega, "Entrega finalizada");
    } else {
      throw new Error("Não é possível avançar esse status");
    }

    return entrega;
  }

  cancelar(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === "ENTREGUE") {
      throw new Error("Não pode cancelar entrega finalizada");
    }

    if (entrega.status === "CANCELADA") {
      throw new Error("Entrega já cancelada");
    }

    entrega.status = "CANCELADA";
    this._addEvento(entrega, "Entrega cancelada");

    return entrega;
  }

  historico(id) {
    const entrega = this.buscarPorId(id);
    return entrega.historico;
  }

  _addEvento(entrega, descricao) {
    entrega.historico.push({
      data: new Date().toISOString(),
      descricao
    });
  }
}
