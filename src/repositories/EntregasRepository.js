import { prisma } from "../database/prisma.js";

export class EntregasRepository {
  async listarTodos() {
    return await prisma.entrega.findMany({
      include: {
        eventos: true,
        motorista: true
      }
    });
  }

  async buscarPorId(id) {
    return await prisma.entrega.findUnique({
      where: { id },
      include: {
        eventos: true,
        motorista: true
      }
    });
  }

  async buscarEventos(entregaId) {
  return await prisma.eventoEntrega.findMany({
    where: { entregaId },
    orderBy: { data: "asc" }
  });
}

  async criar(dados) {
    return await prisma.entrega.create({
      data: {
        descricao: dados.descricao,
        origem: dados.origem,
        destino: dados.destino,
        status: dados.status,
        motoristaId: dados.motoristaId || null
      }
    });
  }

  async atualizar(id, dados) {
    return await prisma.entrega.update({
      where: { id },
      data: {
        status: dados.status,
        motoristaId: dados.motoristaId || null
      }
    });
  }

  async adicionarEvento(entregaId, descricao) {
  return await prisma.eventoEntrega.create({
    data: {
      descricao,
      entregaId
    }
  });
}

  async relatorioPorStatus() {
    return await prisma.entrega.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    });
  }
}