import createMenuData from "../service/createMenuData.service.js";
import saveMenu from "../service/saveMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";
import fetchAll from "../utils/fetchAll.js";
import { decrypt } from "../utils/crypto.js";

const registro = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const user = await registerUser(req.body, prisma);

    const URL_BASE = "https://api.loyverse.com/v1.0";
    const key = decrypt(user.loyverseKeyHash);

    const categories = await fetchAll(
      `${URL_BASE}/categories`,
      key,
      "categories",
    );

    const items = await fetchAll(`${URL_BASE}/items`, key, "items");

    const menu = await prisma.$transaction(async (tx) => {
      return await createMenu(user, categories, items, tx);
=======
    // 1. Crear usuario (DB normal)
    const user = await registerUser(req.body);

    // 2. Fetch externo (SIN transacción)
    const menuData = await createMenuData(user);

    // 3. Guardar todo en DB (CON transacción)
    const result = await prisma.$transaction(async (tx) => {
      const menu = await saveMenu(menuData, tx);
      return { user, menu };
>>>>>>> Stashed changes
    });

    res.status(201).json({ user, menu });
  } catch (error) {
<<<<<<< Updated upstream
=======
    console.error(error);
>>>>>>> Stashed changes
    res.status(400).json({ error: error.message });
  }
};

<<<<<<< Updated upstream
=======
export const porfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};

>>>>>>> Stashed changes
export default registro;
