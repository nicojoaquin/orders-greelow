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
exports.deleteMenuById = exports.addToppings = exports.deleteToppings = exports.updateMenuById = exports.readMenusFilter = exports.readMenuById = exports.readMenus = exports.createMenu = void 0;
const Entities_1 = require("../Entities");
const db_1 = require("../config/db");
const idValidation_1 = require("../helpers/idValidation");
const menuRepository = db_1.dbConfig.getRepository(Entities_1.Menu);
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const newMenu = yield menuRepository.save(newData);
        return res
            .status(200)
            .json({ ok: true, menu: newMenu, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createMenu = createMenu;
const readMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menus = yield menuRepository.find({
            relations: {
                toppings: true,
                restaurant: true,
                category: true,
            },
        });
        return res
            .status(200)
            .json({ ok: true, menus, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readMenus = readMenus;
const readMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menu = yield menuRepository.findOne({
            where: {
                id,
            },
            relations: {
                toppings: true,
                restaurant: true,
                category: true,
            },
        });
        (0, idValidation_1.idValidation)(menu, "menu");
        return res
            .status(200)
            .json({ ok: true, menu, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readMenuById = readMenuById;
const readMenusFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, categoryId } = req.query;
    try {
        let menus;
        if (!restaurantId || categoryId)
            throw "No se envio ningun parametro de búsqueda";
        if (!categoryId) {
            menus = yield menuRepository
                .createQueryBuilder("menu")
                .leftJoinAndSelect("menu.restaurant", "restaurant")
                .leftJoinAndSelect("menu.category", "category")
                .leftJoinAndSelect("menu.toppings", "toppings")
                .where("restaurantId = :restaurantId", {
                restaurantId: Number(restaurantId),
            })
                .getManyAndCount();
        }
        if (!restaurantId) {
            menus = yield menuRepository
                .createQueryBuilder("menu")
                .leftJoinAndSelect("menu.restaurant", "restaurant")
                .leftJoinAndSelect("menu.category", "category")
                .leftJoinAndSelect("menu.toppings", "toppings")
                .where("categoryId = :categoryId", {
                categoryId: Number(categoryId),
            })
                .getManyAndCount();
        }
        if (restaurantId && categoryId) {
            menus = yield menuRepository
                .createQueryBuilder("menu")
                .leftJoinAndSelect("menu.restaurant", "restaurant")
                .leftJoinAndSelect("menu.category", "category")
                .leftJoinAndSelect("menu.toppings", "toppings")
                .where("restaurantId = :restaurantId", {
                restaurantId: Number(restaurantId),
            })
                .andWhere("categoryId = :categoryId", {
                categoryId: Number(categoryId),
            })
                .getManyAndCount();
        }
        return res
            .status(200)
            .json({ ok: true, menus: menus[0], token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readMenusFilter = readMenusFilter;
const updateMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newData = req.body;
    try {
        const menu = yield menuRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(menu, "menu");
        yield menuRepository.update(id, newData);
        return res.status(200).json({
            ok: true,
            menu: Object.assign(Object.assign({}, newData), { id }),
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateMenuById = updateMenuById;
const deleteToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, toppingId } = req.params;
    try {
        const menu = yield menuRepository.findOne({
            where: {
                id,
            },
            relations: {
                toppings: true,
            },
        });
        (0, idValidation_1.idValidation)(menu, "menu");
        //Validamos que el topping que queremos eliminar exista en el menu
        const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);
        (0, idValidation_1.idValidation)(menuTopping, "topping");
        //Eliminamos el topping del menu seleccionado
        yield menuRepository
            .createQueryBuilder("menu")
            .select("*")
            .where(id)
            .relation(Entities_1.Menu, "toppings")
            .of(menu.id)
            .remove(Number(toppingId));
        return res.json({ ok: true, menu, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteToppings = deleteToppings;
const addToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, toppingId } = req.params;
    try {
        const menu = yield menuRepository.findOne({
            where: {
                id,
            },
            relations: {
                toppings: true,
            },
        });
        (0, idValidation_1.idValidation)(menu, "menu");
        //Verificamos que el topping sea existente en la base de datos
        const topping = yield db_1.dbConfig
            .getRepository(Entities_1.Topping)
            .findOneBy({ id: toppingId });
        (0, idValidation_1.idValidation)(topping, "topping");
        const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);
        //Verificamos que el topping que se quiera agregar no exista en el menu
        if (menuTopping)
            throw "El topping ya se encuentra";
        yield menuRepository
            .createQueryBuilder("menu")
            .relation(Entities_1.Menu, "toppings")
            .of(menu.id)
            .add(Number(toppingId));
        console.log(menu);
        return res.json({ ok: true, menu, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.addToppings = addToppings;
const deleteMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menu = yield menuRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(menu, "menu");
        yield menuRepository.remove(menu);
        return res.status(200).json({
            ok: true,
            menu: Object.assign(Object.assign({}, menu), { id }),
            msg: "menu eliminado",
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteMenuById = deleteMenuById;
