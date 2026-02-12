// prisma/analytics.model.js
import { prisma } from "./../lib/prisma.js";

// guardar evento
export const createEvent = (data) => {
  return prisma.analyticsEvent.create({ data });
};

// -------- BUSINESS --------

export const countMenuViews = (businessId) => {
  return prisma.analyticsEvent.count({
    where: {
      businessId,
      type: "view_menu",
    },
  });
};

export const countWeeklyViews = (businessId) => {
  const from = new Date();
  from.setDate(from.getDate() - 7);

  return prisma.analyticsEvent.count({
    where: {
      businessId,
      type: "view_menu",
      createdAt: { gte: from },
    },
  });
};

export const countMonthlyViews = (businessId) => {
  const from = new Date();
  from.setMonth(from.getMonth() - 1);

  return prisma.analyticsEvent.count({
    where: {
      businessId,
      type: "view_menu",
      createdAt: { gte: from },
    },
  });
};

export const getTopViewedProducts = (businessId) => {
  return prisma.analyticsEvent.groupBy({
    by: ["productId"],
    where: {
      businessId,
      type: "view_product",
      productId: { not: null },
    },
    _count: { productId: true },
    orderBy: {
      _count: { productId: "desc" },
    },
    take: 10,
  });
};

export const getTopAddToCartProducts = (businessId) => {
  return prisma.analyticsEvent.groupBy({
    by: ["productId"],
    where: {
      businessId,
      type: "add_to_cart",
      productId: { not: null },
    },
    _count: { productId: true },
    orderBy: {
      _count: { productId: "desc" },
    },
    take: 10,
  });
};

// -------- ADMIN --------

export const countTotalEvents = () => {
  return prisma.analyticsEvent.count();
};

export const countTotalBusinesses = () => {
  return prisma.user.count({
    where: { role: "BUSINESS" },
  });
};

export const getTopBusinesses = () => {
  return prisma.analyticsEvent.groupBy({
    by: ["businessId"],
    _count: { businessId: true },
    orderBy: {
      _count: { businessId: "desc" },
    },
    take: 10,
  });
};

export const countEventsToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.analyticsEvent.count({
    where: {
      createdAt: { gte: today },
    },
  });
};
