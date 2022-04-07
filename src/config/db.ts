import { DataSource } from "typeorm";
import {
  Category,
  Restaurant,
  Topping,
  User,
  Menu,
  Item,
  Order,
} from "../Entities";

export const dbConfig = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "nicolasgr22",
  database: process.env.DB_DATABASE || "orders_gr",
  synchronize: true,
  entities: [Category, Restaurant, Topping, User, Menu, Item, Order],
});

export const dbConnection = async () => {
  try {
    await dbConfig.initialize();
    console.log("Conectado a la DB");
  } catch (error) {
    console.log("Error en la base de datos", error);
  }
};
