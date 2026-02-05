import "dotenv/config";
import { prisma } from "./../lib/prisma.js";

export const menuModel = {
  async upsertCategory(data, tx) {
    if (!tx) throw new Error("TX is required in upsertCategory");

    return tx.category.upsert({
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

  async upsertProduct(data, tx) {
    if (!tx) throw new Error("TX is required in upsertProduct");

    return tx.product.upsert({
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
};
