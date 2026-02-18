// service/product.service.js
import { productModel } from "../model/product.model.js";

/* GET */
export const getProductsByUser = async (userId) => {
  return productModel.findProductsByUser(userId);
};

/* POST */
export const createProduct = async ({
  userId,
  email,
  name,
  categoryId,
  description,
  imageUrl,
  price,
}) => {
  // Verificar usuario
  const existingUser = await productModel.findUserByEmail(email);
  if (!existingUser) throw new Error("Usuario no registrado");
  if (existingUser.id !== userId)
    throw new Error("No puedes crear productos para otro usuario");

  // Verificar que la categoría exista, esté activa y sea del usuario
  const category = await productModel.findCategoryByIdAndUser({
    categoryId,
    userId,
  });
  if (!category)
    throw new Error("Categoría no encontrada o no pertenece al usuario");

  // Evitar duplicados por nombre en productos internos
  const duplicated = await productModel.findByUserAndName({
    userId,
    name: name.trim(),
  });
  if (duplicated) throw new Error("Ya existe un producto con ese nombre");

  return productModel.create({
    userId,
    categoryId: Number(categoryId),
    source: "INTERNAL",
    externalId: null,
    name: name.trim(),
    description: description || null,
    imageUrl: imageUrl || null,
    price: price !== undefined && price !== null ? parseFloat(price) : null,
    isActive: true,
  });
};

/* PUT */
export const updateProduct = async ({
  userId,
  email,
  productId,
  name,
  categoryId,
  description,
  imageUrl,
  price,
}) => {
  const existingUser = await productModel.findUserByEmail(email);
  if (!existingUser) throw new Error("Usuario no registrado");

  const product = await productModel.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.userId !== userId)
    throw new Error("No puedes modificar productos de otro usuario");

  // Si se cambia la categoría, verificar que sea válida y del usuario
  const targetCategoryId = categoryId ? Number(categoryId) : product.categoryId;
  const category = await productModel.findCategoryByIdAndUser({
    categoryId: targetCategoryId,
    userId,
  });
  if (!category)
    throw new Error("Categoría no encontrada o no pertenece al usuario");

  // Evitar duplicados de nombre (ignorando el producto actual)
  const duplicated = await productModel.findByUserAndName({
    userId,
    name: name.trim(),
  });
  if (duplicated && duplicated.id !== product.id) {
    throw new Error("Ya existe un producto con ese nombre");
  }

  return productModel.update(productId, {
    name: name.trim(),
    categoryId: targetCategoryId,
    description: description ?? product.description,
    imageUrl: imageUrl ?? product.imageUrl,
    price:
      price !== undefined && price !== null ? parseFloat(price) : product.price,
  });
};

/* DELETE (soft delete) */
export const deleteProduct = async ({ userId, email, productId }) => {
  const existingUser = await productModel.findUserByEmail(email);
  if (!existingUser) throw new Error("Usuario no registrado");

  const product = await productModel.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.userId !== userId)
    throw new Error("No puedes eliminar productos de otro usuario");

  return productModel.update(productId, { isActive: false });
};
