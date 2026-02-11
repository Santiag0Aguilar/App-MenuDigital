import { userModel } from "./../model/user.model.js";

const MenuChangeService = async ({ userId, primaryColor, templateType }) => {
  const updateMenu = await userModel.updateUser({
    userId,
    primaryColor,
    templateType,
  });

  return updateMenu;
};

export default MenuChangeService;
