import { param, body } from "express-validator";
import { validateFiles } from "./validateFiles.js";

export const updateCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("El id de la categoría es obligatorio")
    .isInt()
    .withMessage("El id debe ser un número entero"),

  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser string")
    .isLength({ min: 1, max: 50 })
    .withMessage("El nombre debe tener entre 1 y 50 caracteres"),

  body("color")
    .optional()
    .isString()
    .withMessage("El color debe ser string")
    .isLength({ max: 20 })
    .withMessage("El color es demasiado largo"),

  validateFiles,
];
