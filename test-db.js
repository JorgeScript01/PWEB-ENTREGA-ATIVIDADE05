import { pool } from "./src/database/database.js";

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Conectado:", result.rows);
  } catch (err) {
    console.error("Erro:", err.message);
  }
}

test();