import { Router } from "express";
import { revalidateToken } from "../middlewares/revalidateToken";
import {
  createItem,
  readItems,
  readItemsByOrder,
  readItemById,
  deleteItemById,
} from "../controllers/Item.controller";

const router = Router();

router.post("/create", revalidateToken, createItem);

router.get("/", readItems);

router.get("/:orderId", readItemsByOrder);

router.get("/one/:id", readItemById);

router.delete("/delete/:id", revalidateToken, deleteItemById);

export default router;
