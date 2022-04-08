"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = void 0;
const idValidation = (item, itemName) => {
    if (!item)
        throw `No se encuentra el item '${itemName}' con ese id`;
}; //Valida que el id busque algun item, y si no tira un error
exports.idValidation = idValidation;
