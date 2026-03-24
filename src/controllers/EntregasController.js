// src/controllers/EntregasController.js
export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  criar(req, res) {
    try {
      const entrega = this.service.criar(req.body);
      res.status(201).json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  listar(req, res) {
    const { status } = req.query;
    const entregas = this.service.listar(status);
    res.json(entregas);
  }

  buscarPorId(req, res) {
    try {
      const entrega = this.service.buscarPorId(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  avancar(req, res) {
    try {
      const entrega = this.service.avancar(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  cancelar(req, res) {
    try {
      const entrega = this.service.cancelar(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  historico(req, res) {
    try {
      const historico = this.service.historico(Number(req.params.id));
      res.json(historico);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }
}
