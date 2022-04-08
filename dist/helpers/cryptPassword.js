"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.cryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cryptPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassord = bcryptjs_1.default.hashSync(password, salt);
    return hashedPassord;
};
exports.cryptPassword = cryptPassword;
const comparePasswords = (requestPassword, userPassword) => {
    return bcryptjs_1.default.compareSync(requestPassword, userPassword);
};
exports.comparePasswords = comparePasswords;
