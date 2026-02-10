// service/saveMenu.service.js
import { menuModel } from "./../model/menu.model.js";

const saveMenu = async ({ categories, items }, { id }) => {
  const categoryMap = {};
  const userId = id;
  for (const cat of categories) {
    const mapped = mapCategory(cat, userId);
    const saved = await menuModel.upsertCategory(mapped);
    categoryMap[cat.id] = saved.id;
  }

  for (const item of items) {
    if (!categoryMap[item.category_id]) continue;
    const mapped = mapProduct(item, userId, categoryMap);
    await menuModel.upsertProduct(mapped);
  }

  return { ok: true };
};

function mapCategory(cat, userId) {
  return {
    userId,
    externalId: cat.id,
    name: cat.name,
    color: cat.color,
    isActive: !cat.deleted_at,
  };
}

function mapProduct(item, userId, categoryMap) {
  const variant = item.variants?.[0];
  const price = variant?.stores?.[0]?.price ?? variant?.default_price ?? 0;

  return {
    userId,
    externalId: item.id,
    name: item.item_name,
    description: item.description?.replace(/<[^>]*>/g, ""),
    imageUrl: item.image_url,
    handle: item.handle,
    price,
    categoryId: categoryMap[item.category_id],
    isActive: !item.deleted_at,
  };
}

export default saveMenu;
