import { pool } from "../database/database.js";

export class MotoristasRepository {
  async listarTodos() {
  const result = await pool.query("SELECT * FROM motoristas");
  return result.rows; // isso já deveria ser JSON puro
}

  async buscarPorId(id) {
    const result = await pool.query(
      "SELECT * FROM motoristas WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async buscarPorCPF(cpf) {
    const result = await pool.query(
      "SELECT * FROM motoristas WHERE cpf = $1",
      [cpf]
    );
    return result.rows[0] || null;
  }

  async criar(dados) {
    try {
      const result = await pool.query(
        `INSERT INTO motoristas (nome, cpf, placa_veiculo, status)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [dados.nome, dados.cpf, dados.placaVeiculo, dados.status]
      );

      return result.rows[0];
    } catch (err) {
      console.log("ERRO REAL DO BANCO:", err);
      if (err.code === "23505") {
        const error = new Error("CPF já cadastrado");
        error.status = 409;
        throw error;
      }
      throw err;
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
}