import { Request, Response } from "express";
import { Order, Item } from "../Entities/";
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

const readOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await orderRepository.find();

    return res.status(200).json({ ok: true, orders });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const order = await orderRepository.findOneBy({ id: req.params.id });

    idValidation(order, "pedido");

    return res.status(200).json({ ok: true, order });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comment } = req.body;

  try {
    const order = await orderRepository.findOneBy({ id: req.params.id });

    idValidation(order, "pedido");

    order.comment = comment;

    await orderRepository.save(order);

    return res.status(200).json({ ok: true, order });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const order = await orderRepository.findOneBy({ id });

    idValidation(order, "pedido");

    await orderRepository.remove(order);

    return res.status(200).json({ ok: true, order, msg: "Orden eliminada!" });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createOrder,
  readOrders,
  readOrderById,
  updateOrderById,
  deleteOrderById,
};
