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
};
