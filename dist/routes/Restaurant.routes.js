"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Restaurant_controller_1 = require("../controllers/Restaurant.controller");
const revalidateToken_1 = require("../middlewares/revalidateToken");
const router = (0, express_1.Router)();
router.use(revalidateToken_1.revalidateToken);
//Crea un restaurant nuevo
router.post("/create", Restaurant_controller_1.createRestaurant);
//Obtiene todos los restaurants
router.get("/", Restaurant_controller_1.readRestaurants);
//Obtiene un restaurant por id
router.get("/one/:id", Restaurant_controller_1.readRestaurantById);
//Actualiza un restaurant por id
router.put("/update/:id", Restaurant_controller_1.updateRestaurantById);
//Elimina un restaurant por id
router.delete("/delete/:id", Restaurant_controller_1.deleteRestaurantById);
exports.default = router;
