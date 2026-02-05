import createMenu from "../service/createMenu.service.js";
import registerUser from "./../service/auth.service.js";
import { prisma } from "./../lib/prisma.js";

const registro = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await registerUser(req.body, tx);
      const menu = await createMenu(user, tx);

      return { user, menu };
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message, route: "desde controller" });
  }
};

export const porfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};
export default registro;
