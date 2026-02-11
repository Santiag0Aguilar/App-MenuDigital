import { body, validationResult } from "express-validator";

const MenuValidateMiddleware = [
  body("primaryColor")
    .trim()
    .notEmpty()
    .withMessage("El color principal es obligatorio"),
  body("templateType")
    .isIn(["TEMPLATE_1", "TEMPLATE_2"])
    .withMessage("Template no válido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

export default MenuValidateMiddleware;
