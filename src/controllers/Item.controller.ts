import { Request, Response } from "express";
import { Item } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const itemRepository = dbConfig.getRepository(Item);

const createItem = async (req: Request, res: Response): Promise<Response> => {
  try {
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readItems = async () => {};

const readItemById = async () => {};

const updateItemById = async () => {};

const deleteItemById = async () => {};

export { createItem, readItems, readItemById, updateItemById, deleteItemById };
