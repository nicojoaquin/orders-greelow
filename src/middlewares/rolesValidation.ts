import { NextFunction, Request, Response } from "express";
import { User } from "../Entities";
import { dbConfig } from "../config/db";

export const rolesValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user;

  const { isAdmin } = await dbConfig.getRepository(User).findOneBy({ id });

  if (!isAdmin) {
    return res.status(401).json({
      ok: false,
      msg: "No tiene permisos para realizar esta acción",
      errorCode: 800,
    });
  }

  next();
};
