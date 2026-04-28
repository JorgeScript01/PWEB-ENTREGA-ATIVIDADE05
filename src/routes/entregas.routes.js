// src/routes/entregas.routes.js
import express from "express";
//import { Database } from "../database/database.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { MotoristasController } from "../controllers/MotoristasController.js";

const router = express.Router();

// Injeção de dependência
//const database = new Database(); //ordem importa primerio db -> repo -> serv -> cont

//repos
const entregasRepo = new EntregasRepository();
const motoristasRepo = new MotoristasRepository();

// services
const service = new EntregasService(entregasRepo, motoristasRepo);
const motoristasService = new MotoristasService(motoristasRepo);

//controllers
const controller = new EntregasController(service);
const motoristasController = new MotoristasController(motoristasService);

router.post("/entregas", (req, res) => controller.criar(req, res));
router.get("/entregas", (req, res) => controller.listar(req, res));
router.get("/entregas/:id", (req, res) => controller.buscarPorId(req, res));
router.patch("/entregas/:id/avancar", (req, res) => controller.avancar(req, res));
router.patch("/entregas/:id/cancelar", (req, res) => controller.cancelar(req, res));
router.get("/entregas/:id/historico", (req, res) => controller.historico(req, res));

router.patch("/entregas/:id/atribuir", (req, res) => {
  try {
    const { motoristaId } = req.body;
    const entrega = service.atribuirMotorista(
      Number(req.params.id),
      motoristaId
    );
    res.json(entrega);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.post("/motoristas", (req, res) =>
  motoristasController.criar(req, res)
);

router.get("/motoristas", (req, res) =>
  motoristasController.listar(req, res)
);

router.get("/motoristas/:id", (req, res) =>
  motoristasController.buscar(req, res)
);

router.get("/relatorios/entregas-por-status", (req, res) =>
  controller.relatorioStatus(req, res)
);

router.get("/relatorios/motoristas-ativos", (req, res) =>
  motoristasController.motoristasAtivos(req, res)
);

export default router;
