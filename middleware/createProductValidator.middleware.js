import { body, param } from "express-validator";
import { validateFiles } from "./validateFiles.js";

// validators/product.validator.js

export const createProductValidator = [
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("categoryId")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isInt({ min: 1 })
    .withMessage("categoryId debe ser un entero válido"),
  body("price")
    .notEmpty()
    .withMessage("EL precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString(),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("imageUrl debe ser una URL válida"),
  validateFiles,
];

export const updateProductValidator = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("categoryId debe ser un entero válido"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString(),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("imageUrl debe ser una URL válida"),
  validateFiles,
];

export const deleteProductValidator = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
  validateFiles,
];
