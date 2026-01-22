import bcrypt from "bcrypt";
import { userModel } from "./../model/user.model.js";

/* Que va a realizar el sistema? */
const registerUser = async (body, tx) => {
  const existingUser = await userModel.findByEmail(body.email, tx);
  if (existingUser) throw new Error("Email registrado");

  const passwordHash = await bcrypt.hash(body.password, 10);
  const loyverseKeyHash = await bcrypt.hash(body.loyverseKey, 10);

  return userModel.create(
    {
      email: body.email,
      password: passwordHash,
      role: body.rol,
      businessName: body.businessName,
      loyverseKeyHash,
      primaryColor: body.primaryColor,
      templateType: body.templateType,
    },
    tx,
  );
};

export const getMe = async (userId) => {
  const user = await userModel.findById(userId);

  return user;
};

export default registerUser;
