import { Router } from "express";
import {
  createTopping,
  deleteToppingById,
  readToppings,
  readToppingById,
  updateToppingById,
} from "../controllers/Topping.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { adminValidation } from "../middlewares/rolesValidation";

const router = Router();

router.use(revalidateToken);

//Crea un topping nuevo
router.post("/create", adminValidation, createTopping);

//Obtiene todos los toppings
router.get("/", readToppings);

//Obtiene un topping por id
router.get("/one/:id", readToppingById);

//Actualiza un topping por id
router.put("/update/:id", adminValidation, updateToppingById);

//Elimina un topping por id
router.delete("/delete/:id", adminValidation, deleteToppingById);

export default router;
