export class MotoristasService {
  constructor(repository) {
    this.repository = repository;
  }

  async criar({ nome, cpf, placaVeiculo }) {
  const existente = await this.repository.buscarPorCPF(cpf);

  if (existente) {
    const err = new Error("CPF já cadastrado");
    err.status = 409;
    throw err;
  }

  return await this.repository.criar({
    nome,
    cpf,
    placaVeiculo,
    status: "ATIVO"
  });
}

  async listar() {
    return this.repository.listarTodos();
  }

  async buscarPorId(id) {
    return this.repository.buscarPorId(id);
  }
  async motoristasAtivos() {
  return await this.repository.motoristasAtivos();
}
}