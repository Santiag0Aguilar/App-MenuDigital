import logearUsuario from "./../service/login.service.js";
import createMenu from "../service/createMenuData.service.js";
import { prisma } from "./../lib/prisma.js";
import saveMenu from "../service/saveMenu.service.js";

const logear = async (req, res) => {
  try {
    // 1. Primero auth (tx corto y puro)
    const auth = await prisma.$transaction(async (tx) => {
      return await logearUsuario(req.body, tx);
    });

    // 2. Fetch externo (fuera de tx)
    const menuData = await createMenu(auth.user);

    // 3. Guardar menu (otro tx)
    const menu = await prisma.$transaction(async (tx) => {
      return await saveMenu(menuData, auth.user, tx);
    });

    res.status(201).json({
      accessToken: auth.token,
      menu,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default logear;
