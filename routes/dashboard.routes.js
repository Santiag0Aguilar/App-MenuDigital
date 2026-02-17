import { Router } from "express";
import authMiddelware from "./../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";

const router = Router();

router.get("/", authMiddelware, me);

/* productos*/
router.get("/products", authMiddelware);
router.post("/products", authMiddelware);
router.put("/products/:id", authMiddelware);
router.delete("/products/:id", authMiddelware);

/* categorias */
router.get("/categories", authMiddelware);
router.post("/categories", authMiddelware);
router.put("/categories/:id", authMiddelware);
router.delete("/categories/:id", authMiddelware);

export default router;
