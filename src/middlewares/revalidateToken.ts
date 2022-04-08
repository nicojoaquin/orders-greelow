import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const revalidateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  try {
    //Validamos que haya token en la peticion
    if (!token)
      return res
        .status(401)
        .json({ ok: false, msg: "No esta autorizado", errorCode: 900 });

    //Validamos que el token sea valido
    jwt.verify(token, process.env.JWT_SECRET_SEED, (err, decoded) => {
      if (err) {
        throw "No esta autorizado, token no válido";
      }
      res.locals.user = decoded;
    });

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: error,
      errorCode: 901,
    });
  }
};
