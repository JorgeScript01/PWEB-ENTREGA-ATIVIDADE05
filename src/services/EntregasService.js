// src/services/EntregasService.js
export class EntregasService {
  constructor(repository, motoristasRepository) {
    this.repository = repository;
    this.motoristasRepository = motoristasRepository;
  }

  async criar({ descricao, origem, destino }) {
    if (origem === destino) {
      throw new Error("Origem e destino não podem ser iguais");
    }

    const entregas = await this.repository.listarTodos();

    const duplicada = entregas.find(e =>
      e.descricao === descricao &&
      e.origem === origem &&
      e.destino === destino &&
      !["ENTREGUE", "CANCELADA"].includes(e.status)
    );

    if (duplicada) {
      throw new Error("Entrega duplicada em aberto");
    }

    const entrega = await this.repository.criar({
      descricao,
      origem,
      destino,
      status: "CRIADA",
      motorista_id: null
    });

    await this.repository.adicionarEvento(entrega.id, "Entrega criada");

    return entrega;
  }

  async listar(status) {
    const entregas = await this.repository.listarTodos();

    if (status) {
      return entregas.filter(e => e.status === status);
    }

    return entregas;
  }

  async buscarPorId(id) {
    const entrega = await this.repository.buscarPorId(id);
    if (!entrega) throw new Error("Entrega não encontrada");
    return entrega;
  }

  async avancar(id) {
    const entrega = await this.buscarPorId(id);

    let novoStatus;

    if (entrega.status === "CRIADA") {
      novoStatus = "EM_TRANSITO";
      await this.repository.adicionarEvento(id, "Saiu para entrega");
    } else if (entrega.status === "EM_TRANSITO") {
      novoStatus = "ENTREGUE";
      await this.repository.adicionarEvento(id, "Entrega finalizada");
    } else {
      throw new Error("Não é possível avançar esse status");
    }

    return await this.repository.atualizar(id, { status: novoStatus });
  }

  async cancelar(id) {
    const entrega = await this.buscarPorId(id);

    if (entrega.status === "ENTREGUE") {
      throw new Error("Não pode cancelar entrega finalizada");
    }

    if (entrega.status === "CANCELADA") {
      throw new Error("Entrega já cancelada");
    }

    await this.repository.adicionarEvento(id, "Entrega cancelada");

    return await this.repository.atualizar(id, { status: "CANCELADA" });
  }

  async atribuirMotorista(entregaId, motoristaId) {
    const entrega = await this.buscarPorId(entregaId);

    const motorista = await this.motoristasRepository.buscarPorId(motoristaId);
    if (!motorista) {
      throw new Error("Motorista não encontrado");
    }

    if (entrega.status !== "CRIADA") {
      throw new Error("Só pode atribuir motorista em entregas CRIADAS");
    }

    if (motorista.status !== "ATIVO") {
      throw new Error("Motorista está inativo");
    }

    await this.repository.adicionarEvento(
      entregaId,
      `Motorista ${motorista.nome} atribuído`
    );

    return await this.repository.atualizar(entregaId, {
      motorista_id: motoristaId
    });
  }

  async historico(id) {
    return await this.repository.buscarEventos(id);
  }

  async relatorioStatus() {
    return await this.repository.relatorioPorStatus();
  }
}