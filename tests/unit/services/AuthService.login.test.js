import { jest } from "@jest/globals";

const findUniqueMock = jest.fn();

const signMock = jest.fn();

jest.unstable_mockModule(
  "jsonwebtoken",
  () => ({
    default: {
      sign: signMock
    }
  })
);

test(
  "deve retornar accessToken quando login for válido",
  async () => {

    findUniqueMock.mockResolvedValue({
      id: 1,
      nome: "Matheus",
      email: "teste@email.com",
      senhaHash: "hash",
      papel: "OPERADOR"
    });

    compareMock.mockResolvedValue(true);

    signMock.mockReturnValue(
      "token-falso"
    );

    const service =
      new AuthService();

    const resultado =
      await service.login({
        email: "teste@email.com",
        senha: "123456"
      });

    expect(
      resultado.accessToken
    ).toBe("token-falso");

  }
);

jest.unstable_mockModule(
  "../../../src/database/prisma.js",
  () => ({
    prisma: {
      usuario: {
        findUnique: findUniqueMock
      }
    }
  })
);

const compareMock = jest.fn();

jest.unstable_mockModule(
  "bcrypt",
  () => ({
    default: {
      compare: compareMock
    }
  })
);

const { AuthService } =
  await import(
    "../../../src/services/AuthService.js"
  );

describe("AuthService Login", () => {

  test(
    "deve lançar erro quando email não existe",
    async () => {

      findUniqueMock.mockResolvedValue(null);

      const service =
        new AuthService();

      await expect(
        service.login({
          email: "teste@email.com",
          senha: "123456"
        })
      ).rejects.toThrow(
        "Credenciais inválidas"
      );
    }
  );
});

test(
  "deve lançar erro quando senha está incorreta",
  async () => {

    findUniqueMock.mockResolvedValue({
      id: 1,
      email: "teste@email.com",
      senhaHash: "hash"
    });

    compareMock.mockResolvedValue(false);

    const service = new AuthService();

    await expect(
      service.login({
        email: "teste@email.com",
        senha: "senhaerrada"
      })
    ).rejects.toThrow(
      "Credenciais inválidas"
    );
  }
);