import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../database/prisma.js";

export class AuthService {

  async registrar({ nome, email, senha }) {

    const existente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (existente) {
      throw new Error("Email já cadastrado");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        papel: "OPERADOR"
      }
    });

    return usuario;
  }

  async login({ email, senha }) {

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      throw new Error("Credenciais inválidas");
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senhaHash
    );

    if (!senhaCorreta) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "8h"
      }
    );

    return {
      accessToken: token
    };
  }
}