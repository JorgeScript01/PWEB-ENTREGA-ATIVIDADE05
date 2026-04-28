# 🚚 Delivery Tracker API

API REST desenvolvida para gerenciamento de entregas e motoristas, com persistência em banco de dados PostgreSQL.

---

## 📌 Descrição

O sistema permite:

* Cadastro de motoristas
* Criação e gerenciamento de entregas
* Acompanhamento de status das entregas
* Registro de histórico de eventos
* Geração de relatórios

A aplicação foi estruturada seguindo o padrão em camadas:

* **Controller** → tratamento HTTP
* **Service** → regras de negócio
* **Repository** → acesso ao banco de dados

---

## 🛠 Tecnologias Utilizadas

* Node.js
* Express
* PostgreSQL
* SQL puro (sem ORM)
* pg (node-postgres)
* dotenv

---

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com as seguintes tabelas:

* `motoristas`
* `entregas`
* `eventos_entrega`

### 📄 Migration

Execute o arquivo `migration.sql` para criar as tabelas:

```bash
psql -U usuario -d delivery_tracker -f migration.sql
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/delivery_tracker
```

---

## ▶️ Como Executar

```bash
npm install
node app.js
```

Servidor disponível em:

```
http://localhost:3000/api
```

---

## 📮 Rotas da API

### 🚗 Motoristas

* `POST /api/motoristas` → Criar motorista
* `GET /api/motoristas` → Listar motoristas
* `GET /api/motoristas/:id` → Buscar por ID

---

### 📦 Entregas

* `POST /api/entregas` → Criar entrega
* `GET /api/entregas` → Listar entregas
* `GET /api/entregas/:id` → Buscar por ID
* `PATCH /api/entregas/:id/avancar` → Avançar status
* `PATCH /api/entregas/:id/cancelar` → Cancelar entrega
* `PATCH /api/entregas/:id/atribuir` → Atribuir motorista
* `GET /api/entregas/:id/historico` → Histórico da entrega

---

### 📊 Relatórios

* `GET /api/relatorios/entregas-por-status`
* `GET /api/relatorios/motoristas-ativos`

---

## 🧪 Testes

Os testes da API podem ser realizados utilizando o Postman.

Uma collection está disponível em:

```
/postman/collection.json
```

---

## 🧠 Conceitos Aplicados

* Arquitetura em camadas
* Inversão de dependência
* Persistência com SQL puro
* Relacionamentos com chave estrangeira
* Tratamento de erros de domínio
* Queries com JOIN e GROUP BY

---

## 📌 Observações

* Os services não foram modificados durante a migração para banco de dados, garantindo desacoplamento entre regras de negócio e persistência.
* O histórico das entregas é armazenado na tabela `eventos_entrega`.

---

## 👨‍💻 Autor

Jorge Matheus Bomfim
