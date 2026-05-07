# Atividade 08 — API de Entregas com Prisma

Sistema de gerenciamento de entregas utilizando Prisma ORM e PostgreSQL.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Supabase

---

# Como executar

## Instalar dependências

```bash
npm install
```

---

## Criar `.env`

```env
DATABASE_URL="SUA_URL_DO_SUPABASE"
```

---

## Executar migrations

```bash
npx prisma migrate deploy
```

---

## Iniciar servidor

```bash
npm start
```

---

# Endpoints

## Entregas

- GET `/entregas`
- GET `/entregas/:id`
- POST `/entregas`
- PATCH `/entregas/:id`
- PATCH `/entregas/:id/cancelar`

---

## Motoristas

- GET `/motoristas`
- POST `/motoristas`

---

# Regras de negócio

- Controle de status de entregas
- Histórico automático de eventos
- Associação entre entrega e motorista