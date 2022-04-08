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
    const newData: Topping = req.body;

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
  const newData: Object = req.body;

  try {
    const topping = await toppingRepository.findOneBy({ id });

    idValidation(topping, "topping");

    await toppingRepository.update(id, newData);

    return res.status(200).json({
      ok: true,
      topping: { ...newData, id },
      token: res.locals.user.newToken,
    });
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

    return res.status(200).json({
      ok: true,
      topping: { ...topping, id },
      msg: "Topping eliminado",
      token: res.locals.user.newToken,
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
