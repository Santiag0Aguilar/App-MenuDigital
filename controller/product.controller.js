// controller/product.controller.js
import * as productService from "../service/product.service.js";

/* GET */
export const getProducts = async (req, res) => {
  try {
    const { id } = req.user;
    const products = await productService.getProductsByUser(id);
    return res.status(200).json({ ok: true, data: products });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/* POST */
export const createProduct = async (req, res) => {
  try {
    const { id, email } = req.user;
    const { name, categoryId, description, imageUrl, price } = req.body;

    const product = await productService.createProduct({
      userId: id,
      email,
      name,
      categoryId,
      description,
      imageUrl,
      price,
    });

    return res.status(201).json({ ok: true, data: product });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/* PUT */
export const updateProduct = async (req, res) => {
  try {
    const { id: userId, email } = req.user;
    const { id: productId } = req.params;
    const { name, categoryId, description, imageUrl, price } = req.body;

    const product = await productService.updateProduct({
      userId,
      email,
      productId,
      name,
      categoryId,
      description,
      imageUrl,
      price,
    });

    return res.status(200).json({ ok: true, data: product });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

/* DELETE */
export const deleteProduct = async (req, res) => {
  try {
    const { id: userId, email } = req.user;
    const { id: productId } = req.params;

    await productService.deleteProduct({ userId, email, productId });

    return res
      .status(200)
      .json({ ok: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
