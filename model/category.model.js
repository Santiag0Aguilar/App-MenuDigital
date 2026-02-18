import "dotenv/config";
import { prisma } from "./../lib/prisma.js";

export const categoryModel = {
  async findCategoriesWithProductsByUserPublic(userId) {
    return prisma.category.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        products: {
          where: {
            isActive: true,
            price: {
              not: null,
            },
          },
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  },

  findByUserAndName: ({ userId, name }) => {
    return prisma.category.findFirst({
      where: {
        userId,
        name,
        source: "INTERNAL",
      },
    });
  },

  create: (data) => {
    return prisma.category.create({ data });
  },
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  findById(id) {
    return prisma.category.findUnique({
      where: { id: Number(id) },
    });
  },

  update(id, data) {
    return prisma.category.update({
      where: { id: Number(id) },
      data,
    });
  },
};
