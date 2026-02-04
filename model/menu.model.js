import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const menuModel = {
  async upsertCategory(data, tx = prisma) {
    try {
      return await tx.category.upsert({
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
    } catch (error) {
      console.error("PRISMA CATEGORY ERROR:", error);
      throw error;
    }
  },

  async upsertProduct(data, tx = prisma) {
    try {
      return await tx.product.upsert({
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
    } catch (error) {
      console.error("PRISMA PRODUCT ERROR:", error);
      throw error;
    }
  },
};
