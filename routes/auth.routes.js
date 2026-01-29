import { Router } from "express";

import validateUser from "../middleware/validateuser.middleware.js";
import validateLogin from "../middleware/validateLogin.middleware.js";
import logear from "../controller/login.controller.js";
import registro from "../controller/user.controller.js";

const router = Router();

router.get("/login", (req, res) => {
  res.send("form login");
});
router.post("/login", validateLogin, logear);

router.get("/register", (req, res) => {
  res.send("form register");
});
router.post("/register", validateUser, registro);

export default router;
