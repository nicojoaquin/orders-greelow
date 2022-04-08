import { Request, Response } from "express";
import { Restaurant } from "../Entities";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const restaurantRepository = dbConfig.getRepository(Restaurant);

const createRestaurant = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newData: Restaurant = req.body;

    const newRestaurant = await restaurantRepository.save(newData);

    return res.status(200).json({
      ok: true,
      restaurant: newRestaurant,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readRestaurants = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const restaurants = await restaurantRepository.find();

    return res.status(200).json({ ok: true, restaurants });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readRestaurantById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const restaurant = await restaurantRepository.findOneBy({ id });

    idValidation(restaurant, "restaurant");

    return res.status(200).json({ ok: true, restaurant });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateRestaurantById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newData: Object = req.body;

  try {
    const restaurant = await restaurantRepository.findOneBy({ id });

    idValidation(restaurant, "restaurant");

    await restaurantRepository.update(id, newData);

    return res.status(200).json({
      ok: true,
      restaurant: { ...newData, id },
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteRestaurantById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const restaurant = await restaurantRepository.findOneBy({ id });

    idValidation(restaurant, "restaurant");

    await restaurantRepository.remove(restaurant).catch(() => {
      throw "No se puede eliminar el restaurant, esta asociado a un menu";
    });

    return res.status(200).json({
      ok: true,
      restaurant: { ...restaurant, id },
      msg: "Restaurant eliminado",
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createRestaurant,
  readRestaurants,
  readRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
};
