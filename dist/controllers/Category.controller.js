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
exports.deleteCategoryById = exports.updateCategoryById = exports.readCategoryById = exports.readCategories = exports.createCategory = void 0;
const Entities_1 = require("../Entities/");
const db_1 = require("../config/db");
const idValidation_1 = require("../helpers/idValidation");
const categoryRepository = db_1.dbConfig.getRepository(Entities_1.Category);
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const newCategory = yield categoryRepository.save(newData);
        return res.status(200).json({
            ok: true,
            category: newCategory,
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createCategory = createCategory;
const readCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryRepository.find();
        return res
            .status(200)
            .json({ ok: true, categories, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readCategories = readCategories;
const readCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield categoryRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(category, "category");
        return res
            .status(200)
            .json({ ok: true, category, token: res.locals.user.newToken });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readCategoryById = readCategoryById;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newData = req.body;
    try {
        const category = yield categoryRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(category, "category");
        yield categoryRepository.update(id, newData);
        return res.status(200).json({
            ok: true,
            category: Object.assign(Object.assign({}, newData), { id }),
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield categoryRepository.findOneBy({ id });
        (0, idValidation_1.idValidation)(category, "category");
        yield categoryRepository.remove(category).catch(() => {
            throw "No se puede eliminar la categoría, esta asociada a un menu";
        });
        return res.status(200).json({
            ok: true,
            category: Object.assign(Object.assign({}, category), { id }),
            msg: "Categoría eliminada",
            token: res.locals.user.newToken,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteCategoryById = deleteCategoryById;
