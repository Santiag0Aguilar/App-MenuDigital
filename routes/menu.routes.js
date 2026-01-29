import { Router } from "express";

import MenuValidateMiddleware from "../middleware/updateMenu.middleware.js";
import MenuUpdateController from "../controller/updateMenu.controller.js";

const router = Router();

router.post("/update", MenuValidateMiddleware, MenuUpdateController);

export default router;
