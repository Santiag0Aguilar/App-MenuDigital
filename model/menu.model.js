import "dotenv/config";
import { prisma } from "./../lib/prisma.js";
import { Prisma } from "@prisma/client"; // 🟢 NUEVO

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

  // 🟢 NUEVO — UPSERT MASIVO DE CATEGORÍAS
  async bulkUpsertCategories(categories) {
    return prisma.$transaction(async (tx) => {
      // 1️⃣ Insertar nuevas
      await tx.category.createMany({
        data: categories,
        skipDuplicates: true,
      });

      const values = Prisma.join(
        categories.map(
          (c) =>
            Prisma.sql`(
      ${c.userId},
      ${c.externalId},
      ${c.name},
      ${c.color},
      ${c.isActive},
      NOW(),
      NOW()
    )`,
        ),
      );

      await tx.$executeRaw`
  INSERT INTO "Category"
  ("userId","externalId","name","color","isActive","createdAt","updatedAt")
  VALUES ${values}
  ON CONFLICT ("userId","externalId")
  DO UPDATE SET
    name = EXCLUDED.name,
    color = EXCLUDED.color,
    "isActive" = EXCLUDED."isActive",
    "updatedAt" = NOW();
`;

      // 3️⃣ Traer el mapa real de ids
      const saved = await tx.category.findMany({
        where: { userId: categories[0].userId },
        select: { id: true, externalId: true },
      });

      const map = {};
      for (const c of saved) {
        map[c.externalId] = c.id;
      }

      return map;
    });
  },

  // 🟢 NUEVO — UPSERT MASIVO DE PRODUCTOS
  async bulkUpsertProducts(products) {
    if (!products.length) return;

    await prisma.$transaction(async (tx) => {
      await tx.product.createMany({
        data: products,
        skipDuplicates: true,
      });

      const values = Prisma.join(
        products.map(
          (p) =>
            Prisma.sql`(
      ${p.userId},
      ${p.externalId},
      ${p.name},
      ${p.description},
      ${p.imageUrl},
      ${p.handle},
      ${p.price},
      ${p.categoryId},
      ${p.isActive},
      NOW(),
      NOW()
    )`,
        ),
      );

      await tx.$executeRaw`
  INSERT INTO "Product"
  ("userId","externalId","name","description","imageUrl","handle","price","categoryId","isActive","createdAt","updatedAt")
  VALUES ${values}
  ON CONFLICT ("userId","externalId")
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    "imageUrl" = EXCLUDED."imageUrl",
    handle = EXCLUDED.handle,
    price = EXCLUDED.price,
    "categoryId" = EXCLUDED."categoryId",
    "isActive" = EXCLUDED."isActive",
    "updatedAt" = NOW();
`;
    });
  },
};
