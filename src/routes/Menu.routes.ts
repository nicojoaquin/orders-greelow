import { Router } from "express";
import {
  createMenu,
  readMenuById,
  readMenues,
  updateMenuById,
  deleteToppings,
} from "../controllers/Menu.controller";

const router = Router();

router.post("/create", createMenu);

router.get("/", readMenues);

router.get("/:id", readMenuById);

router.put("/update/:id", updateMenuById);

router.put("/update/:id/topping/delete/:toppingId", deleteToppings);

export default router;
