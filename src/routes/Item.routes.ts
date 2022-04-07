import { Router } from "express";
import {
  createItem,
  readItems,
  readItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/Item.controller";

const router = Router();

router.post("/create", createItem);

router.get("/", readItems);

router.get("/one/:id", readItemById);

router.put("/update/:id", updateItemById);

router.delete("/delete/:id", deleteItemById);

export default router;
