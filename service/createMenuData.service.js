// service/createMenuData.service.js
import { decrypt } from "../utils/crypto.js";
import fetchAll from "../utils/fetchAll.js";

const createMenuData = async (userInfo) => {
  const URL_BASE = "https://api.loyverse.com/v1.0";
  const { id, loyverseKeyHash } = userInfo;

  const key = decrypt(loyverseKeyHash);

  const categories = await fetchAll(
    `${URL_BASE}/categories`,
    key,
    "categories",
  );

  const items = await fetchAll(`${URL_BASE}/items`, key, "items");

  return {
    userId: id,
    categories,
    items,
  };
};

export default createMenuData;
