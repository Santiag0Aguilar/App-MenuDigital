import createMenuData from "../service/createMenuData.service.js";
import saveMenu from "../service/saveMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";

const registro = async (req, res) => {
  try {
    // 1. Crear usuario (tx corto)
    const user = await prisma.$transaction(async (tx) => {
      return await registerUser(req.body, tx);
    });

    // 2. Fetch externo
    const menuData = await createMenuData({
      ...req.body,
      id: user.id,
    });

    // 3. Guardar menú (tx nuevo)
    const menu = await prisma.$transaction(async (tx) => {
      return await saveMenu(menuData, user.id, tx);
    });

    res.status(201).json({ user, menu });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const porfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};

export default registro;
