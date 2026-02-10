import getMenuByUser from "../service/getMenu.service.js";

const getMenu = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const menu = await getMenuByUser(userId);

    res.status(200).json({ menu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default getMenu;
