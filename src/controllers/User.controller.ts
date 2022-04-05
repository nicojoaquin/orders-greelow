import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  return res;
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

export { createUser, readUsers, readUserById, updateUserById, deleteUserById };
