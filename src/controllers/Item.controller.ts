import { Request, Response } from "express";
import { Item } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";
import { Order } from "../Entities/Order";
import { Menu } from "../Entities/Menu";

const itemRepository = dbConfig.getRepository(Item);

const createItem = async (req: Request, res: Response): Promise<Response> => {
  const newData = req.body;

  try {
    const newItem = await itemRepository.save(newData);

    return res.status(200).json({ ok: true, item: newItem });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const addToOrder = async (req: Request, res: Response): Promise<Response> => {
  const { itemId } = req.params;

  const newData = req.body;

  try {
    await itemRepository.update({ id: itemId }, newData);

    const items = await itemRepository
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.order", "order")
      .leftJoinAndSelect("item.menu", "menu")
      .where("orderId = :orderId", {
        orderId: newData.order,
      })
      .getManyAndCount();

    // const {price} = await dbConfig.getRepository(Menu).findOne({
    //   where: {

    //   }
    // })
    console.log(items);

    //Sumar el total encontrando el menu

    // const order = await dbConfig
    //   .getRepository(Order)
    //   .findOneBy({ id: orderId });

    // const total = order.
    // order.total =

    return res.status(200).json({ ok: true, item: itemId });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const items = await itemRepository.find({
      relations: {
        user: true,
        menu: true,
        order: true,
      },
    });

    return res.status(200).json({ ok: true, items });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readItemById = async () => {};

const updateItemById = async () => {};

const deleteItemById = async () => {};

export {
  createItem,
  addToOrder,
  readItems,
  readItemById,
  updateItemById,
  deleteItemById,
};
