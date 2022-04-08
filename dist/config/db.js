"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.dbConfig = void 0;
const typeorm_1 = require("typeorm");
const Entities_1 = require("../Entities");
exports.dbConfig = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "nicolasgr22",
    database: process.env.DB_DATABASE || "orders_gr",
    synchronize: true,
    entities: [Entities_1.Category, Entities_1.Restaurant, Entities_1.Topping, Entities_1.User, Entities_1.Menu, Entities_1.Item, Entities_1.Order],
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.dbConfig.initialize();
        console.log("Conectado a la DB");
    }
    catch (error) {
        console.log("Error en la base de datos", error);
    }
});
exports.dbConnection = dbConnection;
