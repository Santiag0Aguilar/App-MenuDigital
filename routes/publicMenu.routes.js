import { Router } from "express";
import { getPublicMenuController } from "./../controller/publicMenu.controller.js";

const router = Router();

router.get("/public/menu/:slug", getPublicMenuController);

export default router;
