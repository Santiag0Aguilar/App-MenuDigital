import pkg from "@prisma/client";
import MenuChangeService from "./../service/updateMenu.service.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const MenuUpdateController = async (req, res) => {
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
