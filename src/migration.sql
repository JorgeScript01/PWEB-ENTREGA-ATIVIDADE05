CREATE TABLE IF NOT EXISTS motoristas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  placa_veiculo TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS entregas (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  origem TEXT NOT NULL,
  destino TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('CRIADA','EM_TRANSITO','ENTREGUE','CANCELADA')),
  motorista_id INT REFERENCES motoristas(id)
);

CREATE TABLE IF NOT EXISTS eventos_entrega (
  id SERIAL PRIMARY KEY,
  entrega_id INT REFERENCES entregas(id) ON DELETE CASCADE,
  data TIMESTAMP NOT NULL,
  descricao TEXT NOT NULL
);
