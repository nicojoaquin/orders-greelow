import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurantById,
  readRestaurants,
  readRestaurantById,
  updateRestaurantById,
} from "../controllers/Restaurant.controller";
import { revalidateToken } from "../middlewares/revalidateToken";

const router = Router();

router.use(revalidateToken);

//Crea un restaurant nuevo
router.post("/create", createRestaurant);

//Obtiene todos los restaurants
router.get("/", readRestaurants);

//Obtiene un restaurant por id
router.get("/one/:id", readRestaurantById);

//Actualiza un restaurant por id
router.put("/update/:id", updateRestaurantById);

//Elimina un restaurant por id
router.delete("/delete/:id", deleteRestaurantById);

export default router;
