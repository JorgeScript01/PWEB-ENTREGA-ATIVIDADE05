import { jest } from "@jest/globals";
import { EntregasService } from "../../../src/services/EntregasService.js";

describe("EntregasService", () => {

  test(
    "deve impedir origem igual ao destino",
    async () => {

      const repository = {};
      const motoristasRepository = {};

      const service = new EntregasService(
        repository,
        motoristasRepository
      );

      await expect(
        service.criar({
          descricao: "Notebook",
          origem: "Maceió",
          destino: "Maceió"
        })
      ).rejects.toThrow(
        "Origem e destino não podem ser iguais"
      );

    }
  );

  test(
    "deve avançar de CRIADA para EM_TRANSITO",
    async () => {

      const repository = {
        buscarPorId: jest.fn().mockResolvedValue({
          id: 1,
          status: "CRIADA"
        }),

        adicionarEvento: jest.fn(),

        atualizar: jest.fn().mockResolvedValue({
          id: 1,
          status: "EM_TRANSITO"
        })
      };

      const service = new EntregasService(
        repository,
        {}
      );

      const resultado =
        await service.avancar(1);

      expect(resultado.status)
        .toBe("EM_TRANSITO");

    }
  );

  test(
    "não deve cancelar entrega ENTREGUE",
    async () => {

      const repository = {
        buscarPorId: jest.fn().mockResolvedValue({
          id: 1,
          status: "ENTREGUE"
        })
      };

      const service = new EntregasService(
        repository,
        {}
      );

      await expect(
        service.cancelar(1)
      ).rejects.toThrow(
        "Não pode cancelar entrega finalizada"
      );

    }
  );

});