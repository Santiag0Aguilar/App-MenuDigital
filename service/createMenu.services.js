import { menuModel } from "./../model/menu.model.js";
import fetchAll from "./../utils/fetchAll.js";
const createMenu = async (key, userInfo, tx) => {
  try {
    const URL_BASE = "https://api.loyverse.com/v1.0";
    const { id } = userInfo;

    const categories = await fetchAll(
      `${URL_BASE}/categories`,
      key,
      "categories",
    );
    const items = await fetchAll(`${URL_BASE}/items`, key, "items");
    const categoryMap = {};

    for (const cat of categories) {
      const mapped = mapCategory(cat, id);
      const saved = await menuModel.upsertCategory(mapped, tx);
      categoryMap[cat.id] = saved.id;
    }

    for (const item of items) {
      if (!categoryMap[item.category_id]) continue;
      const mapped = mapProduct(item, id, categoryMap);
      await menuModel.upsertProduct(mapped, tx);
    }

    return { ok: true };
  } catch (error) {
    throw error;
  }
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

const mapProduct = (item, userId, categoryMap) => ({
  userId,
  externalId: item.id,
  name: item.item_name,
  description: item.description?.replace(/<[^>]*>/g, ""),
  imageUrl: item.image_url,
  handle: item.handle,
  categoryId: categoryMap[item.category_id],
  isActive: !item.deleted_at,
});

export default createMenu;

/* 

YA trae la info de loyverse ahora hay que ver como organizar esta info para mandarla a nuestro modelo regresnado esta info formateada al
modelo y este la pueda jugardar, aqui tenemos dos objetos que enviar, categoria y productos

*/
