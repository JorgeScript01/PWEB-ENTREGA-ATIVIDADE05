export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  async criar(req, res) {
    try {
      const motorista = await this.service.criar(req.body);
      res.status(201).json(motorista);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async listar(req, res) {
    try {
      const motoristas = await this.service.listar();
      res.json(motoristas);
    } catch (err) {
      res.status(500).json({ erro: "Erro interno" });
    }
  }

  async buscar(req, res) {
    try {
      const motorista = await this.service.buscarPorId(Number(req.params.id));
      res.json(motorista);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  async motoristasAtivos(req, res) {
    try {
      const dados = await this.service.motoristasAtivos();
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
}