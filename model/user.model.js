// repositories/user.repository.js
import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const userModel = {
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create(data) {
    return prisma.user.create({
      data,
    });
  },

  findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  },
};
