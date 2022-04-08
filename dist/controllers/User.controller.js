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
exports.deleteUserById = exports.updateUserById = exports.readUserById = exports.readUsers = exports.loginUser = exports.registerUser = void 0;
const Entities_1 = require("../Entities");
const db_1 = require("../config/db");
const cryptPassword_1 = require("../helpers/cryptPassword");
const signJwt_1 = require("../helpers/signJwt");
const userRepository = db_1.dbConfig.getRepository(Entities_1.User);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    try {
        const user = yield userRepository.findOneBy({ email: newData.email });
        if (user)
            throw "El usuario ya existe";
        const hashedPassrod = (0, cryptPassword_1.cryptPassword)(newData.password);
        newData.password = hashedPassrod;
        const newUser = yield userRepository.save(newData);
        return res
            .status(200)
            .json({ ok: true, user: newUser, msg: "Usuario creado!" });
        //TODO
        //Hacer que registrarte te logee
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userRepository.findOneBy({ email });
        if (!user)
            throw "No existe el usuario y/o la contraseña";
        const isValidPassword = (0, cryptPassword_1.comparePasswords)(password, user.password);
        if (!isValidPassword)
            throw "Los datos son incorrectos";
        const userVerified = {
            id: Number(user.id),
            email,
        };
        const token = yield (0, signJwt_1.signJwt)(userVerified);
        return res.status(200).json({
            ok: true,
            msg: "Iniciaste sesión",
            id: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.loginUser = loginUser;
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("users");
});
exports.readUsers = readUsers;
const readUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res;
});
exports.readUserById = readUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res;
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res;
});
exports.deleteUserById = deleteUserById;
