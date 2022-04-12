import { Router } from "express";
import {
  createItem,
  addToOrder,
  readItems,
  readItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/Item.controller";

const router = Router();

router.post("/create", createItem);

router.post("/add/:itemId", addToOrder);

router.get("/", readItems);

router.get("/one/:id", readItemById);

router.put("/update/:id", updateItemById);

router.delete("/delete/:id", deleteItemById);

export default router;
