import * as analyticsModel from "./../model/analytics.model.js";
import { userModel } from "./../model/user.model.js";

export const trackEvent = async (req) => {
  const { type, menuSlug, productId, externalProductId, price } = req.body;

  // 1. Resolver negocio por slug
  const business = await userModel.findBySlug(menuSlug);

  if (!business) {
    throw new Error("Business not found");
  }

  // 2. Crear evento usando MODEL (no prisma directo)
  return analyticsModel.createEvent({
    type,
    menuSlug,
    productId,
    externalProductId,
    price,
    businessId: business.id,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });
};

// dashboard business
export const getBusinessStats = async (businessId) => {
  const [totalViews, weeklyViews, monthlyViews, topProducts, topAddToCart] =
    await Promise.all([
      analyticsModel.countMenuViews(businessId),
      analyticsModel.countWeeklyViews(businessId),
      analyticsModel.countMonthlyViews(businessId),
      analyticsModel.getTopViewedProducts(businessId),
      analyticsModel.getTopAddToCartProducts(businessId),
    ]);

  return {
    totalViews,
    weeklyViews,
    monthlyViews,
    topProducts,
    topAddToCart,
  };
};

// dashboard admin
export const getAdminGlobalStats = async () => {
  const [totalEvents, totalBusinesses, topBusinesses, eventsToday] =
    await Promise.all([
      analyticsModel.countTotalEvents(),
      analyticsModel.countTotalBusinesses(),
      analyticsModel.getTopBusinesses(),
      analyticsModel.countEventsToday(),
    ]);

  return {
    totalEvents,
    totalBusinesses,
    topBusinesses,
    eventsToday,
  };
};
