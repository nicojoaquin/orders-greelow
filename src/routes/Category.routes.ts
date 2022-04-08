import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  readCategories,
  readCategoryById,
  updateCategoryById,
} from "../controllers/Category.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { rolesValidation } from "../middlewares/rolesValidation";

const router = Router();

router.use(revalidateToken);

//Crea una categoria nuevo
router.post("/create", rolesValidation, createCategory);

//Obtiene todas los categorias
router.get("/", readCategories);

//Obtiene una categoria por id
router.get("/one/:id", readCategoryById);

//Actualiza una categoria por id
router.put("/update/:id", rolesValidation, updateCategoryById);

//Elimina una categoria por id
router.delete("/delete/:id", rolesValidation, deleteCategoryById);

export default router;
