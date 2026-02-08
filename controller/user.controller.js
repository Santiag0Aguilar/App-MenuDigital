import createMenuData from "../service/createMenuData.service.js";
import saveMenu from "../service/saveMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";

const registro = async (req, res) => {
  try {
    // 2. Fetch externo (SIN transacción)
    const menuData = await createMenuData(req.body);
    console.log(menuData);
    // 3. Guardar todo en DB (CON transacción)
    const result = await prisma.$transaction(async (tx) => {
      const user = await registerUser(req.body, tx);
      console.log({ user });
      const menu = await saveMenu(menuData, user, tx);
      return { user, menu };
    });

    res.status(201).json({ user: result.user, menu: result.menu });
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
