import { body } from "express-validator";
import { validateFields } from "./validateFiles.js";

export const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .isLength({ min: 1, max: 100 }),

  body("categoryId").notEmpty().isInt().withMessage("Seleccione una categoria"),

  body("description").optional().isString().isLength({ max: 500 }),

  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("imageUrl debe ser una URL válida"),

  body("price").optional().isFloat({ min: 0 }),

  body("isActive").optional().isBoolean(),

  validateFields,
];
