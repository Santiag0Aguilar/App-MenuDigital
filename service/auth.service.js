import bcrypt from "bcrypt";
import { userModel } from "./../model/user.model.js";

/* Que va a realizar el sistema? */
const registerUser = async (body) => {
  const {
    email,
    password,
    businessName,
    primaryColor,
    loyverseKey,
    rol,
    templateType,
  } = body;

  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    throw new Error("Email registrado");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const loyverseKeyHash = await bcrypt.hash(loyverseKey, 10);

  return userModel.create({
    email,
    password: passwordHash,
    role: rol,
    businessName,
    loyverseKeyHash,
    primaryColor,
    templateType,
  });
};

export const getMe = async (userId) => {
  const user = await userModel.findById(userId);

  return user;
};

export default registerUser;
