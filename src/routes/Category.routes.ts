import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  readCategories,
  readCategoryById,
  updateCategoryById,
} from "../controllers/Category.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { adminValidation } from "../middlewares/rolesValidation";

const router = Router();

//Crea una categoria nuevo
router.post("/create", revalidateToken, adminValidation, createCategory);

//Obtiene todas los categorias
router.get("/", readCategories);

//Obtiene una categoria por id
router.get("/one/:id", readCategoryById);

//Actualiza una categoria por id
router.put("/update/:id", revalidateToken, adminValidation, updateCategoryById);

//Elimina una categoria por id
router.delete(
  "/delete/:id",
  revalidateToken,
  adminValidation,
  deleteCategoryById
);

export default router;
