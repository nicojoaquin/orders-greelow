import { Request, Response } from "express";
import { Menu } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const menuRepository = dbConfig.getRepository(Menu);

const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newData = req.body;

    const newMenu = await menuRepository.save(newData);

    return res.status(200).json({ ok: true, menu: newMenu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenues = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menues = await menuRepository.find({
      relations: {
        toppings: true,
        restaurant: true,
        category: true,
      },
    });

    return res.status(200).json({ ok: true, menues });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenuById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await menuRepository.findOne({
      where: {
        id: req.params.id,
      },
      relations: {
        toppings: true,
        restaurant: true,
        category: true,
      },
    });

    idValidation(menu, "menu");

    return res.status(200).json({ ok: true, menu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const menu = await menuRepository.findOneBy({ id });

    idValidation(menu, "menu");

    await menuRepository.update(id, newData);

    const updatedMenu = {
      ...newData,
      id,
    };

    return res.status(200).json({ ok: true, menu: updatedMenu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteToppings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const menu = await menuRepository.findOne({
      where: {
        id: req.params.id,
      },
      relations: {
        toppings: true,
      },
    });

    const toppings = menu.toppings;

    const newToppings = toppings.filter(
      (topping) => topping.id.toString() !== req.params.toppingId
    );

    menu.toppings = newToppings;

    await menuRepository.save(menu);

    return res.json({ toppings: newToppings });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

// const addToppings = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const menu = await menuRepository.findOne({
//       where: {
//         id: req.params.id,
//       },
//       relations: {
//         toppings: true,
//       },
//     });

//     const toppings = menu.toppings;

//     const newToppings:Object = []

//     menu.toppings = newToppings;

//     await menuRepository.save(menu);

//     return res.json({ toppings: newToppings });
//   } catch (error) {
//     return res.json({ ok: false, msg: error });
//   }
// };

export {
  createMenu,
  readMenues,
  readMenuById,
  updateMenuById,
  deleteToppings,
  //   addToppings,
};
