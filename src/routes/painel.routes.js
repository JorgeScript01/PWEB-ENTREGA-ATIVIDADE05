import express from "express";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { MotoristasService } from "../services/MotoristasService.js";

const router = express.Router();

const entregasRepo = new EntregasRepository();
const service = new EntregasService(entregasRepo);

const motoristasRepo = new MotoristasRepository();
const motoristasService = new MotoristasService(motoristasRepo);

// ENTREGAS


// LISTAGEM
router.get("/entregas", async (req, res) => {
  try {
    const entregas = await service.listar(req.query.status);

    res.render("entregas/index", {
      entregas,
      flash: {
        sucesso: req.query.sucesso,
        erro: req.query.erro
      }
    });

  } catch (err) {
    res.status(500).send("Erro ao carregar entregas");
  }
});

// FORM NOVA
router.get("/entregas/nova", (req, res) => {
  res.render("entregas/nova", {
    erro: null,
    dados: {}
  });
});

// CRIAR (PRG)
router.post("/entregas", async (req, res) => {
  try {
    await service.criar(req.body);

    return res.redirect("/painel/entregas?sucesso=Entrega criada com sucesso");

  } catch (err) {
    return res.render("entregas/nova", {
      erro: err.message,
      dados: req.body
    });
  }
});

// DETALHE 
router.get("/entregas/:id", async (req, res) => {
  try {
    const entrega = await service.buscarPorId(Number(req.params.id));
    const historico = await service.historico(entrega.id);

    res.render("entregas/detalhe", {
      entrega,
      historico,
      flash: {
        sucesso: req.query.sucesso,
        erro: req.query.erro
      }
    });

  } catch (err) {
    res.redirect("/painel/entregas?erro=Entrega não encontrada");
  }
});

// AVANÇAR STATUS
router.patch("/entregas/:id", async (req, res) => {
  try {
    await service.avancar(Number(req.params.id));

    res.redirect(`/painel/entregas/${req.params.id}?sucesso=Status atualizado`);

  } catch (err) {
    res.redirect(`/painel/entregas/${req.params.id}?erro=${err.message}`);
  }
});

// CANCELAR
router.patch("/entregas/:id/cancelar", async (req, res) => {
  try {
    await service.cancelar(Number(req.params.id));

    res.redirect(`/painel/entregas/${req.params.id}?sucesso=Entrega cancelada`);

  } catch (err) {
    res.redirect(`/painel/entregas/${req.params.id}?erro=${err.message}`);
  }
});

// MOTORISTAS

// LISTAGEM
router.get("/motoristas", async (req, res) => {
  try {
    const motoristas = await motoristasService.listar();

    res.render("motoristas/index", {
      motoristas,
      flash: {
        sucesso: req.query.sucesso,
        erro: req.query.erro
      }
    });

  } catch {
    res.status(500).send("Erro ao carregar motoristas");
  }
});

// FORM NOVO
router.get("/motoristas/novo", (req, res) => {
  res.render("motoristas/novo", {
    erro: null,
    dados: {}
  });
});

// CRIAR (PRG)
router.post("/motoristas", async (req, res) => {
  try {
    await motoristasService.criar(req.body);

    return res.redirect("/painel/motoristas?sucesso=Motorista criado");

  } catch (err) {
    return res.render("motoristas/novo", {
      erro: err.message,
      dados: req.body
    });
  }
});

export default router;