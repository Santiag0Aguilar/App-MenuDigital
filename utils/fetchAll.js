// utils/fetchAll.js
import generalFetch from "./fetchGeneral.js";

const fetchAll = async (url, token, key) => {
  let results = [];
  let cursor = null;

  do {
    const data = await generalFetch(
      cursor ? `${url}?cursor=${cursor}` : url,
      "GET",
      token,
    );

    if (!data[key]) throw new Error("Respuesta inválida de Loyverse");

    results.push(...data[key]);
    cursor = data.cursor || null;
  } while (cursor);

  return results;
};

export default fetchAll;
