// src/controllers/EntregasController.js
export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  async criar(req, res) {
    try {
      const entrega = await this.service.criar(req.body);
      res.status(201).json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async listar(req, res) {
    const { status } = req.query;
    const entregas = await this.service.listar(status);
    res.json(entregas);
  }

  async buscarPorId(req, res) {
    try {
      const entrega = await this.service.buscarPorId(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  async avancar(req, res) {
    try {
      const entrega = await this.service.avancar(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async cancelar(req, res) {
    try {
      const entrega = await this.service.cancelar(Number(req.params.id));
      res.json(entrega);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

 async  historico(req, res) {
    try {
      const historico = await this.service.historico(Number(req.params.id));
      res.json(historico);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  async relatorioStatus(req, res) {
  const dados = await this.service.relatorioStatus();

  const formatado = {};
  dados.forEach(d => {
    formatado[d.status] = Number(d.total);
  });

  res.json(formatado);
}
}
