export class MotoristasService {
  constructor(repository) {
    this.repository = repository;
  }

  criar({ nome, cpf, placaVeiculo }) {
    if (this.repository.buscarPorCPF(cpf)) {
      const err = new Error("CPF já cadastrado");
      err.status = 409;
      throw err;
    }

    return this.repository.criar({
      nome,
      cpf,
      placaVeiculo,
      status: "ATIVO"
    });
  }

  listar() {
    return this.repository.listarTodos();
  }

  buscarPorId(id) {
    return this.repository.buscarPorId(id);
  }
}