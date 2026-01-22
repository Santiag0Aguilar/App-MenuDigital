import { Router } from "express";
import validateUser from "./../middleware/validateuser.js";
import registro, { porfile } from "./../controller/user.controller.js";
import validateLogin from "./../middleware/validateLogin.js";
import logear from "./../controller/login.controller.js";
import authMiddelware from "./../middleware/auth.js";
import { me } from "../controller/auth.controller.js";

const router = Router();

/* endpoints de login */
router.get("/login", (req, res) => {
  res.send("form login");
});

router.post("/login", validateLogin, logear);

/* endpoints de register */
router.get("/register", (req, res) => {
  res.send("form register");
});

router.post("/register", validateUser, registro);

/* endpoints de info rapida del token del usuario 
  Preguntas calve

  Quien eres?
  Tu token es valido?

*/
router.get("/porfile", authMiddelware, porfile);

// endpoint del estado del usuario
router.get("/me", authMiddelware, me);

export default router;
