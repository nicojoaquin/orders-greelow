import { Router } from "express";
import {
  createMenu,
  readMenuById,
  readMenuFilter,
  readMenues,
  updateMenuById,
  deleteToppings,
  addToppings,
  deleteMenuById,
} from "../controllers/Menu.controller";

const router = Router();

//Crea un nuevo menu
router.post("/create", createMenu);

//Obtiene los menues
router.get("/", readMenues);

//Obtiene un menu por su id
router.get("/one/:id", readMenuById);

//Obtiene menues dependiendo de los filtros(query params)
router.get("/filter", readMenuFilter);

//Actualiza un menu por su id
router.put("/update/:id", updateMenuById);

//Elimina un topping de un menu por el id del menu y el id del topping
router.put("/update/:id/topping/delete/:toppingId", deleteToppings);

router.put("/update/:id/topping/add/:toppingId", addToppings);

//Elimina un menu por su id
router.delete("/delete/:id", deleteMenuById);

export default router;
