import MenuChangeService from "./../service/updateMenu.service.js";
import { prisma } from "./../lib/prisma.js";

const MenuUpdateController = async (req, res) => {
  console.log(req.user);
  try {
    const userId = req.user.id;
    const { primaryColor, templateType } = req.body;

    await MenuChangeService({
      userId,
      primaryColor,
      templateType,
    });
    res.status(201).json({
      message: "UI actualizada correctamente",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default MenuUpdateController;
