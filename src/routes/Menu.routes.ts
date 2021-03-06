import { Router } from "express";
import {
  createMenu,
  readMenuById,
  readMenusFilter,
  readMenus,
  updateMenuById,
  deleteToppings,
  addToppings,
  deleteMenuById,
} from "../controllers/Menu.controller";
import { revalidateToken } from "../middlewares/revalidateToken";
import { adminValidation } from "../middlewares/rolesValidation";

const router = Router();

//Crea un nuevo menu
router.post("/create", revalidateToken, adminValidation, createMenu);

//Obtiene los menues
router.get("/", readMenus);

//Obtiene un menu por su id
router.get("/one/:id", readMenuById);

//Obtiene menus dependiendo de los filtros(query params)
router.get("/filter", readMenusFilter);

//Actualiza un menu por su id
router.put("/update/:id", revalidateToken, adminValidation, updateMenuById);

//Elimina un topping de un menu por el id del menu y el id del topping
router.put(
  "/update/:id/topping/delete/:toppingId",
  revalidateToken,
  adminValidation,
  deleteToppings
);

router.put(
  "/update/:id/topping/add/:toppingId",
  revalidateToken,
  adminValidation,
  addToppings
);

//Elimina un menu por su id
router.delete("/delete/:id", revalidateToken, adminValidation, deleteMenuById);

export default router;
