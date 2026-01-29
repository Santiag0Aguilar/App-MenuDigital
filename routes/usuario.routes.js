import { Router } from "express";

import { porfile } from "../controller/user.controller.js";
import authMiddelware from "../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";

const router = Router();

router.get("/porfile", authMiddelware, porfile);
router.get("/me", authMiddelware, me);

export default router;
