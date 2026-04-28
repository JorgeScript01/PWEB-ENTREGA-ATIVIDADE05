export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  async criar(req, res) {
    try {
      const motorista = await this.service.criar(req.body);
      res.status(201).json(motorista);
    } catch (err) {
      res.status(err.status || 400).json({ erro: err.message });
    }
  }

  async listar(req, res) {
  try {
    const motoristas = await this.service.listar();
    res.json(motoristas);
  } catch (err) {
    console.error("ERRO LISTAR:", err);
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
  async motoristasAtivos() {
  const result = await pool.query(`
    SELECT 
      m.id as "motoristaId",
      m.nome,
      COUNT(e.id) as "entregasEmAberto"
    FROM motoristas m
    JOIN entregas e ON e.motorista_id = m.id
    WHERE e.status NOT IN ('ENTREGUE', 'CANCELADA')
    GROUP BY m.id, m.nome
  `);

  return result.rows;
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