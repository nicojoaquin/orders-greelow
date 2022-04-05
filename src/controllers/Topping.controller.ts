import { Request, Response } from "express";
import { Topping } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const toppingRepository = dbConfig.getRepository(Topping);

const createTopping = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newData = req.body;

    const newTopping = await toppingRepository.save(newData);

    return res.status(200).json({ ok: true, topping: newTopping });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readToppings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const topping = await toppingRepository.find();

    return res.status(200).json({ ok: true, topping });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readToppingById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const topping = await toppingRepository.findOneBy({ id });

    idValidation(topping, "restaurant");

    return res.status(200).json({ ok: true, topping });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateToppingById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const topping = await toppingRepository.findOneBy({ id });

    idValidation(topping, "topping");

    await toppingRepository.update(id, newData);

    const updatedTopping = {
      ...newData,
      id,
    };

    return res.status(200).json({ ok: true, topping: updatedTopping });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteToppingById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const topping = await toppingRepository.findOneBy({ id });

    idValidation(topping, "topping");

    await toppingRepository.remove(topping);

    const deletedTopping = {
      ...topping,
      id,
    };

    return res.status(200).json({
      ok: true,
      topping: deletedTopping,
      msg: "Topping eliminado",
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createTopping,
  readToppings,
  readToppingById,
  updateToppingById,
  deleteToppingById,
};
