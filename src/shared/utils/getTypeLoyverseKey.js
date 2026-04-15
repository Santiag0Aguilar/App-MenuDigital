import { decrypt } from "./crypto.js";

const getTypeLoyverseKey = (userInformacion) => {
  if (userInformacion.loyverseKey) return userInformacion.loyverseKey;
  if (userInformacion.loyverseKeyEncrypt)
    return decrypt(userInformacion.loyverseKeyEncrypt);
  throw new Error("No Loyverse key provided");
};

export default getTypeLoyverseKey;
