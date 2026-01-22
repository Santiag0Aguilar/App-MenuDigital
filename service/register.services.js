// service/registro.service.js
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import registerUser from "./auth.service.js";
import createMenu from "./createMenu.services.js";

const registroTransaccional = async (body) => {
  return prisma.$transaction(async (tx) => {
    const user = await registerUser(body, tx);

    const menu = await createMenu(body.loyverseKey, user, tx);

    return { user, menu };
  });
};

export default registroTransaccional;
