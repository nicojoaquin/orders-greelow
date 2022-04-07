import { Request, Response } from "express";
import { Menu, Topping } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const menuRepository = dbConfig.getRepository(Menu);

const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newData = req.body;

    const newMenu: Menu = await menuRepository.save(newData);

    return res.status(200).json({ ok: true, menu: newMenu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenues = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menus = await menuRepository.find({
      relations: {
        toppings: true,
        restaurant: true,
        category: true,
      },
    });

    return res.status(200).json({ ok: true, menus });
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

const readMenuFilter = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { restaurantId, categoryId } = req.query;

  try {
    let menus;

    if (!categoryId) {
      menus = await menuRepository
        .createQueryBuilder("menu")
        .leftJoinAndSelect("menu.restaurant", "restaurant")
        .leftJoinAndSelect("menu.category", "category")
        .leftJoinAndSelect("menu.toppings", "toppings")
        .where("restaurantId = :restaurantId", {
          restaurantId: Number(restaurantId),
        })
        .getManyAndCount();
    }

    if (!restaurantId) {
      menus = await menuRepository
        .createQueryBuilder("menu")
        .leftJoinAndSelect("menu.restaurant", "restaurant")
        .leftJoinAndSelect("menu.category", "category")
        .leftJoinAndSelect("menu.toppings", "toppings")
        .where("categoryId = :categoryId", {
          categoryId: Number(categoryId),
        })
        .getManyAndCount();
    }

    if (restaurantId && categoryId) {
      menus = await menuRepository
        .createQueryBuilder("menu")
        .leftJoinAndSelect("menu.restaurant", "restaurant")
        .leftJoinAndSelect("menu.category", "category")
        .leftJoinAndSelect("menu.toppings", "toppings")
        .where("restaurantId = :restaurantId", {
          restaurantId: Number(restaurantId),
        })
        .andWhere("categoryId = :categoryId", {
          categoryId: Number(categoryId),
        })
        .getManyAndCount();
    }

    return res.status(200).json({ ok: true, menus: menus[0] });
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
    const { id, toppingId } = req.params;
    const menu = await menuRepository.findOne({
      where: {
        id,
      },
      relations: {
        toppings: true,
      },
    });

    const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);

    if (!menuTopping) {
      throw "El topping no se encuentra";
    }

    await menuRepository
      .createQueryBuilder("menu")
      .relation(Menu, "toppings")
      .of(menu)
      .remove(Number(toppingId));

    return res.json({ menu: menu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const addToppings = async (req: Request, res: Response): Promise<Response> => {
  const { toppingId } = req.params;

  try {
    const menu = await menuRepository.findOne({
      where: {
        id: req.params.id,
      },
      relations: {
        toppings: true,
      },
    });

    const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);

    if (menuTopping) {
      throw "El topping ya se encuentra";
    }

    await menuRepository
      .createQueryBuilder("menu")
      .relation(Menu, "toppings")
      .of(menu)
      .add(Number(toppingId));

    return res.json({ menu: menu });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const menu = await menuRepository.findOneBy({ id });

    idValidation(menu, "menu");

    await menuRepository.remove(menu);

    return res.status(200).json({
      ok: true,
      menu: { ...menu, id },
      msg: "menu eliminado",
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createMenu,
  readMenues,
  readMenuById,
  readMenuFilter,
  updateMenuById,
  deleteToppings,
  addToppings,
  deleteMenuById,
};
