import { Request, Response } from "express";
import { User } from "../Entities";
import { dbConfig } from "../config/db";
import { cryptPassword, comparePasswords } from "../helpers/cryptPassword";
import { signJwt } from "../helpers/signJwt";
import { userVerify } from "../types";

const userRepository = dbConfig.getRepository(User);

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const newData = req.body;

  try {
    const user = await userRepository.findOneBy({ email: newData.email });

    if (user) throw "El usuario ya existe";

    const hashedPassrod = cryptPassword(newData.password);

    newData.password = hashedPassrod;

    const newUser = await userRepository.save(newData);

    return res
      .status(200)
      .json({ ok: true, user: newUser, msg: "Usuario creado!" });

    //TODO
    //Hacer que registrarte te logee
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ email });

    if (!user) throw "No existe el usuario y/o la contraseña";

    const isValidPassword = comparePasswords(password, user.password);

    if (!isValidPassword) throw "Los datos son incorrectos";

    const userVerified: userVerify = {
      id: Number(user.id),
      email,
    };

    const token = await signJwt(userVerified);

    return res.status(200).json({
      ok: true,
      msg: "Iniciaste sesión",
      id: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  return res.send("users");
};

const readUserById = async (req: Request, res: Response): Promise<Response> => {
  return res;
};

const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res;
};

const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res;
};

export {
  registerUser,
  loginUser,
  readUsers,
  readUserById,
  updateUserById,
  deleteUserById,
};
