import "dotenv/config";
import { prisma } from "./../lib/prisma.js";

export const userModel = {
  findByEmail(email, tx) {
    if (!tx) throw new Error("TX is required in findByEmail");

    return tx.user.findUnique({
      where: { email },
    });
  },
  findByPhone(phone, tx) {
    if (!tx) throw new Error("TX is required in findByPhone");

    return tx.user.findUnique({
      where: { phone },
    });
  },

  create(data, tx) {
    if (!tx) throw new Error("TX is required in create");

    return tx.user.create({
      data,
    });
  },

  findBySlug: (slug) => {
    return prisma.user.findUnique({
      where: { slug },
    });
  },
  async getAllBusinessRegister() {
    const [slugs, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          slug: true,
        },
      }),
      prisma.user.count(),
    ]);

    return {
      total,
      slugs,
    };
  },
  findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        businessName: true,
        templateType: true,
        primaryColor: true,
        role: true,
        slug: true,
        phone: true,
      },
    });
  },

  updateUser({ userId, primaryColor, templateType }) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        primaryColor,
        templateType,
      },
    });
  },
};
