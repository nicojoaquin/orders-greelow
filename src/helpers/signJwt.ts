import jwt from "jsonwebtoken";
import { userVerify } from "../types";

export const signJwt = async (user: userVerify) => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id, email: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.warn(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};
