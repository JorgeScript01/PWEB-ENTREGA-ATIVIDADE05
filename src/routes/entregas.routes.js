// src/routes/entregas.routes.js
import express from "express";
import { Database } from "../database/database.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { EntregasController } from "../controllers/EntregasController.js";

const router = express.Router();

// Injeção de dependência
const database = new Database();
const repository = new EntregasRepository(database);
const service = new EntregasService(repository);
const controller = new EntregasController(service);

router.post("/entregas", (req, res) => controller.criar(req, res));
router.get("/entregas", (req, res) => controller.listar(req, res));
router.get("/entregas/:id", (req, res) => controller.buscarPorId(req, res));
router.patch("/entregas/:id/avancar", (req, res) => controller.avancar(req, res));
router.patch("/entregas/:id/cancelar", (req, res) => controller.cancelar(req, res));
router.get("/entregas/:id/historico", (req, res) => controller.historico(req, res));

export default router;
