import { Router } from "express";
import {
  createTopping,
  deleteToppingById,
  readToppings,
  readToppingById,
  updateToppingById,
} from "../controllers/Topping.controller";

const router = Router();

router.post("/create", createTopping);

router.get("/", readToppings);

router.get("/:id", readToppingById);

router.put("/update/:id", updateToppingById);

router.delete("/delete/:id", deleteToppingById);

export default router;
