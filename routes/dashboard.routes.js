import { Router } from "express";
import authMiddelware from "./../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";

const router = Router();

router.get("/", authMiddelware, me);

/* productos*/
router.get("/products");
router.post("/products");
router.put("/products/:id");
router.delete("/products/:id");

/* categorias */
router.get("/categories");
router.post("/categories");
router.put("/categories/:id");
router.delete("/categories/:id");

export default router;
