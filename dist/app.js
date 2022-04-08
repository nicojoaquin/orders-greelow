"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Configuraciones del servidor
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//Base de datos
(0, db_1.dbConnection)();
//Middlewares
app.use((0, cors_1.default)()); //Habilitar las cors
app.use(express_1.default.json()); //Reconocer los JSON
//Routes
app.get("/", (req, res) => {
    res.send('Bienvenido a la API de pedidos de greelow, porfavor utilize el endpoint "/api"');
});
app.use("/api", index_routes_1.default);
exports.default = app;
