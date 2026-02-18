import { categoryModel } from "../model/category.model.js";

/* POST */
export const createCategory = async ({ userId, email, name, color }) => {
  console.log(userId);
  // Validaciones básicas
  if (!name || name.trim() === "") {
    throw new Error("El nombre de la categoría es obligatorio");
  }

  //  Verificar usuario
  const existingUser = await categoryModel.findByEmail(email);
  if (!existingUser) {
    throw new Error("Usuario no registrado");
  }

  if (existingUser.id !== userId) {
    throw new Error("No puedes crear categorías para otro usuario");
  }

  // Color por defecto
  const finalColor = color || "#333333";

  // no duplicar categorías internas
  const existingCategory = await categoryModel.findByUserAndName({
    userId,
    name,
  });

  if (existingCategory) {
    throw new Error("Ya existe una categoría con ese nombre");
  }

  // Crear categoría
  const newCategory = await categoryModel.create({
    userId,
    source: "INTERNAL",
    externalId: null,
    name: name.trim(),
    color: finalColor,
    isActive: true,
  });

  return newCategory;
};

/* GET */
export const getCategoriesByUser = async (userId) => {
  const categories =
    await categoryModel.findCategoriesWithProductsByUserPublic(userId);

  return categories;
};

/* PUT */

export const updateCategory = async ({
  userId,
  email,
  categoryId,
  name,
  color,
}) => {
  if (!name || name.trim() === "") {
    throw new Error("El nombre es obligatorio");
  }

  const existingUser = await categoryModel.findByEmail(email);
  if (!existingUser) throw new Error("Usuario no registrado");

  const category = await categoryModel.findById(categoryId);
  if (!category) throw new Error("Categoría no encontrada");

  if (category.userId !== userId) {
    throw new Error("No puedes modificar categorías de otro usuario");
  }

  // evitar duplicados
  const duplicated = await categoryModel.findByUserAndName({
    userId,
    name,
  });

  if (duplicated && duplicated.id !== category.id) {
    throw new Error("Ya existe una categoría con ese nombre");
  }

  return categoryModel.update(categoryId, {
    name: name.trim(),
    color: color || category.color,
  });
};

/* DELETE */
export const deleteCategory = async ({ userId, email, categoryId }) => {
  const existingUser = await categoryModel.findByEmail(email);
  if (!existingUser) throw new Error("Usuario no registrado");

  const category = await categoryModel.findById(categoryId);
  if (!category) throw new Error("Categoría no encontrada");

  if (category.userId !== userId) {
    throw new Error("No puedes eliminar categorías de otro usuario");
  }

  return categoryModel.update(categoryId, {
    isActive: false,
  });
};
