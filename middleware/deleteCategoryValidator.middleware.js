import { param } from "express-validator";
import { validateFiles } from "./validateFiles.js";

export const deleteCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("El id de la categoría es obligatorio")
    .isInt()
    .withMessage("El id debe ser un número entero"),

  validateFiles,
];
