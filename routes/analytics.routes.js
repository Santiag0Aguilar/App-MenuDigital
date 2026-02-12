// routes/analytics.routes.js
import express from "express";
import {
  trackEvent,
  getBusinessStats,
  getAdminGlobalStats,
} from "./../controller/analytics.controller.js";
import authMiddelware from "./../middleware/auth.middleware.js";

const router = express.Router();

// público (menú)
router.post("/event", trackEvent);

// business dashboard
router.get("/business", authMiddelware, getBusinessStats);

// admin dashboard
router.get("/admin", authMiddelware, getAdminGlobalStats);

export default router;
