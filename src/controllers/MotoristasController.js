export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  criar(req, res) {
    try {
      const motorista = this.service.criar(req.body);
      res.status(201).json(motorista);
    } catch (err) {
      res.status(err.status || 400).json({ erro: err.message });
    }
  }

  listar(req, res) {
    const motoristas = this.service.listar();
    res.json(motoristas);
  }

  buscar(req, res) {
    try {
      const motorista = this.service.buscarPorId(Number(req.params.id));
      res.json(motorista);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }
}