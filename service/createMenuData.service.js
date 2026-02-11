import fetchAll from "../utils/fetchAll.js";
import getTypeLoyverseKey from "../utils/getTypeLoyverseKey.js";

const createMenuData = async (userInfo) => {
  const URL_BASE = "https://api.loyverse.com/v1.0";

  const key = await getTypeLoyverseKey(userInfo);

  const categories = await fetchAll(
    `${URL_BASE}/categories`,
    key,
    "categories",
  );

  const items = await fetchAll(`${URL_BASE}/items`, key, "items");

  return {
    categories,
    items,
  };
};

export default createMenuData;
