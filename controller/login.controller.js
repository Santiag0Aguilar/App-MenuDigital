import logearUsuario from "./../service/login.service.js";
import createMenu from "../service/createMenuData.service.js";
import { prisma } from "./../lib/prisma.js";
import saveMenu from "../service/saveMenu.service.js";

const logear = async (req, res) => {
  console.log("BODY:", req.body);

  /* AQUI HAY UN PROBLEMA, primero debemos retornar el id del usuario sino createMenu no sabe que hacer ya que necesita lo siguiente 
    loyverseEncryptado 
    Id usuario

    CREATE MENU NO NECESITA EL ID DEL USUARIO PEROOOOOOOOOO AQUI NO TIENE UN HASH, ESTE BLOQUE DESCONOCE COMO TRAER EL LOYVERSE KEY, EL SOLO LO MANEJA EL COMO LLLEGUE O NO NO ES SU PROBLEmA
  
  */
  const menuData = await createMenu(req.body);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const auth = await logearUsuario(req.body, tx);
      const menu = await saveMenu(menuData, auth.user.id, tx);

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
