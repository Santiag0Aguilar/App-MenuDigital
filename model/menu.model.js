import "dotenv/config";
import { prisma } from "./../lib/prisma.js";

export const menuModel = {
  async upsertCategory(data) {
    return prisma.category.upsert({
      where: {
        userId_externalId: {
          userId: data.userId,
          externalId: data.externalId,
        },
      },
      update: {
        name: data.name,
        color: data.color,
        isActive: data.isActive,
        updatedAt: new Date(),
      },
      create: data,
    });
  },

  async upsertProduct(data) {
    return prisma.product.upsert({
      where: {
        userId_externalId: {
          userId: data.userId,
          externalId: data.externalId,
        },
      },
      update: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        handle: data.handle,
        categoryId: data.categoryId,
        isActive: data.isActive,
        updatedAt: new Date(),
      },
      create: data,
    });
  },
  async findCategoriesWithProductsByUser(userId) {
    return prisma.category.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        products: {
          where: {
            isActive: true,
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
