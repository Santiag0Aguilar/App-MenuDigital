import bcrypt from "bcrypt";
import { userModel } from "./../model/user.model.js";
import { encrypt } from "./../utils/crypto.js";
import slugify from "slugify";

const registerUser = async (body, tx) => {
  const existingUser = await userModel.findByEmail(body.email, tx);
  if (existingUser) throw new Error("Email no valido");

  const existingUserNumber = await userModel.findByPhone(body.phone, tx);
  if (existingUserNumber) throw new Error("Numero de telefono registrado");

  // 1. generar slug base
  const baseSlug = slugify(body.businessName, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let count = 1;

  // 2. asegurar unicidad
  while (await userModel.findBySlug(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const loyverseKeyHash = body.loyverseKey ? encrypt(body.loyverseKey) : null;

  return userModel.create(
    {
      email: body.email,
      password: passwordHash,
      loyverseKeyHash,
      role: body.rol,
      businessName: body.businessName,
      primaryColor: body.primaryColor,
      templateType: body.templateType,
      phone: body.phone,
      slug,
      source: body.source,
    },
    tx,
  );
};

export const getMe = async (userId) => {
  const user = await userModel.findById(userId);

  return user;
};

export default registerUser;
