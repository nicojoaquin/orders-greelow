"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_controller_1 = require("../controllers/Category.controller");
const revalidateToken_1 = require("../middlewares/revalidateToken");
const router = (0, express_1.Router)();
router.use(revalidateToken_1.revalidateToken);
//Crea una categoria nuevo
router.post("/create", Category_controller_1.createCategory);
//Obtiene todas los categorias
router.get("/", Category_controller_1.readCategories);
//Obtiene una categoria por id
router.get("/one/:id", Category_controller_1.readCategoryById);
//Actualiza una categoria por id
router.put("/update/:id", Category_controller_1.updateCategoryById);
//Elimina una categoria por id
router.delete("/delete/:id", Category_controller_1.deleteCategoryById);
exports.default = router;
