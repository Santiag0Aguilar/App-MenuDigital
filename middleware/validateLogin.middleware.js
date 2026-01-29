// En los middelware nos encargamos de ver que la req sea valida para poder continuar unicamente NO LOGICA DE NEGOCIO y NO DB. SOLO  LO INDICADO
import { body, validationResult } from "express-validator";

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Email no válido")
    .notEmpty()
    .withMessage("Todos los campos son obligatorios"),

  body("password")
    .notEmpty()
    .withMessage("Todos los campos son obligatorios")
    .isLength({ min: 6 })
    .withMessage("Password mínimo 6 caracteres"),

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

export default validateLogin;
