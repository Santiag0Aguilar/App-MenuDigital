import { userModel } from "../model/user.model.js";
import { categoryModel } from "../model/category.model.js";

export const getPublicMenuService = async (slug) => {
  const user = await userModel.findBySlug(slug);

  if (!user) return null;

  const categories = await categoryModel.findCategoriesWithProductsByUserPublic(
    user.id,
  );

  return {
    business: {
      name: user.businessName,
      slug: user.slug,
      primaryColor: user.primaryColor,
      templateType: user.templateType,
      phone: user.phone,
    },
    menu: categories,
  };
};
