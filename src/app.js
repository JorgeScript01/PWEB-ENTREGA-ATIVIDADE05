// src/app.js
import "dotenv/config";  
import express from "express";
import entregasRoutes from "./routes/entregas.routes.js";

import path from "path";
import { fileURLToPath } from "url";

import methodOverride from "method-override";

import session from "express-session";

// linkando routes do painel
import painelRoutes from "./routes/painel.routes.js";


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: "segredo",
  resave: false,
  saveUninitialized: true
}));

app.get("/teste", (req, res) => {
  res.render("teste");
});
app.use("/api", entregasRoutes);

app.use("/painel", painelRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
  