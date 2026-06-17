import { jest } from "@jest/globals";

const findUniqueMock = jest.fn();
const createMock = jest.fn();

jest.unstable_mockModule(
  "../../../src/database/prisma.js",
  () => ({
    prisma: {
      usuario: {
        findUnique: findUniqueMock,
        create: createMock
      }
    }
  })
);

const compareMock = jest.fn();
const hashMock = jest.fn();

jest.unstable_mockModule(
  "bcrypt",
  () => ({
    default: {
      compare: compareMock,
      hash: hashMock
    }
  })
);

const { AuthService } =
  await import(
    "../../../src/services/AuthService.js"
  );

test(
  "deve impedir registro com email já cadastrado",
  async () => {

    findUniqueMock.mockResolvedValue({
      id: 1,
      email: "teste@email.com"
    });

    const service =
      new AuthService();

    await expect(
      service.registrar({
        nome: "Matheus",
        email: "teste@email.com",
        senha: "123456"
      })
    ).rejects.toThrow(
      "Email já cadastrado"
    );

  }
);

test(
  "deve registrar usuário com sucesso",
  async () => {

    findUniqueMock.mockResolvedValue(null);

    hashMock.mockResolvedValue(
      "hash-gerado"
    );

    createMock.mockResolvedValue({
      id: 1,
      nome: "Matheus",
      email: "teste@email.com",
      papel: "OPERADOR"
    });

    const service =
      new AuthService();

    const usuario =
      await service.registrar({
        nome: "Matheus",
        email: "teste@email.com",
        senha: "123456"
      });

    expect(usuario.id).toBe(1);

    expect(hashMock)
      .toHaveBeenCalled();

    expect(createMock)
      .toHaveBeenCalled();

  }
);