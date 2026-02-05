import MenuChangeService from "./../service/updateMenu.service.js";
import { prisma } from "./../lib/prisma.js";

const MenuUpdateController = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const menuUpdate = await MenuChangeService(req.body);

    res.status(201).json({
      message: "UI actualizada correctamente",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default MenuUpdateController;
