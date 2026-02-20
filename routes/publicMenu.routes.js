import { Router } from "express";
import {
  getAllBusinessRegister,
  getPublicMenuController,
} from "./../controller/publicMenu.controller.js";

const router = Router();

router.get("/public/menu/:slug", getPublicMenuController);
router.get("/public/menus", getAllBusinessRegister);
export default router;
