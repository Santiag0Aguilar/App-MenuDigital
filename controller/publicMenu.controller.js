import * as Public from "./../service/publicMenu.service.js";

export const getPublicMenuController = async (req, res) => {
  try {
    const { slug } = req.params;

    const data = await Public.getPublicMenuService(slug);

    if (!data) {
      return res.status(404).json({ message: "Negocio no encontrado" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBusinessRegister = async (req, res) => {
  try {
    const data = await Public.getAllBusinessRegister();
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemMenu = (req, res) => {
  try {
    const { slug, productoId } = req.params;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
