import { userModel } from "./../model/user.model.js";

const MenuChangeService = async (body) => {
  const updateMenu = await userModel.updateUser(body);

  return updateMenu;
};

export default MenuChangeService;
