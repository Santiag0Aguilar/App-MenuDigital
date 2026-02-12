// services/analytics.service.js
import * as analyticsModel from "./../model/analytics.model.js";

export const trackEvent = async (req) => {
  const { type, businessId, menuSlug, productId, externalProductId, price } =
    req.body;

  return analyticsModel.createEvent({
    type,
    businessId,
    menuSlug,
    productId,
    externalProductId,
    price,
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
