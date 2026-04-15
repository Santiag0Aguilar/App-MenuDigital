// src/config/prisma.js
const { PrismaClient } = require("@prisma/client");
const logger = require("../shared/utils/logger");

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["warn", "error"],
});

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  logger.info("Prisma desconectado.");
});

module.exports = prisma;
