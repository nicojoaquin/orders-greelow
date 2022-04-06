import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  readCategories,
  readCategoryById,
  updateCategoryById,
} from "../controllers/Category.controller";

const router = Router();

//Crea una categoria nuevo
router.post("/create", createCategory);

//Obtiene todas los categorias
router.get("/", readCategories);

//Obtiene una categoria por id
router.get("/:id", readCategoryById);

//Actualiza una categoria por id
router.put("/update/:id", updateCategoryById);

//Elimina una categoria por id
router.delete("/delete/:id", deleteCategoryById);

export default router;
