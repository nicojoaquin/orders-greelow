import { Request, Response } from "express";
import { Category } from "../Entities/";
import { dbConfig } from "../config/db";
import { idValidation } from "../helpers/idValidation";

const categoryRepository = dbConfig.getRepository(Category);

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCategory = await categoryRepository.save(req.body);

    return res.status(200).json({
      ok: true,
      category: newCategory,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await categoryRepository.find();

    return res.status(200).json({ ok: true, categories });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const category = await categoryRepository.findOneBy({ id });

    idValidation(category, "category");

    return res.status(200).json({ ok: true, category });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const updateCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newData: Object = req.body;

  try {
    const category = await categoryRepository.findOneBy({ id });

    idValidation(category, "category");

    await categoryRepository.update(id, newData);

    return res.status(200).json({
      ok: true,
      category: { ...newData, id },
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const category = await categoryRepository.findOneBy({ id });

    idValidation(category, "category");

    await categoryRepository.remove(category).catch(() => {
      throw "No se puede eliminar la categor??a, esta asociada a un menu";
    });

    return res.status(200).json({
      ok: true,
      category: { ...category, id },
      msg: "Categor??a eliminada",
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export {
  createCategory,
  readCategories,
  readCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
