import { Request, Response } from "express";
import { Order } from "../Entities/";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const orderRepository = dbConfig.getRepository(Order);

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newData = req.body;

    const newOrder = await orderRepository.save(newData);

    return res.status(200).json({ ok: true, order: newOrder });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readOrders = async () => {
  const orders = await orderRepository.find({
    relations: {
      items: true,
    },
  });
};

const readOrderById = async () => {};

const updateOrderById = async () => {};

const deleteOrderById = async () => {};

export {
  createOrder,
  readOrders,
  readOrderById,
  updateOrderById,
  deleteOrderById,
};
