import { Router } from "express";
import {
  createTopping,
  deleteToppingById,
  readToppings,
  readToppingById,
  updateToppingById,
} from "../controllers/Topping.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { rolesValidation } from "../middlewares/rolesValidation";

const router = Router();

router.use(revalidateToken);

//Crea un topping nuevo
router.post("/create", rolesValidation, createTopping);

//Obtiene todos los toppings
router.get("/", readToppings);

//Obtiene un topping por id
router.get("/one/:id", readToppingById);

//Actualiza un topping por id
router.put("/update/:id", rolesValidation, updateToppingById);

//Elimina un topping por id
router.delete("/delete/:id", rolesValidation, deleteToppingById);

export default router;
