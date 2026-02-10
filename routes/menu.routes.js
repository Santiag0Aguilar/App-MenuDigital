import { Router } from "express";

import MenuValidateMiddleware from "../middleware/updateMenu.middleware.js";
import MenuUpdateController from "../controller/updateMenu.controller.js";
import authMiddelware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddelware);
router.post("/update", MenuValidateMiddleware, MenuUpdateController);
export default router;
