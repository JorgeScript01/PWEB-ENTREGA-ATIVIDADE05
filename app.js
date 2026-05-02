// src/app.js
import "dotenv/config";  
import express from "express";
import entregasRoutes from "./src/routes/entregas.routes.js";

const app = express();
app.use(express.json());

app.use("/api", entregasRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
  