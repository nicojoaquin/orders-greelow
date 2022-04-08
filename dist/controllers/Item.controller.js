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
exports.deleteItemById = exports.updateItemById = exports.readItemById = exports.readItems = exports.createItem = void 0;
const Entities_1 = require("../Entities");
const db_1 = require("../config/db");
const itemRepository = db_1.dbConfig.getRepository(Entities_1.Item);
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createItem = createItem;
const readItems = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.readItems = readItems;
const readItemById = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.readItemById = readItemById;
const updateItemById = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateItemById = updateItemById;
const deleteItemById = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteItemById = deleteItemById;
