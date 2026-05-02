import { prisma } from "../database/prisma.js";

export class MotoristasRepository {
  async listarTodos() {
    return await prisma.motorista.findMany();
  }

  async buscarPorId(id) {
    return await prisma.motorista.findUnique({
      where: { id }
    });
  }

  async buscarPorCPF(cpf) {
    return await prisma.motorista.findUnique({
      where: { cpf }
    });
  }

  async criar(dados) {
    return await prisma.motorista.create({
      data: dados
    });
  }

  async atualizar(id, dados) {
    return await prisma.motorista.update({
      where: { id },
      data: dados
    });
  }
}