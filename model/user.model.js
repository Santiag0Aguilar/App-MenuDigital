import "dotenv/config";
import { prisma } from "./../lib/prisma.js";

export const userModel = {
  findByEmail(email, tx) {
    if (!tx) throw new Error("TX is required in upsertCategory");

    return tx.user.findUnique({
      where: { email },
    });
  },

  create(data, tx) {
    if (!tx) throw new Error("TX is required in upsertCategory");

    return tx.user.create({
      data,
    });
  },

  findById(userId) {
    return prisma.user.findUnique({
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
