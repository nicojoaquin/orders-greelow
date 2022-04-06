import { Router } from "express";
import {
  createTopping,
  deleteToppingById,
  readToppings,
  readToppingById,
  updateToppingById,
} from "../controllers/Topping.controller";

const router = Router();

//Crea un topping nuevo
router.post("/create", createTopping);

//Obtiene todos los toppings
router.get("/", readToppings);

//Obtiene un topping por id
router.get("/:id", readToppingById);

//Actualiza un topping por id
router.put("/update/:id", updateToppingById);

//Elimina un topping por id
router.delete("/delete/:id", deleteToppingById);

export default router;
