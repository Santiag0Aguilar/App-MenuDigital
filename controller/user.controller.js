import createMenuData from "../service/createMenuData.service.js";
import saveMenu from "../service/saveMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";

const registro = async (req, res) => {
  console.log("CT:", req.headers["content-type"]);
  console.log("BODY:", req.body);

  try {
    // 2. Fetch externo
    const menuData = await createMenuData(req.body);
    // 3. Guardar todo en DB
    const result = await prisma.$transaction(async (tx) => {
      const user = await registerUser(req.body, tx);
      return { user };
    });

    const menu = await saveMenu(menuData, result.user);

    res.status(201).json({ user: result.user, menu });
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
