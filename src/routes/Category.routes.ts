import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  readCategories,
  readCategoryById,
  updateCategoryById,
} from "../controllers/Category.controller";

const router = Router();

router.post("/create", createCategory);

router.get("/", readCategories);

router.get("/:id", readCategoryById);

router.put("/update/:id", updateCategoryById);

router.delete("/delete/:id", deleteCategoryById);

export default router;
