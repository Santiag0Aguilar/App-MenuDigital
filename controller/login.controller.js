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
    let menu = null;

    if (auth.user.loyverseKeyEncrypt) {
      // 2. Fetch externo (fuera de tx)
      const menuData = await createMenu(auth.user);

      // 3. Guardar menu (otro tx)
      menu = await saveMenu(menuData, auth.user);
    }

    res.status(201).json({
      accessToken: auth.token,
      menu,
    });
  } catch (error) {
    res.status(400).json({ a: "a", error: error.message });
  }
};

export default logear;
