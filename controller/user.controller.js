import createMenu from "../service/createMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";
import fetchAll from "../utils/fetchAll.js";
import { decrypt } from "../utils/crypto.js";

const registro = async (req, res) => {
  try {
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
    });

    res.status(201).json({ user, menu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default registro;
