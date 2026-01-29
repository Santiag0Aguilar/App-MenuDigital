// repositories/user.repository.js
import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const userModel = {
  findByEmail(email, tx = prisma) {
    return tx.user.findUnique({
      where: { email },
    });
  },

  create(data, tx = prisma) {
    return tx.user.create({
      data,
    });
  },

  findById(userId, tx = prisma) {
    return tx.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });
  },

  updateUser(data) {
    return prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        primaryColor: data.primaryColor,
        templateType: data.templateType,
      },
    });
  },
};
