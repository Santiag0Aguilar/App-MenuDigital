// model/product.model.js
import { prisma } from "../lib/prisma.js";

export const productModel = {
  // Busca todos los productos activos del usuario con su categoría
  findProductsByUser(userId) {
    return prisma.product.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  },

  findById(id) {
    return prisma.product.findUnique({
      where: { id: Number(id) },
    });
  },

  // Evitar duplicados internos por nombre dentro del mismo usuario
  findByUserAndName({ userId, name }) {
    return prisma.product.findFirst({
      where: {
        userId,
        name,
        source: "INTERNAL",
      },
    });
  },

  // Verifica que la categoría exista, esté activa y pertenezca al usuario
  findCategoryByIdAndUser({ categoryId, userId }) {
    return prisma.category.findFirst({
      where: {
        id: Number(categoryId),
        userId,
        isActive: true,
      },
    });
  },

  findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create(data) {
    return prisma.product.create({ data });
  },

  update(id, data) {
    return prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  },
};
