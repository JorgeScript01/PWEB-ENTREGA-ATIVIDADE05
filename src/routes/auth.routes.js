import express from "express";

import { AuthService } from "../services/AuthService.js";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();

const service = new AuthService();
const controller = new AuthController(service);

router.post("/registrar", (req, res) =>
  controller.registrar(req, res)
);

router.post("/login", (req, res) =>
  controller.login(req, res)
);

export default router;