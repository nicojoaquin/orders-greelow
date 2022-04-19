import { Request, Response } from "express";
import { Item, Order, Menu } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";
import { userValidation } from "../helpers/userValidation";

const itemRepository = dbConfig.getRepository(Item);
const orderRepository = dbConfig.getRepository(Order);

const createItem = async (req: Request, res: Response): Promise<Response> => {
  const { order, menu } = req.body;
  const { id } = res.locals.user;

  try {
    const orderExist = await orderRepository.findOneBy({ id: order });

    idValidation(orderExist, "pedido");

    const newItem = await itemRepository.save({
      order,
      menu,
      user: id,
    });

    const { price } = await dbConfig
      .getRepository(Menu)
      .findOneBy({ id: menu });

    orderExist.total += price;

    await orderRepository.save(orderExist);

    return res.status(200).json({ ok: true, item: newItem });
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

const readItemsByOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await itemRepository.find({
      where: {
        order: { id: req.params.orderId },
      },
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

const readItemById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const item = await itemRepository.findOne({
      where: {
        id: req.params.id,
      },
      relations: {
        menu: true,
        order: true,
        user: true,
      },
    });

    idValidation(item, "item");

    return res.status(200).json({ ok: true, item });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const item = await itemRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        menu: true,
        order: true,
      },
    });

    userValidation(item.user.id, res.locals.user.id);

    idValidation(item, "item");

    const orderExist = await orderRepository.findOneBy({ id: item.order.id });

    idValidation(orderExist, "pedido");

    await itemRepository.remove(item);

    orderExist.total -= item.menu.price;

    await orderRepository.save(orderExist);

    return res
      .status(200)
      .json({ ok: true, msg: "Item eliminado", item: { ...item, id } });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createItem,
  readItems,
  readItemsByOrder,
  readItemById,
  deleteItemById,
};
