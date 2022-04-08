"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Category_routes_1 = __importDefault(require("./Category.routes"));
const Restaurant_routes_1 = __importDefault(require("./Restaurant.routes"));
const User_routes_1 = __importDefault(require("./User.routes"));
const Topping_routes_1 = __importDefault(require("./Topping.routes"));
const Menu_routes_1 = __importDefault(require("./Menu.routes"));
const Item_routes_1 = __importDefault(require("./Item.routes"));
// router.use("/", (req, res) => {
//   res.send("Endpoints: \n/category \n/restaurant \n/user \n/topping");
// });
router.use("/category", Category_routes_1.default);
router.use("/restaurant", Restaurant_routes_1.default);
router.use("/user", User_routes_1.default);
router.use("/topping", Topping_routes_1.default);
router.use("/menu", Menu_routes_1.default);
router.use("/item", Item_routes_1.default);
exports.default = router;
