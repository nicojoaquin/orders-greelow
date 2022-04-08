"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Topping_controller_1 = require("../controllers/Topping.controller");
const revalidateToken_1 = require("../middlewares/revalidateToken");
const router = (0, express_1.Router)();
router.use(revalidateToken_1.revalidateToken);
//Crea un topping nuevo
router.post("/create", Topping_controller_1.createTopping);
//Obtiene todos los toppings
router.get("/", Topping_controller_1.readToppings);
//Obtiene un topping por id
router.get("/one/:id", Topping_controller_1.readToppingById);
//Actualiza un topping por id
router.put("/update/:id", Topping_controller_1.updateToppingById);
//Elimina un topping por id
router.delete("/delete/:id", Topping_controller_1.deleteToppingById);
exports.default = router;
