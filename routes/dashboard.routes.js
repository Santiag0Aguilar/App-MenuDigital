import { Router } from "express";
import authMiddelware from "./../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";

const router = Router();

router.get("/", authMiddelware, me);

export default router;
