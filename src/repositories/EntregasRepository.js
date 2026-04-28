import { pool } from "../database/database.js";

export class EntregasRepository {
  async listarTodos() {
    const result = await pool.query("SELECT * FROM entregas");
    return result.rows;
  }

  async buscarPorId(id) {
    const result = await pool.query(
      "SELECT * FROM entregas WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async criar(dados) {
    const result = await pool.query(
      `INSERT INTO entregas (descricao, origem, destino, status, motorista_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        dados.descricao,
        dados.origem,
        dados.destino,
        dados.status,
        dados.motorista_id || null
      ]
    );

    return result.rows[0];
  }

  async atualizar(id, dados) {
    const result = await pool.query(
      `UPDATE entregas
       SET status = COALESCE($1, status),
           motorista_id = COALESCE($2, motorista_id)
       WHERE id = $3
       RETURNING *`,
      [
        dados.status ?? null,
        dados.motorista_id ?? null,
        id
      ]
    );

    return result.rows[0] || null;
  }

  // 🔥 NOVO: adicionar evento no histórico
  async adicionarEvento(entregaId, descricao) {
    await pool.query(
      `INSERT INTO eventos_entrega (entrega_id, descricao, data)
       VALUES ($1, $2, NOW())`,
      [entregaId, descricao]
    );
  }

  // 🔥 NOVO: buscar histórico
  async buscarEventos(entregaId) {
    const result = await pool.query(
      `SELECT data, descricao
       FROM eventos_entrega
       WHERE entrega_id = $1
       ORDER BY data ASC`,
      [entregaId]
    );

    return result.rows;
  }

  // 🔥 RELATÓRIO
  async relatorioPorStatus() {
    const result = await pool.query(`
      SELECT status, COUNT(*) as total
      FROM entregas
      GROUP BY status
    `);

    return result.rows;
  }
}