import * as categoryService from "../service/Category.service.js";

/* POST */
export const createCategory = async (req, res) => {
  try {
    const { id, email } = req.user;
    const { name, color } = req.body;
    const category = await categoryService.createCategory({
      userId: id,
      email,
      name,
      color,
    });
    return res.status(201).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

/* GET */
export const getCategories = async (req, res) => {
  try {
    const { id } = req.user;

    const categories = await categoryService.getCategoriesByUser(id);

    return res.status(200).json({
      ok: true,
      data: categories,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

/* PUT */
export const updateCategory = async (req, res) => {
  try {
    const { id: userId, email } = req.user;
    const { id: categoryId } = req.params;
    const { name, color } = req.body;

    const category = await categoryService.updateCategory({
      userId,
      email,
      categoryId,
      name,
      color,
    });

    return res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

/* DELETE */

export const deleteCategory = async (req, res) => {
  try {
    const { id: userId, email } = req.user;
    const { id: categoryId } = req.params;

    await categoryService.deleteCategory({
      userId,
      email,
      categoryId,
    });

    return res.status(200).json({
      ok: true,
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};
