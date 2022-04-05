//Configuraciones del servidor
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db";
import apiRouter from "./routes/index.routes";

config();
const app = express();

//Base de datos
dbConnection();

//Middlewares
app.use(cors()); //Habilitar las cors
app.use(express.json()); //Reconocer los JSON

//Routes
app.get("/", (req, res) => {
  res.send(
    'Bienvenido a la API de pedidos de greelow, porfavor utilize el endpoint "/api"'
  );
});
app.use("/api", apiRouter);

export default app;
