"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantById = exports.updateRestaurantById = exports.readRestaurantById = exports.readRestaurants = exports.createRestaurant = void 0;
const Entities_1 = require("../Entities");
const db_1 = require("../config/db");
const idValidation_1 = require("../helpers/idValidation");
const restaurantRepository = db_1.dbConfig.getRepository(Entities_1.Restaurant);
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const newRestaurant = yield restaurantRepository.save(newData);
        return res.status(200).json({
            ok: true,
            restaurant: newRestaurant,
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createRestaurant = createRestaurant;
const readRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurantRepository.find();
        return res
            .status(200)
            .json({ ok: true, restaurants, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readRestaurants = readRestaurants;
const readRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const restaurant = yield restaurantRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(restaurant, "restaurant");
        return res
            .status(200)
            .json({ ok: true, restaurant, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readRestaurantById = readRestaurantById;
const updateRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newData = req.body;
    try {
        const restaurant = yield restaurantRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(restaurant, "restaurant");
        yield restaurantRepository.update(id, newData);
        return res.status(200).json({
            ok: true,
            restaurant: Object.assign(Object.assign({}, newData), { id }),
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateRestaurantById = updateRestaurantById;
const deleteRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const restaurant = yield restaurantRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(restaurant, "restaurant");
        yield restaurantRepository.remove(restaurant).catch(() => {
            throw "No se puede eliminar el restaurant, esta asociado a un menu";
        });
        return res.status(200).json({
            ok: true,
            restaurant: Object.assign(Object.assign({}, restaurant), { id }),
            msg: "Restaurant eliminado",
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteRestaurantById = deleteRestaurantById;
