import { getPublicMenuService } from "./../service/publicMenu.service.js";

export const getPublicMenuController = async (req, res) => {
  try {
    const { slug } = req.params;

    const data = await getPublicMenuService(slug);

    if (!data) {
      return res.status(404).json({ message: "Negocio no encontrado" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
