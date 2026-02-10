import { body, validationResult } from "express-validator";

const validateRegister = [
  body("email").isEmail().withMessage("Email no válido"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("Password mínimo 6 caracteres"),
  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del negocio es obligatorio"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+\d{10,15}$/)
    .withMessage(
      "El teléfono debe estar en formato internacional. Ej: +5215512345678",
    ),
  body("primaryColor")
    .trim()
    .notEmpty()
    .withMessage("El color principal es obligatorio"),
  body("loyverseKey")
    .trim()
    .notEmpty()
    .withMessage("Se requiere la llave de loyverse"),

  body("rol").isIn(["ADMIN", "BUSINESS"]).withMessage("Rol no válido"),
  body("templateType")
    .isIn(["TEMPLATE_1", "TEMPLATE_2"])
    .withMessage("Template no válido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        route: "desde middelware",
      });
    }
    next();
  },
];

export default validateRegister;
