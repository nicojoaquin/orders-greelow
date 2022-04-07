import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signJwt } from "../helpers/signJwt";
import { userVerify } from "../types";

export const revalidateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  //Validamos que haya token en la peticion
  if (!token)
    return res.status(401).json({ ok: false, msg: "No esta autorizado" });

  const { id, email } = jwt.verify(
    token,
    process.env.JWT_SECRET_SEED
  ) as JwtPayload;

  const user: userVerify = {
    id,
    email,
  };

  //Obtenemos el payload del token y generamos uno nuevo, luego mandamos el usuario a los controladores con su token nuevo

  const newToken = await signJwt(user);

  res.locals.user = { ...user, newToken };

  next();
};
