"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Menu_controller_1 = require("../controllers/Menu.controller");
const revalidateToken_1 = require("../middlewares/revalidateToken");
const router = (0, express_1.Router)();
router.use(revalidateToken_1.revalidateToken);
//Crea un nuevo menu
router.post("/create", Menu_controller_1.createMenu);
//Obtiene los menues
router.get("/", Menu_controller_1.readMenus);
//Obtiene un menu por su id
router.get("/one/:id", Menu_controller_1.readMenuById);
//Obtiene menues dependiendo de los filtros(query params)
router.get("/filter", Menu_controller_1.readMenusFilter);
//Actualiza un menu por su id
router.put("/update/:id", Menu_controller_1.updateMenuById);
//Elimina un topping de un menu por el id del menu y el id del topping
router.put("/update/:id/topping/delete/:toppingId", Menu_controller_1.deleteToppings);
router.put("/update/:id/topping/add/:toppingId", Menu_controller_1.addToppings);
//Elimina un menu por su id
router.delete("/delete/:id", Menu_controller_1.deleteMenuById);
exports.default = router;
