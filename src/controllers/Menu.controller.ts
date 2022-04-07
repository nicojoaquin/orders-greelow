import { Request, Response } from "express";
import { Menu, Topping } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const menuRepository = dbConfig.getRepository(Menu);

const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newData: Menu = req.body;

    const newMenu = await menuRepository.save(newData);

    return res
      .status(200)
      .json({ ok: true, menu: newMenu, token: res.locals.user.newToken });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menus = await menuRepository.find({
      relations: {
        toppings: true,
        restaurant: true,
        category: true,
      },
    });

    return res
      .status(200)
      .json({ ok: true, menus, token: res.locals.user.newToken });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenuById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const menu = await menuRepository.findOne({
      where: {
        id,
      },
      relations: {
        toppings: true,
        restaurant: true,
        category: true,
      },
    });

    idValidation(menu, "menu");

    return res
      .status(200)
      .json({ ok: true, menu, token: res.locals.user.newToken });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readMenusFilter = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { restaurantId, categoryId } = req.query;

  try {
    let menus;

    if (!restaurantId || categoryId)
      throw "No se envio ningun parametro de búsqueda";

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

    return res
      .status(200)
      .json({ ok: true, menus: menus[0], token: res.locals.user.newToken });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newData: Menu = req.body;

  try {
    const menu = await menuRepository.findOneBy({ id });

    idValidation(menu, "menu");

    await menuRepository.update(id, newData);

    return res.status(200).json({
      ok: true,
      menu: { ...newData, id },
      token: res.locals.user.newToken,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteToppings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, toppingId } = req.params;

  try {
    const menu = await menuRepository.findOne({
      where: {
        id,
      },
      relations: {
        toppings: true,
      },
    });

    idValidation(menu, "menu");

    //Validamos que el topping que queremos eliminar exista en el menu
    const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);

    idValidation(menuTopping, "topping");

    //Eliminamos el topping del menu seleccionado
    await menuRepository
      .createQueryBuilder("menu")
      .select("*")
      .where(id)
      .relation(Menu, "toppings")
      .of(menu.id)
      .remove(Number(toppingId));

    return res.json({ ok: true, menu, token: res.locals.user.newToken });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const addToppings = async (req: Request, res: Response): Promise<Response> => {
  const { id, toppingId } = req.params;

  try {
    const menu = await menuRepository.findOne({
      where: {
        id,
      },
      relations: {
        toppings: true,
      },
    });

    idValidation(menu, "menu");

    //Verificamos que el topping sea existente en la base de datos
    const topping = await dbConfig
      .getRepository(Topping)
      .findOneBy({ id: toppingId });

    idValidation(topping, "topping");

    const menuTopping = menu.toppings.find((mt) => mt.id == toppingId);

    //Verificamos que el topping que se quiera agregar no exista en el menu
    if (menuTopping) throw "El topping ya se encuentra";

    await menuRepository
      .createQueryBuilder("menu")
      .relation(Menu, "toppings")
      .of(menu.id)
      .add(Number(toppingId));

    console.log(menu);

    return res.json({ ok: true, menu, token: res.locals.user.newToken });
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
      token: res.locals.user.newToken,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createMenu,
  readMenus,
  readMenuById,
  readMenusFilter,
  updateMenuById,
  deleteToppings,
  addToppings,
  deleteMenuById,
};
