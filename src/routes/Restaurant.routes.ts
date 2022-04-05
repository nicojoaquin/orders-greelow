import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurantById,
  readRestaurants,
  readRestaurantById,
  updateRestaurantById,
} from "../controllers/Restaurant.controller";

const router = Router();

router.post("/create", createRestaurant);

router.get("/", readRestaurants);

router.get("/:id", readRestaurantById);

router.put("/update/:id", updateRestaurantById);

router.delete("/delete/:id", deleteRestaurantById);

export default router;
