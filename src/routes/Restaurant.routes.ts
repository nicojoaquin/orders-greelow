import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurantById,
  readRestaurants,
  readRestaurantById,
  updateRestaurantById,
} from "../controllers/Restaurant.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { adminValidation } from "../middlewares/rolesValidation";

const router = Router();

//Crea un restaurant nuevo
router.post("/create", revalidateToken, adminValidation, createRestaurant);

//Obtiene todos los restaurants
router.get("/", readRestaurants);

//Obtiene un restaurant por id
router.get("/one/:id", readRestaurantById);

//Actualiza un restaurant por id
router.put(
  "/update/:id",
  revalidateToken,
  adminValidation,
  updateRestaurantById
);

//Elimina un restaurant por id
router.delete(
  "/delete/:id",
  revalidateToken,
  adminValidation,
  deleteRestaurantById
);

export default router;
