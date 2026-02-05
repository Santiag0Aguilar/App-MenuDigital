import logearUsuario from "./../service/login.service.js";
import createMenu from "./../service/createMenu.service.js";
import { prisma } from "./../lib/prisma.js";

const logear = async (req, res) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const auth = await logearUsuario(req.body, tx);

      const menu = await createMenu(auth.user, tx);

      return { auth, menu };
    });

    res.status(201).json({
      accessToken: result.auth.token,
      menu: result.menu,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default logear;
