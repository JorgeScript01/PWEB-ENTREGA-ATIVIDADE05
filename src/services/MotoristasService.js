import { prisma } from "../database/prisma.js";

export class MotoristasService {
  constructor(repository) {
    this.repository = repository;
  }

  async listar() {
    return await this.repository.listarTodos();
  }

  async buscarPorId(id) {
    const motorista = await this.repository.buscarPorId(id);

    if (!motorista) {
      throw new Error("Motorista não encontrado");
    }

    return motorista;
  }

  async criar({ nome, cpf, placaVeiculo }) {
    const existente = await this.repository.buscarPorCPF(cpf);

    if (existente) {
      throw new Error("CPF já cadastrado");
    }

    return await this.repository.criar({
      nome,
      cpf,
      placaVeiculo,
      status: "ATIVO"
    });
  }

  async motoristasAtivos() {
  return await prisma.$queryRaw`
    SELECT 
      m.id as "motoristaId",
      m.nome,
      COUNT(e.id)::int as "entregasEmAberto"
    FROM "Motorista" m
    JOIN "Entrega" e ON e."motoristaId" = m.id
    WHERE e.status NOT IN ('ENTREGUE', 'CANCELADA')
    GROUP BY m.id, m.nome
  `;
}
}