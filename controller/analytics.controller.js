// controllers/analytics.controller.js
import * as analyticsService from "./../service/analytics.service.js";

export const trackEvent = async (req, res) => {
  console.log(req.body);
  try {
    const event = await analyticsService.trackEvent(req);
    res.json({ ok: true, event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBusinessStats = async (req, res) => {
  try {
    const stats = await analyticsService.getBusinessStats(req.user.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminGlobalStats = async (req, res) => {
  try {
    const stats = await analyticsService.getAdminGlobalStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
