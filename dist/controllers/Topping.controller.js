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
exports.deleteToppingById = exports.updateToppingById = exports.readToppingById = exports.readToppings = exports.createTopping = void 0;
const Entities_1 = require("../Entities");
const db_1 = require("../config/db");
const idValidation_1 = require("../helpers/idValidation");
const toppingRepository = db_1.dbConfig.getRepository(Entities_1.Topping);
const createTopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const newTopping = yield toppingRepository.save(newData);
        return res
            .status(200)
            .json({ ok: true, topping: newTopping, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createTopping = createTopping;
const readToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topping = yield toppingRepository.find();
        return res
            .status(200)
            .json({ ok: true, topping, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readToppings = readToppings;
const readToppingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const topping = yield toppingRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(topping, "restaurant");
        return res
            .status(200)
            .json({ ok: true, topping, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readToppingById = readToppingById;
const updateToppingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newData = req.body;
    try {
        const topping = yield toppingRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(topping, "topping");
        yield toppingRepository.update(id, newData);
        return res.status(200).json({
            ok: true,
            topping: Object.assign(Object.assign({}, newData), { id }),
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateToppingById = updateToppingById;
const deleteToppingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const topping = yield toppingRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(topping, "topping");
        yield toppingRepository.remove(topping);
        return res.status(200).json({
            ok: true,
            topping: Object.assign(Object.assign({}, topping), { id }),
            msg: "Topping eliminado",
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteToppingById = deleteToppingById;
