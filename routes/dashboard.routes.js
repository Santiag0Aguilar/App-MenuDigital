import { Router } from "express";
import authMiddelware from "./../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";
import { createCategoryValidator } from "./../middleware/createCategoryValidator.middleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./../controller/category.controller.js";
import { updateCategoryValidator } from "../middleware/updateCategoryValidator.middleware.js";
import { deleteCategoryValidator } from "../middleware/deleteCategoryValidator.middleware.js";
import {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../middleware/createProductValidator.middleware.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", authMiddelware, me);

/* productos*/
router.get("/products", authMiddelware);
router.post("/products", authMiddelware, createProductValidator, createProduct);
router.put(
  "/products/:id",
  authMiddelware,
  updateProductValidator,
  updateProduct,
);
router.delete(
  "/products/:id",
  authMiddelware,
  deleteProductValidator,
  deleteProduct,
);

/* categorias */
router.get("/categories", authMiddelware, getCategories);
router.post(
  "/categories",
  authMiddelware,
  createCategoryValidator,
  createCategory,
);
router.put(
  "/categories/:id",
  authMiddelware,
  updateCategoryValidator,
  updateCategory,
);
router.delete(
  "/categories/:id",
  authMiddelware,
  deleteCategoryValidator,
  deleteCategory,
);

export default router;
