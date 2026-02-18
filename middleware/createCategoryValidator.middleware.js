import { body } from "express-validator";
import { validateFiles } from "./validateFiles.js";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser string")
    .isLength({ min: 1, max: 50 }),

  body("color").optional().isString().isLength({ max: 20 }),

  body("isActive").optional().isBoolean(),

  validateFiles,
];
