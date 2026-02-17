// service/saveMenu.service.js
import { menuModel } from "./../model/menu.model.js";
import { DataSource } from "@prisma/client";

const saveMenu = async ({ categories, items }, { id }) => {
  const userId = id;

  // 🟢 CAMBIO 1 — mapear todo en memoria primero
  const mappedCategories = categories.map((cat) => mapCategory(cat, userId));

  // 🟢 CAMBIO 2 — insertar categorías en bloque y obtener ids reales
  const categoryMap = await menuModel.bulkUpsertCategories(mappedCategories);
  // 🟢 CAMBIO 3 — mapear productos usando el nuevo categoryMap
  const mappedProducts = items
    .filter((item) => categoryMap[item.category_id])
    .map((item) => mapProduct(item, userId, categoryMap));

  // 🟢 CAMBIO 4 — upsert masivo real
  await menuModel.bulkUpsertProducts(mappedProducts);

  return { ok: true };
};

function mapCategory(cat, userId) {
  return {
    userId,
    source: DataSource.LOYVERSE,
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
    source: DataSource.LOYVERSE,
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
