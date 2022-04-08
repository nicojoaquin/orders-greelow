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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt_1 = require("../helpers/signJwt");
const revalidateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    //Validamos que haya token en la peticion
    if (!token)
        return res.status(401).json({ ok: false, msg: "No esta autorizado" });
    const { id, email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_SEED);
    const user = {
        id,
        email,
    };
    //Obtenemos el payload del token y generamos uno nuevo, luego mandamos el usuario a los controladores con su token nuevo
    const newToken = yield (0, signJwt_1.signJwt)(user);
    res.locals.user = Object.assign(Object.assign({}, user), { newToken });
    next();
});
exports.revalidateToken = revalidateToken;
