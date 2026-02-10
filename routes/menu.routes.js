import { Router } from "express";

import MenuValidateMiddleware from "./../middleware/updateMenu.middleware.js";
import MenuUpdateController from "./../controller/updateMenu.controller.js";
import authMiddelware from "./../middleware/auth.middleware.js";
import getMenuByUser from "./../controller/getMenu.controller.js";

const router = Router();

router.get("/", authMiddelware, getMenuByUser);
router.post("/update", MenuValidateMiddleware, MenuUpdateController);
export default router;
