import crypto from "crypto";

const ALGO = "aes-256-gcm";

function getKey() {
  if (!process.env.DATA_ENCRYPT_SECRET) {
    throw new Error("DATA_ENCRYPT_SECRET no está definida");
  }

  return crypto
    .createHash("sha256")
    .update(process.env.DATA_ENCRYPT_SECRET)
    .digest();
}

export function encrypt(text) {
  const KEY = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${tag}:${encrypted}`;
}

export function decrypt(payload) {
  const KEY = getKey();
  const [ivHex, tagHex, encrypted] = payload.split(":");

  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(ivHex, "hex"),
  );

  decipher.setAuthTag(Buffer.from(tagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
