import { Router } from "express";
import {
  createOrder,
  readOrders,
  readOrderById,
  updateOrderById,
  deleteOrderById,
} from "../controllers/Order.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
const router = Router();

router.use(revalidateToken);

//Crea un topping nuevo
router.post("/create", createOrder);

//Obtiene todos los toppings
router.get("/", readOrders);

//Obtiene un topping por id
router.get("/one/:id", readOrderById);

//Actualiza un topping por id
router.put("/update/:id", updateOrderById);

//Elimina un topping por id
router.delete("/delete/:id", deleteOrderById);

export default router;
