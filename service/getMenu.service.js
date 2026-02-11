import { menuModel } from "../model/menu.model.js";

const getMenuByUser = (id) => {
  const menuData = menuModel.findCategoriesWithProductsByUser(id);

  return menuData;
};

export default getMenuByUser;
